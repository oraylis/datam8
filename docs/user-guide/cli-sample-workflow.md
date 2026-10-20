# Extend the sample model with the CLI

Build an Address pipeline from AdventureWorks through Raw, Stage, Core, Curated
and Consumer. The commands below run directly in Windows PowerShell, using a
complete working copy of the configured sample solution.

## Prerequisites and working copy

Use the CLI from `main`. The canonical
[agent CLI contract](https://github.com/oraylis/datam8-cli/blob/main/docs/cli-agent-contract.md)
defines input, output and batch semantics.

Use the sample solution with a working local AdventureWorks connection and
`dataSourceTypes/SQLServer.pluginId` set to `builtin:SQLServer`. The connected
example uses `[SalesLT].[Address]` with nine attributes.

Copy the entire configured sample directory, including Base, Model, Plugins and
Generate, to `C:\work\sample-cli`. Start from a copy without the `CliDemo` module.
Keep connection secrets local. The source commands read SQL Server; model writes
and generated files stay in the copy.

The examples assume a CLI source checkout at `C:\work\datam8-cli`. Replace the
checkout and solution paths below with your actual paths, then prepare and
activate that checkout's environment:

```powershell
uv sync --project 'C:\work\datam8-cli' --all-extras
& 'C:\work\datam8-cli\.venv\Scripts\Activate.ps1'
$env:DATAM8_SOLUTION_PATH = 'C:\work\sample-cli\ORAYLISDatabricksSample.dm8s'
```

The CLI has no persistent open-solution session. Every command reads the solution
specified by this environment variable. An explicit `--solution PATH` on a command
overrides it. Each successful mutation saves immediately; there is no separate
save command. Stop if a command returns `ok: false` or a nonzero exit code.

For JSON arguments, the Windows commands use `--%` and escaped double quotes.
This also works with Windows PowerShell's legacy native argument handling.
Keep each command on one line. After `--%`, PowerShell variables are not expanded;
the solution is selected through the environment variable above. Bash and other
shells require their own quoting, without `--%`.

## Check the solution and source

```powershell
datam8 solution show --json
datam8 validate --json
datam8 list zones/ --json
datam8 show dataSources/AdventureWorks --fields name,type --json
datam8 show dataSourceTypes/SQLServer --fields name,pluginId --json
datam8 plugins show builtin:SQLServer --json
datam8 sources test-connection AdventureWorks --json
datam8 sources list AdventureWorks --json
datam8 sources list AdventureWorks --source-location SalesLT --json
datam8 sources metadata AdventureWorks '[SalesLT].[Address]' --json
datam8 sources preview AdventureWorks '[SalesLT].[Address]' --limit 10 --json
```

Use the returned `sourceLocation` handle unchanged. This sample returns
`[SalesLT].[Address]`. If SQL Server reports that the `sql` extra is missing,
check that `datam8` resolves to the activated environment; `--all-extras` above
installs its `connectorx` dependency.

## Add the module and folders

Data modules are nested inside their data product. Add `CliDemo` to the existing
`Sales` product and create folder metadata for each modeled layer:

```powershell
datam8 --% create dataProducts/Sales --at "[\"dataModules\"]" --data "{\"name\":\"CliDemo\",\"displayName\":\"CLI Demo\"}" --json
datam8 --% create folders/010-Stage/Sales/CliDemo --data "{\"id\":990001,\"dataProduct\":\"Sales\",\"dataModule\":\"CliDemo\"}" --json
datam8 --% create folders/020-Core/Sales/CliDemo --data "{\"id\":990002,\"dataProduct\":\"Sales\",\"dataModule\":\"CliDemo\"}" --json
datam8 --% create folders/030-Curated/Sales/CliDemo --data "{\"id\":990003,\"dataProduct\":\"Sales\",\"dataModule\":\"CliDemo\"}" --json
datam8 --% create folders/040-Consumer/Sales/CliDemo --data "{\"id\":990004,\"dataProduct\":\"Sales\",\"dataModule\":\"CliDemo\"}" --json
```

Folder IDs are currently required by the CLI. These example IDs must be
unused in your copy. Model-entity IDs, in contrast, are assigned automatically.
Locators use actual folder names such as `010-Stage`, not the zone name `stage`.

## Import Stage and derive Raw

```powershell
datam8 sources import AdventureWorks '[SalesLT].[Address]' modelEntities/010-Stage/Sales/CliDemo/CliAddress --json
datam8 --% update modelEntities/010-Stage/Sales/CliDemo/CliAddress --data "{\"description\":\"Address from AdventureWorks\",\"properties\":[{\"property\":\"jobs\",\"value\":\"daily\"},{\"property\":\"write_mode\",\"value\":\"overwrite\"}]}" --json
```

Record the import response's numeric `item.id` as `STAGE_ID`. In subsequent
commands, replace `<STAGE_ID>` with that number, without angle brackets or quotes.
The Databricks sample templates derive Raw landing tables and extraction notebooks
from Stage's external source; no additional Raw model entity is needed.

## Connect Core to Stage

Clone the Stage attribute structure, then replace its external source with an
internal reference to Stage:

```powershell
datam8 clone modelEntities/010-Stage/Sales/CliDemo/CliAddress modelEntities/020-Core/Sales/CliDemo/CliAddress --json
datam8 --% update modelEntities/020-Core/Sales/CliDemo/CliAddress --data "{\"description\":\"Clean addresses\",\"sources\":[{\"sourceLocation\":<STAGE_ID>}],\"transformations\":[]}" --json
datam8 --% update modelEntities/020-Core/Sales/CliDemo/CliAddress --at "[\"attributes\",{\"name\":\"AddressID\"}]" --data "{\"isBusinessKey\":true,\"description\":\"Address business key\"}" --json
```

Record the clone response's numeric `item.id` as `CORE_ID`. The keyed `--at`
selector edits only `AddressID`; unchanged attributes remain intact.

## Connect Curated and Consumer

Clone Stage again to reuse its attribute structure, and explicitly set each
entity's predecessor. Replace `<CORE_ID>` with the Core clone's ID:

```powershell
datam8 clone modelEntities/010-Stage/Sales/CliDemo/CliAddress modelEntities/030-Curated/Sales/CliDemo/CliAddress --json
datam8 --% update modelEntities/030-Curated/Sales/CliDemo/CliAddress --data "{\"description\":\"Addresses for analytics\",\"sources\":[{\"sourceLocation\":<CORE_ID>}],\"transformations\":[]}" --json
```

Record this clone's `item.id` as `CURATED_ID`, then substitute it below:

```powershell
datam8 clone modelEntities/010-Stage/Sales/CliDemo/CliAddress modelEntities/040-Consumer/Sales/CliDemo/CliAddress --json
datam8 --% update modelEntities/040-Consumer/Sales/CliDemo/CliAddress --data "{\"displayName\":\"Addresses\",\"sources\":[{\"sourceLocation\":<CURATED_ID>}],\"transformations\":[]}" --json
```

## Add an optional Core function

Save this code as `C:\work\sample-cli\CleanAddress.py`:

```python
from pyspark.sql import functions as F

stage_schema = f"{schema_prefix}stage" if schema_prefix else "stage"
business_function = (
    spark.table(f"{catalog_name}.{stage_schema}.Sales_CliDemo_CliAddress")
    .withColumn("City", F.trim(F.col("City")))
)
```

Use the dedicated function command to create both the transformation metadata
and its local source file:

```powershell
datam8 functions create modelEntities/020-Core/Sales/CliDemo/CliAddress --step-no 1 --name CleanAddress --source CleanAddress.py --file 'C:\work\sample-cli\CleanAddress.py' --json
datam8 functions list modelEntities/020-Core/Sales/CliDemo/CliAddress --json
```

## Validate and generate

```powershell
datam8 show modelEntities/020-Core/Sales/CliDemo/CliAddress --fields name,sources,transformations --json
datam8 --% show modelEntities/020-Core/Sales/CliDemo/CliAddress --at "[\"attributes\",{\"name\":\"AddressID\"}]" --json
datam8 sources compare modelEntities/010-Stage/Sales/CliDemo/CliAddress --json
datam8 validate --json
datam8 generate docs --json
datam8 generate databricks --json
```

The new files are saved under `Model/010-Stage`, `Model/020-Core`,
`Model/030-Curated` and `Model/040-Consumer`, each in `Sales/CliDemo`.
Inspect the new entity pages in `Output/docs/entities` and the Raw, Stage, Core
and Curated jobs/notebooks in `Output/databricks`. Generation creates files;
it does not execute or deploy the pipeline.

The current sample's Power BI generation calls the removed
`Model.get_model_entity_by_id` method and fails even without these edits.
Consumer metadata is saved and included in the generated documentation; Power BI
generation is excluded until its sample template is updated.

## Continue an interrupted run

Read the affected entity with `show` before continuing. Do not replay successful
`create`, `clone`, import or function-create commands: those objects already exist.
Each command saves separately, so an error in a later command does not undo
earlier writes. Repeat the walkthrough in a fresh full sample copy when starting
over. The same commands are also available in ordered batches; see the
[CLI batch contract](https://github.com/oraylis/datam8-cli/blob/main/docs/cli-agent-contract.md#ordered-batches).

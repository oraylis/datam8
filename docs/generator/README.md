# _DataM8_ Generator

## General

_DataM8_ uses a CLI tool to generate artifacts for any target data warehouse platform. This CLI tool is very useful when executing checks or releases using CI/CD pipelines. As a code generation engine, _DataM8_ makes use of [Jinja2](https://jinja.palletsprojects.com/).

Jinja2 is a modern and designer-friendly templating language for Python, modeled after Django’s templates. It is fast, widely used, and secure with the optional sandboxed template execution environment.

## Usage

The generator is embedded into the Frontend and can be triggered via command line:

```console
> C:\path\to\installation\Generator\python.exe -m dm8data

Usage: Dm8Data [OPTIONS]
Try 'Dm8Data --help' for help.
╭─ Error ─────────────────────────────────────────╮
│ Missing option '--action' / '-a'. Choose from:  │
│         validate_index,                         │
│         generate_template,                      │
│         refresh_generate                        │
╰─────────────────────────────────────────────────╯
```

Alternatively, the generator can be installed via the .whl package for direct execution or CI/CD purposes:

```console
> pip install C:\path\to\wheel\dm8data-1.0.0-py3-none-any.whl

Processing C:\path\to\wheel\dm8data-1.0.0-py3-none-any.whl
...
...

> dm8data

Usage: Dm8Data [OPTIONS]
Try 'Dm8Data --help' for help.
╭─ Error ─────────────────────────────────────────╮
│ Missing option '--action' / '-a'. Choose from:  │
│         validate_index,                         │
│         generate_template,                      │
│         refresh_generate                        │
╰─────────────────────────────────────────────────╯
```

## Arguments

### `--action`, `-a` (Required)

Specifies the action that the tool should perform. The available choices are:

- `validate_index`: Validates the index file based on the provided solution path.
- `generate_template`: Generates templates from the specified source and outputs them to the destination.
- `refresh_generate`: Refreshes the index and regenerates the templates.

### `--path_solution`, `-s` (Required)

Path to the solution file, which should be in JSON format. This file is essential for the tool to validate or generate templates.

### `--path_template_source`, `-src` (Optional)

Specifies the directory or file path where the source templates are located. This argument is required when using the `generate_template` or `refresh_generate` actions.

### `--path_template_destination`, `-dest` (Optional)

Specifies the directory path where the generated templates should be saved. This is also required for the `generate_template` and `refresh_generate` actions.

### `--full_index_scan`, `-i` (Optional)

A boolean flag that determines whether to perform a full index scan or just a refresh. This is primarily used with the `validate_index` action.

### `--path_modules`, `-m` (Optional)

Specifies the directory or file path to the modules that can be registered for use in the template generation process. This is an optional argument, useful for modular template generation.

### `--path_collections`, `-c` (Optional)

Specifies the directory path to Jinja2 template collections, which include blocks and other reusable components. This argument is optional but can be useful for organizing and managing template resources.

### `--log_level`, `-l` (Optional)

Sets the logging level for the tool’s execution. The available levels are:

- `NOTSET`
- `DEBUG`
- `INFO` (default)
- `WARN`
- `ERROR`
- `CRITICAL`

If an invalid log level is provided, the tool defaults to `INFO` and logs a warning.

## Templating guidelines

### Jinja2 Coding Guide

You can find the Jinja2 coding guide [here](https://jinja.palletsprojects.com/en/latest/templates/).

### Sample for a _DataM8_ Jinja2 Template for Databricks

```console
+---databricks-lake
|   |
|   +---jobs
|   |       job_src_to_stage.json.jinja2
|   |       job_stage_ddls.json.jinja2
|   |
|   +---notebooks
|   |   +---010-raw
|   |   |       dml_raw_table.py.jinja2
|   |   |
|   |   +---020-stage
|   |   |       ddl_stage_table.py.jinja2
|   |   |       dml_stage_table.py.jinja2
|   |   |
|   |   \---030-core
|   |           ddl_core_table.py.jinja2
|   |
|   +---__collections
|   |   +---include
|   |   |       ddl_column_declaration.jinja2
|   |   |       dml_column_declaration.jinja2
|   |   |
|   |   \---macro
|   |           column_declaration.jinja2
|   |
|   \---__modules
|           module1.py
|           modules2.py
|
+---__models
        stage.jinja2
```

### Concepts

_DataM8_ uses two different types of code generations based on a _DataM8_ Jinja2-project:

1. **Model transformation:**
   - Used to create newly transformed metadata using the serialized JSON metadata model.
   - Currently used in the stage area to create a generic stage out of raw zone metadata.
   - In the sample: [\_\_models](./models_generators.md) (click link to go to generator documentation) and its content.
2. **Code generation:**
   - Used to create the final artifact of a data warehouse platform.
   - Might be Python Notebooks, DDL or DML SQL-Files, Documentation, or Entity Relationship-Diagrams.
   - In the sample: [databricks-lake](./databricks-lake_generators.md) (click link to go to generator documentation) folder and its content.
     - Contains \_\_collections folder to either define [_include_](https://jinja.palletsprojects.com/en/latest/templates/#include)'s or [_macro_](https://jinja.palletsprojects.com/en/latest/templates/#macros)'s to increase reusability of templating code.
     - Contains \_\_modules folder to build custom python classes or functions to be used in Jinja2-templates.

### Custom _DataM8_ Control Structures

_DataM8_ code generation uses the following control structures to write output files. They can be customized as required by you.

Additionally, a pipe indicates the used target language that is generated to automatically execute code beatifying.
An abbreviation after a pipe (|) indicates the required beatifier. Currently Python (py), JSON (json), and SQL (sql) are supported.

```python
{%- for entity in model.get_raw_entity_list() %}
>>>>>>>>>> target_folder/on/your/disk/{{entity.model_object.entity.name}}.py | py

# [CONTENT OF THE TEMPLATED ARTIFACT HERE]

<<<<<<<<<< target_folder/on/your/disk/{{entity.model_object.entity.name}}.py | py
{%- endfor -%}
```

### Full example

```python
{%- for entity in model.get_raw_entity_list() %}
>>>>>>>>>> notebooks/010-raw/dml/{{entity.model_object.entity.name}}.py | py
# Databricks notebook source
# MAGIC %md
# MAGIC # DML for {{entity.model_object.type.value}}.{{entity.model_object.entity.name}}

# COMMAND ----------

# MAGIC %md
# MAGIC # Get parameter values

# COMMAND ----------

# DBTITLE 1,Initialize widgets
dbutils.widgets.text("replication_integration_status_id", "1", "1. ReplicationIntegrationStatusId")
dbutils.widgets.text("execution_status_id", "1", "2. ExecutionStatusId")

# COMMAND ----------

# DBTITLE 1,Get parameter values
replication_integration_status_id = int(dbutils.widgets.get("replication_integration_status_id"))
execution_status_id = int(dbutils.widgets.get("execution_status_id"))

# COMMAND ----------

# DBTITLE 1,Get variable values
data_lake_name = spark.conf.get("datam8.datalake.name", "aut0adl0dev")
container_name = spark.conf.get("datam8.datalake.container.name", "data")
raw_zone = spark.conf.get("datam8.zone.{{entity.model_object.type.value}}.name", "{{entity.model_object.type.value}}")

TARGET_TABLE_NAME = "{{entity.model_object.entity.name}}"
TARGET_TABLE_PATH = f"abfss://{container_name}@{data_lake_name}.dfs.core.windows.net/{raw_zone}/{TARGET_TABLE_NAME.lower()}"

{% set ns = namespace(delta_column = None) %}
{%- for column in entity.model_object.entity.attribute%}
  {%- for tag in column.tags if tag == "delta" %}
    {%- set ns.delta_column = column.name%}
  {%- endfor %}
{%- endfor %}
{%- if ns.delta_column %}
# COMMAND ----------

# MAGIC %md
# MAGIC # Retrieve max delta criteria from '{{entity.model_object.type.value}}'

# COMMAND ----------
try:
  dbutils.fs.ls(TARGET_TABLE_PATH)
  spark.read.format("delta").load(TARGET_TABLE_PATH).createOrReplaceTempView("raw_table")
  max_delta = spark.sql("SELECT MAX({{ns.delta_column}}) FROM raw_table").first()[0]
  query_filter = f"WHERE {{ns.delta_column}} > '{max_delta}'"
except:
  query_filter = ""
{%- endif %}

# COMMAND ----------
{%- set dataSource = entity.model_object.function.dataSource %}
{%- set sourceLocation = entity.model_object.function.sourceLocation %}
{%- set ds = model.data_sources.get_datasource(dataSource) %}
{%- set ds_connectionstring = ds.connectionString %}

# MAGIC %md
# MAGIC # Read data from MS SQL Server

# COMMAND ----------

# MAGIC %md
# MAGIC ## Get & assign variable values

# COMMAND ----------

# DBTITLE 1,Get variable values
DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver"

# defaults comming from datam8 model
database_host = spark.conf.get("datam8.datasource.{{dataSource}}.connection_string", "{{ds_connectionstring}}")
database_host = spark.conf.get("datam8.datasource.{{dataSource}}.host")
database_port = spark.conf.get("datam8.datasource.{{dataSource}}.port", "1433")
database_name = spark.conf.get("datam8.datasource.{{dataSource}}.name")

SOURCE_TABLE_NAME = "{{sourceLocation}}"

user = spark.conf.get("datam8.datasource.{{dataSource}}.credentials.user")
password = spark.conf.get("datam8.datasource.{{dataSource}}.credentials.password")

url = f"jdbc:sqlserver://{database_host}:{database_port};databaseName={database_name}"

# COMMAND ----------

# MAGIC %md
# MAGIC ## Define query

# COMMAND ----------

# DBTITLE 1,Define query with technical columns
pushdown_query = f"""
(
    SELECT
        *,
        -- Add technical columns
        CAST(YEAR(SYSUTCDATETIME()) AS SMALLINT) AS __Year,
        CAST(MONTH(SYSUTCDATETIME()) AS TINYINT) AS __Month,
        CAST(DAY(SYSUTCDATETIME()) AS TINYINT) AS __Day,
        SYSUTCDATETIME() AS __InsertTimestampUTC,
        CAST({replication_integration_status_id} AS BIGINT) AS __ReplicationIntegrationStatusId,
        CAST({execution_status_id} AS BIGINT) AS __ExecutionStatusId
    FROM {SOURCE_TABLE_NAME}
{%- if ns.delta_column %}
    {query_filter}
{%- endif %}
) AS tbl
"""
print(
    f"""Query:

{pushdown_query}"""
)

# COMMAND ----------

# MAGIC %md
# MAGIC ## Create dataframe

# COMMAND ----------

# DBTITLE 1,Define dataframe
table_df = (spark.read
  .format("jdbc")
  .option("driver", DRIVER)
  .option("url", url)
  .option("dbtable", pushdown_query)
  .option("user", user)
  .option("password", password)
  # a column that can be used that has a uniformly distributed range of values that can be used for parallelization
#   .option("partitionColumn", "AddressID")
  # lowest value to pull data for with the partitionColumn
#   .option("lowerBound", "0")
  # max value to pull data for with the partitionColumn
#   .option("upperBound", "100")
  # number of partitions to distribute the data into. Do not set this very large (~hundreds)
#   .option("numPartitions", 8)
  .load()
)

# COMMAND ----------

# MAGIC %md
# MAGIC # Write to '{{entity.model_object.type.value}}'

# COMMAND ----------

(
    table_df.write.partitionBy("__Year", "__Month", "__Day", "__InsertTimestampUTC")
    .mode("append")
    .format("delta")
    .save(TARGET_TABLE_PATH)
)


<<<<<<<<<< notebooks/010-raw/dml/{{entity.model_object.entity.name}}.py | py {%- endfor -%}
```

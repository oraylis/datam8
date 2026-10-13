# 5. Sources and Connectors

[Guide index](README.md) · [Next: Generation](generation.md)

This chapter is optional. Saved source metadata can be inspected offline; connection
tests, navigation, import and refresh require a reachable source, the correct
connector dependencies and credentials. The published capture did not run a live
SQL import/refresh; Docker was unavailable in the authoring environment.

## Inspect the binding

Choose **Base → Data Source Types**, then SQLServer. Inspect the linked connector,
its connection definitions and physical-to-model type mappings.

![Data source type editor with connector and mapping settings](assets/09-data-source-types.png)

*The Data Source Type defines reusable connection fields and type conversion.
Its plugin ID must match a discovered manifest.*

Choose **Data Sources**, then AdventureWorks. Concrete host/database/authentication
settings belong here. The password is a `ref://` secret reference, not a plaintext
password in the solution JSON.

![AdventureWorks configuration using neutral localhost and demo user values](assets/10-data-sources.png)

*Host and username were replaced in the temporary sample copy before capture.
These values do not represent a running database or working credentials.*

## Prepare a local source

For a reproducible connected exercise, use the backend's
[local AdventureWorks SQL Server setup](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/tests/db/README.md).
Restore the sample database, configure a source in your copy for that container
and supply credentials through the supported secret UI/keyring setup. Install
the pinned backend's SQL extras and the required SQL Server driver for your OS.

Keep cloud-specific deployment/key-vault instructions separate from this local
exercise. See [advanced references](advanced.md) for the sample deployment documentation.

## Connection, import and preview

1. Configure the local AdventureWorks source and use its connection-test action.
2. Choose **Add Entity**, then the source-backed/import path offered by the wizard.
3. Select the configured source and load its locations.
4. Select a table, inspect metadata and preview if the connector supports it.
5. Choose a target folder and distinct entity name; review attributes/mappings.
6. Complete creation, inspect the new JSON and reload.

**Check:** a successful connection test is only the first step. Verify column names,
types, keys, descriptions and source mappings in the created entity. Preview may
be disabled because `previewData` is not declared; this is a capability limitation,
not necessarily a connection failure.

## Refresh existing source metadata

Choose **Refresh data sources** in the upper-right toolbar. Select source-backed
entities and the desired mode before scanning.

![Refresh dialog before scanning the configured sources](assets/18-refresh-sources.png)

*This capture shows selection only. Scan/review/apply require working local source
access; no fabricated successful diff is included.*

- **Complete refresh:** compares source-owned attributes and source/mapping metadata
  while preserving local fields according to the backend contract.
- **Sources-only:** refreshes external sources/mappings without replacing entity
  attributes, properties, transformations or relationships.

Review each proposed change before applying. Pay particular attention to removed
mappings and type changes. After application, inspect affected entity JSON and
Reload. Run generation to expose unresolved model dependencies.

See the [canonical source contract](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/docs/backend-contract.md#source-import-and-refresh)
for ownership/conflict details; do not assume all manually assigned source metadata
will survive an authoritative connector refresh.

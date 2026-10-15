# Develop Your Own Connector

A connector is a Python plugin executed by the DataM8 backend. It describes source
navigation and column metadata, and may offer connection testing, data preview or
physical source definitions for a contract. The frontend renders the supplied
configuration and capabilities; a new connector normally needs no custom UI code.

## Where your plugin belongs

Keep custom plugins in your solution's plugin directory or in a separate shared
repository made available to that solution. Installed Python packages can also
supply an implementation through an importable entry point. Only builtins need
to ship with the backend.

The solution declares the plugin directory. A Data Source Type binds a manifest ID
and saves connection definitions and type mappings. Data Sources contain concrete
connection values and can override mappings. Metadata keeps native source types;
saved mappings determine model types.

## Start with the backend example

Follow [the runnable offline connector example](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/docs/plugin-example.md).
It creates a new disposable solution, lists static metadata and imports columns
without a database or cloud account. It demonstrates separate type dimensions,
saved mappings and inspecting the persisted entity.

The [Python plugin reference](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/docs/connectors.md)
defines required/optional methods, manifest discovery, connection fields, secrets,
capabilities, metadata, source definitions and refresh behavior. This technical
reference belongs with the backend implementation.

Read [frontend consumer responsibilities](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/docs/connectors_dev.md)
when contributing to the UI, and [Sources and Connectors](user-guide/sources.md)
when configuring or using an existing connector.

## Version and verification

These links describe the current development branches and their pinned schemas.
They do not establish support in desktop beta.6 or change the historical evidence
in [compatibility](compatibility.md). Match backend, frontend and schema revisions.

Test discovery, metadata, configured mappings, import, save/reload and refresh on
disposable fixtures. Keep transport mocks and local tests distinct from real
database/workspace connectivity. Plugin connection does not automatically create
Data Types or default Attribute Types in a solution.

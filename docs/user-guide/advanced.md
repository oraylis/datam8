# 7. Go Further

[Guide index](README.md) · [Troubleshooting](troubleshooting.md)

## Templates and payloads

A target consists of its `.dm8s` entry, Python modules below `__modules` and Jinja
templates. **Python interprets the model; Jinja formats prepared data.** Keep
lookup, inheritance, sorting, naming and output-path logic in payload code.

For a first change, follow the pinned sample's
[Template and Payload tutorial](https://github.com/oraylis/datam8-sample-solution/blob/1e1855e59e2734b3a393f9128193504626ab9380/docs/howto-template-and-payload-development.md).
Its static `hello.txt` example illustrates registration, template data and a
relative output path. Work in your copy, lint the changed Python modules, generate
and inspect the resulting file. Use the selected runtime's [current CLI instructions](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/docs/cli.md)
and verify command help for your pinned version.

## Target references

- [Databricks architecture](https://github.com/oraylis/datam8-sample-solution/blob/1e1855e59e2734b3a393f9128193504626ab9380/Generate/databricks/ARCHITECTURE.md)
- [Power BI architecture](https://github.com/oraylis/datam8-sample-solution/blob/1e1855e59e2734b3a393f9128193504626ab9380/Generate/powerbi-tabular/ARCHITECTURE.md)
- [Documentation target](https://github.com/oraylis/datam8-sample-solution/blob/1e1855e59e2734b3a393f9128193504626ab9380/Generate/docs/ARCHITECTURE.md)
- [Interpreted properties](https://github.com/oraylis/datam8-sample-solution/blob/1e1855e59e2734b3a393f9128193504626ab9380/docs/reference/properties.md)

These are version-bound references, not independent frontend specifications. If a
reference conflicts with that revision's `.dm8s` or implementation, verify the
code and record the discrepancy before adopting it.

## Deployment

Databricks Asset Bundle settings, Azure resources, service connections, secret
scopes and CI/CD belong to deployment. Power BI/Fabric deployment has its own
runner and workspace configuration. Generation does not perform these steps.

- [Sample deployment quickstart](https://github.com/oraylis/datam8-sample-solution/blob/1e1855e59e2734b3a393f9128193504626ab9380/docs/quickstart.md)
- [Power BI deployment notes](https://github.com/oraylis/datam8-sample-solution/blob/1e1855e59e2734b3a393f9128193504626ab9380/Output/powerbi-tabular/README.md)

Those pages describe sample environment conventions, not a universal least-privilege
policy. Validate prerequisites and permissions for your environment before deployment.
This guide does not verify Azure, Databricks or Fabric deployment.

## Develop a connector

Start with [Develop Your Own Connector](../connectors.md). The backend's runnable
example and interface reference show how to expose navigation, native column types,
connection configuration and optional preview. A plugin can live in your solution
or a separate shared repository; the frontend consumes its definitions generically.
Use the documented development revisions rather than assuming desktop beta.6
contains these changes.

## Contribute to the frontend

Use the [development entry point](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/README.md), [AGENTS.md](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/AGENTS.md),
[architecture](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/ARCHITECTURE.md) and [backend consumer constraints](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/docs/backend-contract.md).
Keep UI behavior here, generator semantics upstream and schema changes in the
model repository. See [capture maintenance](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/docs/user-guide/capture.md) when the UI changes.

# Validate and Generate with the CLI

Validation is part of the DataM8 Python CLI/backend. Install the selected backend
revision using its [development instructions](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/README.md), then read
[CLI usage](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/docs/cli.md). The desktop application bundles its backend.

Run commands on a disposable full solution copy:

```sh
datam8 validate --solution /path/to/copy/ORAYLISDatabricksSample.dm8s
datam8 generate docs --solution /path/to/copy/ORAYLISDatabricksSample.dm8s
```

Successful generation means files were produced, not that they were deployed or
executed. Check the process exit code and inspect newly written output. Do not
assume a validation command has a matching editor button or HTTP route.

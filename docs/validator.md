# Validate and Generate with the CLI

Validation is part of the DataM8 Python CLI/backend. Follow
[CLI installation](installation.md#datam8-cli) to install a compatible stable
release, then read [CLI usage](https://github.com/oraylis/datam8-cli/blob/main/docs/cli.md).
That reference follows `main`; open the same document at your release tag for
version-specific commands. A source checkout is only needed for development.
The desktop application bundles its backend.

Run commands on a disposable full solution copy:

```sh
datam8 validate --solution /path/to/copy/ORAYLISDatabricksSample.dm8s
datam8 generate docs --solution /path/to/copy/ORAYLISDatabricksSample.dm8s
```

Successful generation means files were produced, not that they were deployed or
executed. Check the process exit code and inspect newly written output. Do not
assume a validation command has a matching editor button or HTTP route.

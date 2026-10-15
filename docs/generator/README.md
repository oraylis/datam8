# Develop Automations

The engine and the concrete target implementation have separate responsibilities:

- [CLI/backend](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/docs/cli.md): loading, validation and generation execution.
- [Sample templates and payloads](https://github.com/oraylis/datam8-sample-solution/blob/codex/documentation-v2/docs/template-development.md): model
  interpretation, Jinja rendering and target output paths.
- [Sample target reference](https://github.com/oraylis/datam8-sample-solution/blob/codex/documentation-v2/docs/reference/targets.md): configured targets,
  architectures and deployment boundaries.
- [Schema reference](https://github.com/oraylis/datam8-model/blob/feature/v2-beta-port/docs/reference.md): accepted metadata shapes.

Start with [concepts](../concepts.md). Make one template/payload change on a
disposable sample, generate that target and inspect the changed files before
deployment. The [user guide](../user-guide/generation.md) records a different,
pinned four-target sample snapshot; the sample's current main baseline has three.

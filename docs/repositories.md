# Repositories and Responsibilities

| Repository | Canonical responsibility | Reference |
| --- | --- | --- |
| datam8 | Product entry point, user handbook, installation and compatibility | [Index](index.md) |
| datam8-frontend | UI, autosave, Electron, development, packaging and capture tooling | [Frontend development](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/README.md) |
| datam8-cli | CLI, generation/validation/index behavior, HTTP contract and Python connectors | [Backend contract](https://github.com/oraylis/datam8-cli/blob/feature/external_refresh/docs/backend-contract.md) |
| datam8-model | JSON schemas and model-version compatibility | [Schema reference](https://github.com/oraylis/datam8-model/blob/feature/v2-beta-port/docs/reference.md) |
| datam8-sample-solution | Concrete model, templates, payloads and deployment conventions | [Sample index](https://github.com/oraylis/datam8-sample-solution/blob/codex/documentation-v2/docs/index.md) |

The public backend repository is named `datam8-cli`; `datam8-generator` is a
redirect and remains the local frontend submodule directory name. These identify
the same backend, not two interchangeable implementations.

## Extension paths

- **Connector:** keep custom plugins in a solution or shared repository and implement
  the backend's Python interface. Start with [develop your own connector](connectors.md);
  the backend owns the technical specification and executable example.
- **Target/template:** shape payloads in Python and render them with Jinja; keep
  target-specific properties and contracts in the sample.
  Follow [template development](https://github.com/oraylis/datam8-sample-solution/blob/codex/documentation-v2/docs/template-development.md).
- **UI:** make frontend changes with focused component tests and Playwright for
  critical flows. API changes require coordinated backend and consumer changes.
- **Schema:** change the schema repository first; regenerate dependent Python and
  TypeScript types using each consumer's pinned schema checkout.

The existing .NET/NuGet plugin-base project is not a documented v2 extension route;
no compatibility with the Python connector interface has been established here.

## Reference links during integration

Component development links currently target the agreed feature branches. These
new documents become remotely accessible after their branches are pushed. After
manual merges, change development links to `main`. Keep tutorial and capture links
pinned to tested commits. See [handoff](handoff.md).

<img src="docs/assets/images/dm8_incl_text.png" alt="ORAYLIS DataM8 logo" width="300">

# DataM8 — Metadata-driven automation for your data platform

DataM8 helps teams build and evolve data platforms through metadata-driven code
generation. Describe your data structures and transformations once, then combine
them with reusable templates to generate consistent target artifacts.

Developed by ORAYLIS, DataM8 brings together a visual editor, an extensible metadata
model and a command-line generator — helping teams spend less time on repetitive
implementation and more time delivering business value.

## Start with your task

This repository is the product overview and English user handbook. You do not
need to build DataM8 from source to use the app or CLI.

| I want to… | Begin here | First result |
| --- | --- | --- |
| Edit a model visually | [Install the app](docs/installation.md#datam8-app), then [open a sample copy](docs/user-guide/getting-started.md) | Change a description, reload it and generate model documentation |
| Maintain models or automate generation from the command line | [Install the CLI](docs/installation.md#datam8-cli), then [validate and generate](docs/validator.md) | Validate a local solution and inspect freshly generated files |
| Adapt templates and target conventions | [Automation concepts](docs/concepts.md) and [template development](docs/generator/README.md) | Change one template on a disposable sample and inspect its output |
| Develop a source connector | [Build a connector](docs/connectors.md) | Import static metadata using the runnable offline example |
| Improve the editor, backend or schemas | [Choose the owning repository](docs/repositories.md) and [contribution workflow](docs/contribution.md) | Set up the relevant component and run its focused checks |

**Recommended first exercise:** use the app with a disposable sample copy, edit
Customer, verify save/reload and generate `docs`. The tutorial records its exact
[capture revisions](docs/compatibility.md); release-specific compatibility is
documented with the selected release. Generating files does not deploy or execute
them on a data platform.

## Why DataM8?

- **Faster development:** generate repetitive code from metadata and focus on
  business logic.
- **Reusable standards:** capture your team's conventions in templates and share
  them across projects.
- **Consistent results:** validate models and generate artifacts through a common
  process.
- **Central maintenance:** evolve shared templates and regenerate the affected
  artifacts.
- **Documentation from metadata:** keep generated model documentation aligned with
  the same metadata that drives your code.

## How DataM8 works

![Conceptual DataM8 workflow: data sources feed a reverse generator and metadata model; development tools maintain the model, and a generator produces artifacts for a data platform.](docs/assets/images/datam8-automation-overview.png)

[Open the overview at full resolution](docs/assets/images/datam8-automation-overview.png)
to read the diagram labels on smaller screens.

DataM8 puts metadata at the center of automation. Describe data sources,
structures and transformations in a model, maintain it with the editor or your
development tools, and combine it with target-specific templates to generate
artifacts for your data platform.

The illustration shows the conceptual ORAYLIS Automation workflow. Source metadata
import depends on the available connectors; supported platforms and target behavior
are described in the [component references](docs/repositories.md#extension-paths)
and [sample documentation](docs/generator/README.md).

## Components and repositories

| Component | What it does | Repository |
| --- | --- | --- |
| Frontend | Visually edit models and manage solutions in the web editor or desktop application. | [datam8-frontend](https://github.com/oraylis/datam8-frontend) |
| CLI / Generator | Validate models and generate target artifacts from templates; provide the editor's backend. | [datam8-cli](https://github.com/oraylis/datam8-cli) |
| Metadata Model | Define the shared model structure and JSON schemas used by the editor and generator. | [datam8-model](https://github.com/oraylis/datam8-model) |
| Sample Solution | Explore a concrete model with templates, properties and example targets. | [datam8-sample-solution](https://github.com/oraylis/datam8-sample-solution) |

This repository is the central home for the product overview and user handbook.
See [repository responsibilities](docs/repositories.md) for technical references
and contribution routes.

## From metadata to artifacts

![Generator principle: metadata and target-specific templates combine to produce target artifacts such as notebooks, job definitions, datasets and documentation.](docs/assets/images/datam8-generation-principle.png)

[Open the generator diagram at full resolution](docs/assets/images/datam8-generation-principle.png)
to inspect the artifact types.

Templates turn a shared metadata model into artifacts suited to your target
technology. You can adapt the templates to your architecture and conventions,
then inspect and version the generated output using your usual development tools.

The diagram illustrates possible artifact types; the original label "Doku" means
documentation. The [sample target reference](docs/generator/README.md) describes
the targets actually included in the sample. Generation writes files; deployment
and execution are subsequent steps in your platform's workflow.

Both diagrams are taken from the ORAYLIS Automation pitch. See
[illustration sources](docs/assets/images/README.md) for provenance.

Use the [documentation index](docs/index.md) for all topics. This documentation
covers DataM8 v2. Start with the current stable app or CLI release linked from
[installation](docs/installation.md). Release notes describe version-specific
requirements; [historical capture evidence](docs/compatibility.md) records the
separate revisions used for the illustrated tutorial.

[Issues](https://github.com/oraylis/datam8/issues) are tracked here. Include the
component and exact versions using the issue form. For sensitive reports, use
[the security reporting route](SECURITY.md).

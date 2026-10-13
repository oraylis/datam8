# Metadata and Generation Concepts

A solution is a `.dm8s` file together with its referenced directories. The file
selects Base, Model, Plugins and generator targets. Copy the whole solution for an
exercise; opening the descriptor alone does not supply its dependencies.

| Concept | Responsibility |
| --- | --- |
| Base | Shared zones, types, products, property definitions/values and data sources |
| Model | Entities, attributes, sources, relationships and transformation metadata |
| Folder | Organizational context, inherited properties and product/module assignments |
| Connector | Describes external source locations and metadata; may support preview |
| Target | Names a template source and output directory |
| Payload | Python-prepared data plus output-path information consumed by a template |
| Generated output | Files to inspect, test and deploy in a separate workflow |

Layers are solution-defined, not a fixed engine pipeline. The tutorial sample uses
Stage, Core, Curated and Consumer. A data-source type defines connector/type mapping;
a data source supplies concrete connection values. Source mappings describe inputs;
relationships describe links between objects. Properties acquire behavior through
the selected target and are not universal engine options.

For field constraints, use the [schema reference](https://github.com/oraylis/datam8-model/blob/feature/v2-beta-port/docs/reference.md).
For actual inherited values and target interpretation, follow the
[illustrated solution chapter](user-guide/solution-and-base.md) and
[sample references](https://github.com/oraylis/datam8-sample-solution/blob/codex/documentation-v2/docs/reference/targets.md).

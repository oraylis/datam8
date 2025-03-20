# _DataM8_ Frontend [Generate Group](../frontend.md#generate-group)

Within the [Generate Group](../frontend.md#generate-group), _DataM8_ provides the option to generate the [stage](../../metadatamodel/zones/stage.md) zone using a data model transformation template with the [generator](../../generator/generator.md). Additionally, it allows the generation of final artifacts of a data warehouse as an output. Logs are printed into the output section, enabling a convenient review of the generation process.

## Working with the generator

### Generate [Stage](../../metadatamodel/zones/stage.md#entity-definition)

The stage generation process involves a pure metadata transformation that creates metadata as a result. To initiate the generation of the stage from the [raw](../../metadatamodel/zones/raw.md#entity-definition) zone metadata, click [Generate Stage](../frontend.md#generate-stage) to invoke the [generator](../../generator/generator.md) CLI tool in the backend. The results will be displayed in the output section.

![Generate Stage](../../assets/images/generate_stage.png)

## Generate Output

The output generation process generates the final data warehouse artifacts from the entire metadata model, preparing them for deployment on the final platform. To generate the output, click [Generate Output](../frontend.md#generate-output) to invoke the [generator](../../generator/generator.md) CLI tool in the backend. The results will be displayed in the output section.

![Generate Output](../../assets/images/generate_output.png)

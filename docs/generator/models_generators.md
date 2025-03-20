# Models Generators

In a newly created solution you will find the folder `__models` in the `Generate`- folder. This folder contains all generators to produce models.

## Stage Generator

The generator `stage.jinja2` is used to generate the stage meta model from the raw entities.
You can control the generators behaviour by using tags on the raw entities.

### Supported tags

| Tag | Description |
| --- | --- |
| ignore | This column will be ignored when creating the stage |

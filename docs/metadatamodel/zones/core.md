# CORE Zone Documentation

## Overview

The **CORE** zone in the _DataM8_ model is central to data loading and transformation, focusing on defining business keys, applying slowly changing dimensions (SCD), and consolidating source tables. The provided JSON sample illustrates the structure and operational aspects of the CORE zone.

## Entity Definition

Entities in the CORE zone include detailed components such as data modules, products, names, display names, and a list of attributes with specific properties:

- **Data Module:** Refers to the module within the CORE zone.
- **Data Product:** Indicates the associated data product.
- **Name & Display Name:** Technical and user-friendly names of the entity.
- **Attributes:** Each attribute is characterized by its name, type, data type, tags, and optional properties like length, nullability, and refactor names.

## Function Definition

This section details the data processing within the CORE zone:

- **Source:** Describes the data origins, with _DataM8_ Locators and mappings indicating how data is integrated and transformed.

### Function Mapping

Function mappings are critical for aligning source data with the CORE zone structure:

1. **Direct Mappings:** Align source data fields with corresponding CORE zone attributes.
2. **Computed Mappings:** Involve complex transformations or computations to populate the CORE zone attributes.

## Enhanced Tags for Core-Entities Attributes

The JSON sample reveals a variety of tags used to define attributes in the CORE zone:

| Tag  | Description |
| ---- | ----------- |
| SID  | System Identifier, uniquely identifying each record. |
| BK   | Business Key, used as a unique identifier for business purposes. |
| SCD0 | Indicates a static attribute whose value remains constant. |
| SCD1 | Marks an attribute that reflects the current value but doesn't track history. |
| SCD2 | Denotes attributes where new values generate new records, preserving historical data. |

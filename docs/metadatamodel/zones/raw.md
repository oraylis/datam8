# RAW Zone Documentation

## Overview

The **RAW** zone serves as the initial stage in the _DataM8_-designed data model. It is dedicated to holding raw data from source systems without any alterations, ensuring the integrity and originality of the data for further processing.

## Entity Definition

Based on the sample JSON, entities in the RAW zone are structured as follows:

- **Data Module:** The module name within the RAW zone.
- **Data Product:** The name of the data product the entity belongs to.
- **Name & Display Name:** The technical and user-friendly names of the entity.
- **Attributes:** Attributes of the entity, each characterized by their type, precision, scale, nullability, and the date they were last modified.

## Function Definition

From the JSON sample, the functionality of the RAW zone is outlined as:

- **Data Source:** Name of the source database from which data is extracted.
- **Source Location:** Specific table or schema location within the source database.

### Detailed Functionality

The primary role of the RAW zone is to accurately capture and store source data, maintaining its original format and structure for authenticity and reliability in subsequent processing stages.

## Tags for Raw-Entities Attributes

While the sample JSON doesn't include specific tags, the RAW zone commonly utilizes tags such as:

| Tag    | Description |
| ------ | ----------- |
| delta  | Used for attributes that assist in delta loading, typically involving incrementing values over time. |
| ignore | Applied to attributes that are not required for extraction, often due to redundancy or irrelevance. |

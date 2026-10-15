# 8. Troubleshooting and Glossary

[Guide index](README.md)

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Browser loads the wrong solution | Restart backend with the correct `--solution`; the dialog path does not switch workspaces |
| Empty Base/Model after a file upload | Open a complete directory through desktop or a bound backend; `.dm8s` alone does not contain its referenced files |
| Save failed or Pending Sync | Restore backend/complete required data; switch context to attempt persistence, verify disk before Reload; explicit editor Retry is currently absent |
| New Project/migration route unavailable | Use a complete v2 sample copy; these historical parity flows are not guaranteed by the pinned backend |
| Connector not found | Check `pluginsPath`, manifest ID, Data Source Type binding and installed dependencies |
| Secret unavailable | Set it through the supported secret workflow; preserve `ref://` rather than embedding the password |
| Locations/metadata fail | Test your own source configuration and driver; do not assume the sample cloud host is accessible |
| Preview disabled | Check connection-specific capabilities; ODCS has no row preview, and Unity Catalog needs a SQL Warehouse ID or HTTP path |
| Unity Catalog preview times out | Preview shares a 30-second budget across auth, SQL and result retrieval; check warehouse availability, permissions and query execution separately from metadata access |
| No configured data type mapping | Use the reported source/object/column/type to add a saved mapping; check Data Source overrides before Data Source Type mappings; no automatic `string` replacement applies |
| Duplicate type mapping | Remove duplicate keys within the reported mapping level; case and surrounding whitespace do not distinguish keys |
| No or more than one default attribute type found | For the mapped model type, keep exactly one Attribute Type with matching `defaultType` and `isDefaultProperty=true`; this applies to backend imports and complete refresh |
| Imported model type or Attribute Type cannot be resolved | Define the referenced model type in Data Types and the selected Attribute Type; frontend metadata-only imports use `Regular`; plugin binding creates neither |
| ODCS validation or path error | Check `apiVersion: v3.2.0`, the reported file/field, accessible configured path and root boundaries; required import fields cannot contain unresolved variables |
| Function create/delete unavailable | Use desktop; browser lacks the constrained file bridge |
| Generation fails | Read target/backend error, check schema compatibility, references and template configuration |
| Generated files missing | Check the selected target's `outputPath` and successful completion; generation is not deployment |

These source-mapping/builtin remedies describe the current development behavior,
not an additional verification of desktop beta.6. See [Sources and Connectors](sources.md)
for setup and version boundaries.

For development startup issues, see [frontend troubleshooting](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/docs/troubleshooting.md).

## Glossary

| Term | Meaning |
| --- | --- |
| Solution | `.dm8s` plus its referenced directories and configuration |
| Base | Shared definitions used by modeled entities |
| Zone | Layer metadata with local/target naming and properties |
| Entity | A modeled object with attributes, sources and processing metadata |
| Attribute | A modeled column, including type, key/history flags and properties |
| Source type | Native type supplied by a connector and retained in source mappings |
| Model type | Type assigned through saved source-to-model mappings and defined in Data Types |
| Default Attribute Type | Semantic definition selected by backend import through matching `defaultType` and `isDefaultProperty=true` |
| Source mapping | Connection between input columns/attributes and output attributes |
| Relationship | Link to another object through source/target attribute pairs |
| Property/value | Named metadata setting and reusable value |
| Inheritance | Effective metadata obtained from ancestor folders |
| Locator | Typed identity/path used to address an entity or folder |
| Connector/plugin | Backend implementation for source navigation/metadata and optional preview |
| Secret reference | `ref://` pointer resolved by the backend's secret system |
| Transformation | Ordered processing metadata, possibly referring to a Python function file |
| Payload | Prepared template-facing data and output-path information |
| Target | Named generation configuration with template and output paths |
| Dirty/Pending Sync | Draft not confirmed synchronized, often due to save failure |

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
| Preview disabled | Check the connector's `previewData` capability |
| Function create/delete unavailable | Use desktop; browser lacks the constrained file bridge |
| Generation fails | Read target/backend error, check schema compatibility, references and template configuration |
| Generated files missing | Check the selected target's `outputPath` and successful completion; generation is not deployment |

For development startup issues, see [frontend troubleshooting](https://github.com/oraylis/datam8-frontend/blob/feature/external_refresh/docs/troubleshooting.md).

## Glossary

| Term | Meaning |
| --- | --- |
| Solution | `.dm8s` plus its referenced directories and configuration |
| Base | Shared definitions used by modeled entities |
| Zone | Layer metadata with local/target naming and properties |
| Entity | A modeled object with attributes, sources and processing metadata |
| Attribute | A modeled column, including type, key/history flags and properties |
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

# Guide Acceptance Evidence

The published [manifest](assets/manifest.json) is the machine-readable record of
the latest capture. This report describes its scope; timestamps and exact commits
come from that manifest rather than inferred release numbers.

## Verified main path

The opt-in runner exercises the real browser UI and local backend on an archived,
sanitized sample copy:

- Load the startup-bound solution and show its four model layers.
- Open all eight Base categories and the Customer editor sections.
- Change a Stage Customer description, verify persisted JSON and reload it.
- Trigger a controlled offline transport failure, restore connectivity and switch context to retry;
  verify the real saved file and restore the original description.
- Open the folder editor, transformation view, entity wizard and refresh selection.
- Select `docs`, generate through the UI, and verify a newly written output index
  containing Customer. The copied pre-existing index is removed before the request.
- Check for uncaught browser errors.

The central save/generate flow asserts UI → request → backend completion → disk
state. No successful backend response is mocked. The offline error illustration
is a controlled network condition, not proof of backend validation behavior.

## Limits

| Scenario | Coverage |
| --- | --- |
| Model edit/save/reload | Real backend and disk assertions |
| `docs` generation | Real request and newly generated output assertions |
| Wizard/refresh dialog | Real initial states; creation and refresh application not exercised by capture |
| SQL source import/preview/refresh review | Not live verified; Docker unavailable in authoring environment |
| Databricks, Lakeflow and Power BI generation | Configured targets documented; not verified by this capture |
| Native picker; function create/delete | Desktop-only, not verified by browser capture |
| Databricks/Azure/Fabric deployment | Not exercised |

Use the manifest's PASS/FAIL records to assess the actual run. The documented
optional workflows require separate acceptance before claiming successful source
connectivity, native desktop operation or cloud deployment.

# Follow-up Backlog

These are reviewable local work items, not issues posted to GitHub. The current
documentation change does not implement product fixes or deploy infrastructure.

| Priority | Owner | Task | Acceptance |
| --- | --- | --- | --- |
| P1 | Frontend | Persistent save failure and explicit retry | Offline save keeps draft/dirty state; accessible error stays visible; retry persists the draft exactly once; component and Playwright regression |
| P1 | Backend | Consistent UTF-8 JSON writes on Windows | Save description containing an em dash, German umlauts and CJK; inspect UTF-8 bytes, reload unchanged text; backend save/reload regression |
| P1 | Schema/backend | Plugin schema requires undeclared `type` | Reproduce Draft7 validation contradiction; decide the coordinated manifest shape; validate a real manifest and regenerate consumers with regression coverage |
| P1 | Release/Frontend | Accept a packaged desktop/sample combination | Record artifact, platform, bundled backend/schema and sample; native open → edit/save/reload → fresh docs output; update compatibility |
| P2 | Frontend/Backend | Local SQL import and refresh evidence | Use local SQL fixture and disposable sample; test connection, preview, import, complete and sources-only refresh; inspect persisted JSON and capture real review/apply states |
| P2 | Sample | Databricks/Power BI target acceptance | Pin runtime/sample; generate each target separately; inspect output paths/content; report failures separately from deployment |
| P2 | Frontend | Desktop-only functions and native dialogs | Exercise native picker and function create/delete with constrained paths; capture real UI and persisted files |
| P2 | Sample | Replace existing Azure pipeline recipe | Remove superseded tooling; use pinned v2 validate/generate commands in a test pipeline; environment/secret setup remains explicit; no automatic cloud deployment |
| P2 | Sample | Lakeflow target integration | Separate authorized target-port change; document implementation differences and test generated output before adding it to main-derived target reference |
| P2 | Maintainers | Publish support commitments | Identify maintained beta/release versions and reporting process without inferring commitments from stale version tables |
| P3 | Documentation | Documentation website | Render the central Markdown and assets; preserve version/pin navigation; do not maintain duplicate text |

## Product reproductions

**Save failure:** edit a Customer description in the browser, disable transport,
leave the field and observe the transient Save failed status. Restore transport.
The current capture retries by switching context. A fix must preserve the draft
and make failure/recovery discoverable without relying on a two-second status.

**Windows encoding:** the earlier capture found an em dash serialized using a
platform encoding. Reproduce at the persisted entity file and backend write path;
compare bytes and reload. Do not assume that an ASCII-only test detects this issue.

**Plugin schema:** draft-07 schema validation permits only declared properties;
the selected schema requires `type` without declaring it. Documentation records
the inconsistency; changing constraints/generated models needs its own coordinated patch.

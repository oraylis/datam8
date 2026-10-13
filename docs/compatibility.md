# Compatibility and Verification Evidence

Do not infer compatibility from matching beta numbers or the moving `main` branch.
Use a complete, tested frontend/backend/schema/sample combination. Installed desktop
packages supply their own backend; a separately installed CLI does not replace it.

## Published desktop candidate

The [v2.0.0-beta.6 desktop release](https://github.com/oraylis/datam8-frontend/releases/tag/v2.0.0-beta.6)
points to frontend commit `a57ae23e07c7496c3202e0343929d1a42ccf216c`.
Its Git tree pins backend source `53cc8214a2b388c3988affd4b55d8b04e9cdb55d`,
which pins schema source `beaea1839810dcd535d87d0a973e67b8e9959e3e`.
These are release source pins, not an inspection of the installed artifact's runtime.
Artifact availability is verified from release metadata. Packaged execution and
compatibility with either sample revision below have **not** been verified by this
documentation update. Read its plugin-layout breaking change before opening a solution.
The separate [CLI beta.4 release](https://github.com/oraylis/datam8-cli/releases/tag/v2.0.0-beta.4)
is not evidence of the backend bundled in desktop beta.6.

## Recorded browser tutorial combination

| Component | Exact revision | Evidence |
| --- | --- | --- |
| Frontend | `49bff0163b9e9a4576f9f71ac55a5ef0007f1445` | Local browser UI capture |
| Backend | `b2005a09830e997369f1995f11e51fa64bb968ac` | Real HTTP completion and file assertions |
| Schema | `b0d129ec4478485bc579943f7d44e35c063ffca4` | Backend's pinned schema checkout |
| Sample | `1e1855e59e2734b3a393f9128193504626ab9380` | Archived disposable copy; four configured targets |

This is a development combination, not an installed-release recommendation. The
[original manifest](user-guide/assets/manifest.json) records five passing checks,
22 captures and limits. Moving the images does not retest another version.

## Sample documentation baseline

The sample documentation branch starts at main commit
`68001a2dcaa0b2931ee341f3527b96266a6e46da`. Its descriptor defines **three** targets:
databricks (`Generate/databricks-lake`), powerbi and docs. Its package configuration
pins CLI beta.1. Do not combine its paths with the four-target tutorial snapshot.
Current-backend generation of this baseline is checked separately and any failure
is recorded in [the handoff](handoff.md); it is not assumed compatible.

The 2026-10-01 CLI run passed validate and docs generation using backend
`85683fcaeaf13c4573bee3de9c4668b1ba3ab3b9` and its pinned schema
`f7dd5f519c5e17c5b595c5b99f600c51b9fe84ac`. The copied pre-existing index was
removed before generating; the new index contains Customer. This verifies that
CLI path, not desktop beta.6, source connectivity or all targets. See [verification](verification.md).

## Accepting a release combination

Record the release artifact, platform/architecture, packaged backend version and
build provenance, exact schema/sample commits, and plugin layout. On a disposable
copy, exercise native open, edit/save/reload and docs generation; inspect files.
Record PASS, FAIL or SKIP for SQL import/refresh and other targets separately.
Only after that run should this page recommend the combination as verified.

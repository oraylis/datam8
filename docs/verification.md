# Documentation Verification — 2026-10-01

## Passed

| Check | Result |
| --- | --- |
| Frontend documentation | 38 Markdown files, no local link/anchor/image errors |
| Central documentation | All Markdown and required original capture evidence pass |
| Backend documentation | 12 Markdown files, no local errors |
| Model documentation | 5 Markdown files, no local errors |
| Sample documentation | 14 Markdown files; target table matches the three-target descriptor |
| Documentation checker regressions | Five passing tests for links/anchors, references, formatting, incomplete capture and stale target paths |
| Cross-repository references | All mapped local feature and commit-bound targets resolve; new remote pages remain pending publication |
| Frontend typecheck | Desktop, web, UI and shared types pass |
| Capture export interface | `--help`, syntax check and explicit `--publish-dir` run pass |
| Browser acceptance | Real load, save/reload, controlled offline recovery, fresh docs output and no uncaught page errors pass |
| Sample main CLI acceptance | Validate and docs generation exit zero; removed pre-existing index is newly generated and contains Customer |
| Whitespace | Git diff checks pass in all five workspaces |

The five documentation-checker copies are identical. Each repository has its own
dependency-free CI job; ordinary checks do not require another repository or the
sample. The cross-repository checker is a separate opt-in workspace check.

## Evidence boundaries

The published 22 PNGs and [original manifest](user-guide/assets/manifest.json) retain
their 2026-09-30 provenance. The new capture exported 22 images into the frontend's
ignored verification directory; it did not overwrite the published illustrations.

[Current-run evidence](verification/2026-10-01.json) records the checked revisions
and acceptance results. The browser run includes existing frontend generated-type
changes and backend documentation changes; it does not describe a pristine release.
The offline transport failure is deliberate and expected, not an uncaught browser error.

## Skipped and pending

- Installed desktop beta.6 execution, native picker and function create/delete.
- Live SQL connection/import/preview/refresh application; no local SQL fixture was configured.
- Databricks, Lakeflow and Power BI generation/deployment acceptance.
- Remote resolution of newly written feature-branch pages until their branches are pushed.
- Website publication and supported-release commitments.

These remain explicit [follow-up tasks](todos.md). No product code, schema JSON,
target implementation, dependency pin or default branch was changed by this update.
See [handoff](handoff.md) for the manual integration order.

# Documentation Integration Handoff

## Workspaces and branches

| Repository | Workspace | Branch | Package |
| --- | --- | --- | --- |
| datam8 | sibling `datam8` clone | `codex/documentation-v2` from main `4002a0ea0ae2f66f56c310da2f569ed5181e7558` | Product index, installation, guide + 22 images, compatibility, maintenance, backlog and issue forms |
| Frontend | existing frontend checkout | `feature/external_refresh` | Handbook redirects, capture export option, docs checker and maintenance |
| Backend | frontend's Generator submodule | `feature/external_refresh` | Canonical current HTTP reference, CLI usage/index, docs checks |
| Model | sibling `datam8-model` checkout | `feature/v2-beta-port` | Schema reference, consumer generation, AGENTS and docs checks |
| Sample | sibling `datam8-sample-docs` worktree | `codex/documentation-v2` from main `68001a2dcaa0b2931ee341f3527b96266a6e46da` | Three-target local workflow, templates/deployment docs and checks |

All changes are local and uncommitted. No branch has been pushed or merged by this
documentation task. Preserve pre-existing Frontend changes, generated schema types
and the existing submodule revision; do not stage them blindly as documentation.
The original sample `feature/databricks-lakeflow` checkout retains its Address.json
change. Schema JSON, product code and target metadata/templates were not changed.

## Manual integration order

1. Review and commit Backend, Model and Sample documentation on the listed branches.
2. Push those feature branches before relying on their new document links remotely.
3. Review, commit and publish the central documentation branch.
4. Publish Frontend redirects and capture changes once central targets are accessible.
5. Merge each feature branch to main manually; update development links to main
   after their destinations land. Leave tutorial/evidence commit pins unchanged.

New documentation URLs intentionally refer to the planned feature branches. Local
cross-repository targets are checked before handoff; newly created pages remain
pending remote verification until the branches are pushed. No default branch,
submodule pin, package dependency or release has been changed for this documentation.

## Evidence

The guide retains the original 2026-09-30 PNGs and manifest, copied byte-for-byte.
Its browser tuple is Frontend `49bff0163b9e9a4576f9f71ac55a5ef0007f1445`, Backend
`b2005a09830e997369f1995f11e51fa64bb968ac`, Schema
`b0d129ec4478485bc579943f7d44e35c063ffca4`, Sample
`1e1855e59e2734b3a393f9128193504626ab9380`. Moving it does not recertify desktop beta.6.

On 2026-10-01, the current backend `85683fcaeaf13c4573bee3de9c4668b1ba3ab3b9`
with pinned schema `f7dd5f519c5e17c5b595c5b99f600c51b9fe84ac` validated a disposable
sample-main archive and generated its docs. Final results are recorded in the
[verification report](verification.md).

Packaged desktop, native function operations, live SQL and cloud deployment are
not accepted by these checks. See [backlog](todos.md) for separate acceptance tasks.

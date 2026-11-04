# Maintain Documentation

| Topic | Review owner |
| --- | --- |
| Product navigation, installation and compatibility | DataM8 documentation maintainers |
| UI instructions and screenshots | Frontend maintainers |
| CLI/API and Python plugin semantics | Backend maintainers |
| Field constraints and model versions | Schema maintainers |
| Concrete targets, payloads and deployment | Sample/automation maintainers |

The public handbook is maintained here. Component references remain beside their
code. Read [responsibilities](repositories.md) before adding a technical section.

## Checks and review

Run Node 24: `node --test scripts/check-docs.test.mjs` and
`node scripts/check-docs.mjs`. CI checks local links, anchors, image existence,
alt text and capture evidence. External URLs are not fetched by ordinary CI.
Check newly introduced cross-repository links against the intended branch/commit
before handoff; see [handoff](handoff.md) for unpublished branch dependencies.

For a local cross-repository check, create a JSON object mapping `datam8`,
`datam8-frontend`, `datam8-cli`, `datam8-model` and `datam8-sample-solution` to
absolute checkout paths, then run `node scripts/check-repository-links.mjs
--workspace-map /path/to/workspaces.json`. The checker resolves feature content
locally and commit-bound references through Git without contacting source systems.

For a UI workflow change, update the affected chapter, regenerate affected images,
inspect them visually and copy the complete export with its manifest. Use the
[frontend capture procedure](https://github.com/oraylis/datam8-frontend/blob/main/docs/user-guide/capture.md). Keep raw
screenshots/logs locally; publish sanitized images with honest coverage descriptions.

## Version policy

General installation pages link to each product's current stable release rather
than naming a current release number. Use `<version>` in package filename examples
and direct readers to the selected release's Assets and verification files.
Developer references follow `main`; installed-release behavior uses the matching
tag. Keep exact versions only for behavior changes, compatibility constraints,
release notes and recorded evidence. A routine release should not require edits
to otherwise unchanged handbook chapters.

Preserve screenshot manifests, capture commits and dated test results. Updating a
release link or prose does not revalidate those captures against a new runtime.

## Release review

Resolve artifact and bundled-runtime provenance, pin the sample, run the documented
flow, update compatibility and record PASS/FAIL/SKIP. A screenshot of a dialog
does not verify applying its operation. Browser coverage does not verify Electron.

After manual merges, replace development branch links with main links and verify
them. Retain commit pins for tutorials and evidence. A future website must consume
these Markdown sources rather than maintaining another handbook copy.

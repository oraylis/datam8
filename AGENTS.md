# Working in DataM8 Documentation

This repository owns the v2 product entry point and English user handbook.

- Read [the index](docs/index.md), [ownership](docs/repositories.md) and the affected topic.
- Component APIs, schemas and target semantics remain canonical in their repositories.
  Link those references; do not copy payload specifications into the handbook.
- Keep general installation and entry points release-independent. Use exact versions
  for compatibility constraints, behavior changes and recorded evidence, following
  the [version policy](docs/maintenance.md#version-policy).
- Preserve capture provenance and distinguish browser, desktop, connected-source
  and deployment evidence. A prose update does not revalidate an older capture.
- Use disposable solution copies for exercises. Do not contact the sample cloud source.
- Update chapter text, images and manifest together when UI behavior changes.
- Continue authorized local editing and documentation checks without a separate
  approval for each step. Keep unrelated changes intact.
- Run `node --test scripts/check-docs.test.mjs` and `node scripts/check-docs.mjs`.
  The checks need Node 24 and no sample checkout.
- Report passes, failures and skips separately. Feature branches are merged manually
  by the maintainer; [maintenance](docs/maintenance.md) defines publication checks.

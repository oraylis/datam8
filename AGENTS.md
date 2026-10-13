# Working in DataM8 Documentation

This repository owns the v2 product entry point and English user handbook.

- Read [the index](docs/index.md), [ownership](docs/repositories.md) and the affected topic.
- Component APIs, schemas and target semantics remain canonical in their repositories.
  Link those references; do not copy payload specifications into the handbook.
- Describe the exact supported version. Preserve capture provenance and distinguish
  browser, desktop, connected-source and deployment evidence.
- Use disposable solution copies for exercises. Do not contact the sample cloud source.
- Update chapter text, images and manifest together when UI behavior changes.
- Keep unrelated changes intact. Feature branches are merged manually by the maintainer.
- Run `node --test scripts/check-docs.test.mjs` and `node scripts/check-docs.mjs`.
  The checks need Node 24 and no sample checkout.
- [Maintenance](docs/maintenance.md) defines review and publication checks.

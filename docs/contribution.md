# Contribute to DataM8

Choose the owning repository from [responsibilities](repositories.md). Read its
AGENTS.md and affected references. UI changes belong in Frontend; backend semantics
in CLI; schema shapes in Model; concrete target behavior in Sample.

Use a feature branch. For this documentation integration, the maintainer merges
all branches manually; see [handoff](handoff.md). Do not update submodule pins or
generated types just to accompany prose changes.

Include the problem, resulting behavior, relevant tests and documentation impact
in each change description. HTTP changes update the canonical backend contract
first and include consumer tests. Critical cross-component behavior needs UI to
real backend completion to persisted output/state assertions.

For documentation changes, run `node scripts/check-docs.mjs` in each changed
repository. Update affected screenshots using [maintenance](maintenance.md).
Report passing, failing and skipped checks separately. Submit issues using the
central component/version form; sensitive reports use [SECURITY.md](../SECURITY.md).

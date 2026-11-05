import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("./check-repository-links.mjs", import.meta.url));

test("workspace branch links resolve without replacing tag or commit evidence", () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "dm8-links-"));
  try {
    const source = path.join(temporary, "source");
    const target = path.join(temporary, "target");
    for (const directory of [source, target]) {
      fs.mkdirSync(directory);
      execFileSync("git", ["init", "--initial-branch=main", directory], {stdio: "ignore"});
    }
    const git = (...args) => execFileSync("git", ["-C", target, ...args],
      {encoding: "utf8", stdio: ["ignore", "pipe", "pipe"]}).trim();
    git("config", "user.name", "Link checker fixture");
    git("config", "user.email", "fixture@example.invalid");
    fs.writeFileSync(path.join(target, "README.md"), "# Original\n");
    git("add", "README.md");
    git("commit", "-m", "Fixture baseline");
    const commit = git("rev-parse", "HEAD");
    git("tag", "v1");
    git("branch", "feature/task-route");
    fs.writeFileSync(path.join(target, "README.md"), "# Workspace\n");
    const links = [
      "# Links",
      "",
      "[Root](https://github.com/oraylis/fixture-target/tree/main)",
      "[Main](https://github.com/oraylis/fixture-target/blob/main/README.md#workspace)",
      "[Branch](https://github.com/oraylis/fixture-target/blob/feature/task-route/README.md#workspace)",
      "[Tag](https://github.com/oraylis/fixture-target/blob/v1/README.md#original)",
      `[Commit](https://github.com/oraylis/fixture-target/blob/${commit}/README.md#original)`,
      "",
    ].join("\n");
    const sourceFile = path.join(source, "README.md");
    fs.writeFileSync(sourceFile, links);
    const mapping = path.join(temporary, "mapping.json");
    fs.writeFileSync(mapping, JSON.stringify({"fixture-source": source, "fixture-target": target}));
    const check = (...args) => spawnSync(process.execPath, [checker, "--workspace-map", mapping, ...args],
      {encoding: "utf8"});

    const working = check("--prefer-workspace");
    assert.equal(working.status, 0, working.stderr);
    assert.match(working.stdout, /0 problem/);
    assert.equal(check().status, 1, "default validation must use the committed branch");

    fs.writeFileSync(sourceFile, links.replace(`${commit}/README.md#original`, `${commit}/README.md#workspace`));
    const pinned = check("--prefer-workspace");
    assert.equal(pinned.status, 1, "workspace validation must preserve commit pins");
    assert.match(pinned.stderr, /Missing heading fragment/);
  } finally {
    assert.ok(path.resolve(temporary).startsWith(path.resolve(os.tmpdir()) + path.sep));
    fs.rmSync(temporary, {recursive: true, force: true});
  }
});

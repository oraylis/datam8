import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs } from "node:util";
import { documentationFiles, headingAnchors, proseLines } from "./check-docs.mjs";

const { values } = parseArgs({ options: {
  "workspace-map": { type: "string" },
  "prefer-workspace": { type: "boolean", default: false },
} });
if (!values["workspace-map"]) throw new Error("Pass --workspace-map <JSON file mapping public repository names to local checkouts>.");
const mapping = JSON.parse(fs.readFileSync(values["workspace-map"], "utf8"));
const refsByRoot = new Map();
for (const repoRoot of Object.values(mapping)) {
  const refs = new Map();
  const names = execFileSync("git", ["-C", repoRoot, "for-each-ref", "--format=%(refname)"],
    { encoding: "utf8" }).trim().split("\n");
  for (const name of names) {
    const match = name.match(/^refs\/(heads|tags|remotes\/origin)\/(.+)$/);
    if (!match || match[2] === "HEAD") continue;
    if (!refs.has(match[2]) || match[1] === "remotes/origin") {
      refs.set(match[2], { gitRef: name, branch: match[1] !== "tags" });
    }
  }
  refsByRoot.set(repoRoot, refs);
}
const errors = [];
let checked = 0;
let localFeatureTargets = 0;

for (const repoRoot of Object.values(mapping)) {
  for (const file of documentationFiles(repoRoot)) {
    const source = proseLines(fs.readFileSync(file, "utf8")).join("\n");
    const matches = source.matchAll(/https:\/\/github\.com\/oraylis\/([^/\s)]+)\/(?:blob|tree)\/([^\s)<>]+)/g);
    for (const match of matches) {
      const repo = match[1] === "datam8-generator" ? "datam8-cli" : match[1];
      const targetRoot = mapping[repo];
      if (!targetRoot) continue;
      const rest = decodeURIComponent(match[2]);
      const refs = refsByRoot.get(targetRoot);
      const ref = [...refs.keys()].sort((a, b) => b.length - a.length)
        .find(name => rest.startsWith(`${name}/`)) || rest.split("/")[0];
      const targetRef = refs.get(ref);
      const [relative, fragment] = rest.slice(ref.length + 1).split("#");
      try {
        let content;
        if (values["prefer-workspace"] && targetRef?.branch) {
          const target = path.resolve(targetRoot, relative);
          if (target !== path.resolve(targetRoot) && !target.startsWith(path.resolve(targetRoot) + path.sep)) throw new Error("Path escapes repository");
          if (!fs.existsSync(target)) throw new Error("Missing local branch target");
          content = fs.statSync(target).isFile() ? fs.readFileSync(target, "utf8") : "";
          localFeatureTargets++;
        } else {
          content = execFileSync("git", ["-C", targetRoot, "show", `${targetRef?.gitRef || ref}:${relative}`], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
        }
        if (fragment && relative.endsWith(".md") && !headingAnchors(content).has(fragment)) throw new Error("Missing heading fragment");
        checked++;
      } catch (error) {
        errors.push(`${path.relative(repoRoot, file)}: ${match[0]} (${error.message.split("\n")[0]})`);
      }
    }
  }
}
for (const error of errors) console.error(error);
console.log(`Checked ${checked} cross-repository targets; ${localFeatureTargets} against local workspace content. ${errors.length} problem(s).`);
process.exitCode = errors.length ? 1 : 0;

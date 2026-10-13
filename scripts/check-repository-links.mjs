import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parseArgs } from "node:util";
import { documentationFiles, headingAnchors, proseLines } from "./check-docs.mjs";

const { values } = parseArgs({ options: { "workspace-map": { type: "string" } } });
if (!values["workspace-map"]) throw new Error("Pass --workspace-map <JSON file mapping public repository names to local checkouts>.");
const mapping = JSON.parse(fs.readFileSync(values["workspace-map"], "utf8"));
const branches = ["codex/documentation-v2", "feature/external_refresh", "feature/v2-beta-port"];
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
      const branch = branches.find(ref => rest.startsWith(`${ref}/`));
      const ref = branch || rest.split("/")[0];
      const [relative, fragment] = rest.slice(ref.length + 1).split("#");
      try {
        let content;
        if (branch) {
          const target = path.resolve(targetRoot, relative);
          if (!target.startsWith(path.resolve(targetRoot) + path.sep)) throw new Error("Path escapes repository");
          if (!fs.existsSync(target)) throw new Error("Missing local branch target");
          content = fs.statSync(target).isFile() ? fs.readFileSync(target, "utf8") : "";
          localFeatureTargets++;
        } else {
          content = execFileSync("git", ["-C", targetRoot, "show", `${ref}:${relative}`], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
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
console.log(`Checked ${checked} cross-repository targets; ${localFeatureTargets} against local feature content. ${errors.length} problem(s). New feature pages need separate remote verification after push.`);
process.exitCode = errors.length ? 1 : 0;

// 独立验证：重算链并与 audit-chain.json 比对。任何一条记录被改，root 不匹配。
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const REPOS = JSON.parse(readFileSync("data/repos.json", "utf8"));
const PAPERS = JSON.parse(readFileSync("data/papers.json", "utf8"));
const COMPS = JSON.parse(readFileSync("data/comps.json", "utf8"));
const EXPECTED = JSON.parse(readFileSync("data/audit-chain.json", "utf8"));

function canonical(obj) {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(canonical).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + canonical(obj[k])).join(",") + "}";
}
function chain(records, label) {
  let prev = "GENESIS:" + label;
  const nodes = [];
  for (const r of records) {
    const h = createHash("sha256").update(prev + "|" + canonical(r)).digest("hex");
    nodes.push({ id: r.slug || "?", hash: h });
    prev = h;
  }
  return { label, count: records.length, root: prev, nodes };
}
const sets = [
  [ [...REPOS].sort((a,b)=>a.slug.localeCompare(b.slug)), "repos" ],
  [ [...PAPERS].sort((a,b)=>a.slug.localeCompare(b.slug)), "papers" ],
  [ [...COMPS].sort((a,b)=>a.slug.localeCompare(b.slug)), "comps" ]
];
const chains = sets.map(([recs,label]) => chain(recs, label));
const root = createHash("sha256").update(chains.map(c => c.root).join("|")).digest("hex");

let fail = 0;
chains.forEach(c => {
  const exp = EXPECTED.chains.find(x => x.label === c.label);
  if (!exp || exp.root !== c.root) { console.log("✗ chain mismatch:", c.label); fail++; }
  else console.log("✓", c.label, c.count, "records, root", c.root.slice(0, 16) + "…");
});
if (root !== EXPECTED.root) { console.log("✗ combined root mismatch"); fail++; }
else console.log("✓ combined root", root);
console.log(fail ? "VERIFY_FAIL" : "VERIFY_PASS");
process.exit(fail ? 1 : 0);

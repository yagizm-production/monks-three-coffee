import { mkdir, writeFile, cp, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";

const base = "/monks-three-coffee";
const origin = process.env.PREVIEW_ORIGIN || "http://127.0.0.1:8081";
const out = process.env.PAGES_OUT || "pages-dist";
const routes = ["", "menu", "galeri", "hikaye", "ulasim", "yonetim"];

function rewrite(text) {
  return text
    .replaceAll(`${base}/cafe/`, `${base}/cafe/`)
    .replaceAll("url(/cafe/", `url(${base}/cafe/`)
    .replaceAll('"/cafe/', `"${base}/cafe/`)
    .replaceAll("'/cafe/", `'${base}/cafe/`)
    .replaceAll("(/cafe/", `(${base}/cafe/`)
    .replaceAll('"/favicon.svg"', `"${base}/favicon.svg"`)
    .replaceAll('"/og.jpg"', `"${base}/og.jpg"`);
}

async function walk(dir, files = []) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, name.name);
    if (name.isDirectory()) await walk(path, files);
    else files.push(path);
  }
  return files;
}

await cp(".vercel/output/static", out, { recursive: true });
for (const route of routes) {
  const url = `${origin}${base}/${route}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const html = rewrite(await res.text());
  const file = route ? join(out, route, "index.html") : join(out, "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
await writeFile(join(out, "404.html"), await (await import("node:fs/promises")).readFile(join(out, "index.html")));

for (const file of await walk(out)) {
  if (!/\.(html|css|js|mjs|svg|json|webmanifest)$/.test(file)) continue;
  const { readFile } = await import("node:fs/promises");
  const raw = await readFile(file, "utf8");
  const next = rewrite(raw);
  if (next !== raw) await writeFile(file, next);
}
console.log("wrote", out);

import { access, readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";

const root = resolve("dist");
const failures = [];
const htmlFiles = [];

async function walk(directory) {
  for (const name of await readdir(directory)) {
    const path = join(directory, name);
    const details = await stat(path);
    if (details.isDirectory()) await walk(path);
    else if (extname(path) === ".html") htmlFiles.push(path);
  }
}

function fail(file, message) {
  failures.push(`${relative(root, file)}: ${message}`);
}

await walk(root);

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  if (!/<html\s+lang=/i.test(html)) fail(file, "missing document language");
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(file, "missing page title");
  if (!/<meta\s+name="description"/i.test(html)) fail(file, "missing meta description");
  if (!/<link\s+rel="canonical"/i.test(html)) fail(file, "missing canonical URL");
  if (!/<main(?:\s|>)/i.test(html)) fail(file, "missing main landmark");
  if (!/class="skip-link"/i.test(html)) fail(file, "missing skip link");

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(match[1])) fail(file, `broken page anchor #${match[1]}`);
  }

  for (const match of html.matchAll(/(?:href|src)="\/(?!\/)([^"?#]+)[^"]*"/g)) {
    const target = join(root, decodeURIComponent(match[1]));
    try { await access(target); }
    catch { fail(file, `missing local asset /${match[1]}`); }
  }

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt="[^"]*"/i.test(image[0])) fail(file, "image missing alt text");
  }
}

for (const required of ["404.html", "robots.txt", "sitemap.xml", "downloads/Kranthi_Delivery_Leader.pdf"]) {
  try { await access(join(root, required)); }
  catch { failures.push(`${required}: required build artifact missing`); }
}

if (failures.length) {
  console.error(`Validation failed with ${failures.length} issue(s):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files and all required release artifacts.`);

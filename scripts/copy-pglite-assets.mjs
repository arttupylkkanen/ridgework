#!/usr/bin/env node
/**
 * PGLite resolves its `pglite.wasm` / `initdb.wasm` / `pglite.data` siblings at
 * runtime via `new URL("./pglite.data", <its own module's location>)` (see
 * `@electric-sql/pglite/dist/index.cjs`). That location is a literal
 * `new URL(..., import.meta.url)`-style call, so Vite/Nitro's static asset
 * tracing never sees it — the Vercel function bundle ships the JS but not
 * these binaries, and the PGLite fallback (used whenever `DATABASE_URL` is
 * unset, e.g. a preview deploy without it configured) crashes the whole
 * function with an uncaught ENOENT on its first query.
 *
 * Runs after `vite build` (which is also when Nitro writes
 * `.vercel/output/functions/__server.func/`): find every bundled chunk that
 * looks like PGLite's own library bundle and copy the three asset files next
 * to it, matching where its runtime `new URL(...)` lookup expects them.
 */
import { readdir, copyFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const functionsDir = join(root, ".vercel", "output", "functions");
const ASSET_NAMES = ["pglite.data", "pglite.wasm", "initdb.wasm"];

function pgliteDistDir() {
  // The package's `exports` map doesn't expose `package.json` as a subpath, but
  // its main entry already resolves into `dist/`.
  return dirname(require.resolve("@electric-sql/pglite"));
}

async function findPgliteChunkDirs(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const hits = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      hits.push(...(await findPgliteChunkDirs(full)));
    } else if (/pglite.*\.mjs$/i.test(entry.name)) {
      hits.push(dir);
    }
  }
  return hits;
}

async function exists(path) {
  return access(path)
    .then(() => true)
    .catch(() => false);
}

async function main() {
  if (!(await exists(functionsDir))) {
    console.log(
      "[copy-pglite-assets] no .vercel/output/functions/ — not a Vercel build, skipping.",
    );
    return;
  }

  const chunkDirs = new Set(await findPgliteChunkDirs(functionsDir));
  if (chunkDirs.size === 0) {
    console.log("[copy-pglite-assets] no bundled PGLite chunk found — nothing to do.");
    return;
  }

  const distDir = pgliteDistDir();
  let copied = 0;
  for (const dir of chunkDirs) {
    for (const name of ASSET_NAMES) {
      await copyFile(join(distDir, name), join(dir, name));
      copied += 1;
    }
    console.log(`[copy-pglite-assets] copied ${ASSET_NAMES.join(", ")} -> ${dir}`);
  }
  console.log(
    `[copy-pglite-assets] done — ${copied} file(s) copied across ${chunkDirs.size} location(s).`,
  );
}

main().catch((err) => {
  console.error("[copy-pglite-assets] failed:", err?.message || err);
  process.exit(1);
});

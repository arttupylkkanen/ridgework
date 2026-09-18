#!/usr/bin/env node
/**
 * Remove the builder platform's own assets from the deployed output.
 *
 * `public/__grok/` holds the sandbox's "add to home screen" tutorial and a Grok
 * logo. `vite.config.ts` already keeps platform chrome out of `<head>` — no
 * injected script, no `/__grok/manifest.webmanifest` — but Vite copies
 * `public/` to the output verbatim, so eight files including `logo-grok.svg`
 * were still served from ridgework.org. The product brief forbids exactly that.
 *
 * Runs after `vite build`. The files stay on disk, because the sandbox contract
 * recorded in `vite.config.ts` forbids deleting the platform's own files; only
 * the copies in `.vercel/output/static/` go.
 *
 * It fails the build rather than warning. A silent skip here means a foreign
 * logo on the production site, and nobody would look at this log again.
 */
import { readdir, rm, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { chromeEntries } from "./platform-chrome.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const staticDir = join(root, ".vercel", "output", "static");

async function exists(path) {
  return access(path)
    .then(() => true)
    .catch(() => false);
}

async function main() {
  if (!(await exists(staticDir))) {
    console.log(
      "[strip-platform-chrome] no .vercel/output/static/ — not a Vercel build, skipping.",
    );
    return;
  }

  const names = chromeEntries(await readdir(publicDir));
  if (names.length === 0) {
    console.log("[strip-platform-chrome] no platform chrome in public/ — nothing to do.");
    return;
  }

  for (const name of names) {
    const target = join(staticDir, name);
    if (await exists(target)) {
      await rm(target, { recursive: true, force: true });
      console.log(`[strip-platform-chrome] removed ${name}/ from the build output`);
    }
  }

  // Verify rather than trust. This is the whole point of the script.
  const survivors = [];
  for (const name of names) {
    if (await exists(join(staticDir, name))) survivors.push(name);
  }
  if (survivors.length > 0) {
    throw new Error(`platform chrome still in the output: ${survivors.join(", ")}`);
  }
  console.log(
    `[strip-platform-chrome] done — ${names.length} director(y/ies) kept out of the deploy.`,
  );
}

main().catch((err) => {
  console.error("[strip-platform-chrome] failed:", err?.message || err);
  process.exit(1);
});

/**
 * Rebuilds the responsive WebP set in public/field from the JPEGs in
 * assets/field-src.
 *
 * The sources are ~1 MB each at ~1792px wide and stay outside public/ so they
 * are versioned but never deployed. Every photo is emitted at each width in
 * PHOTO_WIDTHS, the same list src/lib/program-media.ts builds its srcset from —
 * keep the two in step.
 *
 * Needs Pillow: python3 -c "import PIL". Run it after adding or replacing a
 * source JPEG, then commit the .webp files it writes.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const WIDTHS = [640, 1024, 1536];
const QUALITY = 72;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const python = `
from PIL import Image
import glob, os, sys

widths = [${WIDTHS.join(", ")}]
before = after = 0
for src in sorted(glob.glob(os.path.join(sys.argv[1], "assets/field-src/*.jpg"))):
    stem = os.path.splitext(os.path.basename(src))[0]
    before += os.path.getsize(src)
    im = Image.open(src).convert("RGB")
    for w in widths:
        if w > im.width:
            continue
        h = round(im.height * w / im.width)
        out = os.path.join(sys.argv[1], "public/field", f"{stem}-{w}.webp")
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=${QUALITY}, method=6)
        after += os.path.getsize(out)
    print(f"{stem}  {im.width}x{im.height}")
print(f"\\nsources {before // 1024} KB -> webp set {after // 1024} KB")
`;

const run = spawnSync("python3", ["-c", python, root], { stdio: "inherit" });
if (run.status !== 0) {
  console.error("photos: conversion failed (is Pillow installed?)");
  process.exit(run.status ?? 1);
}

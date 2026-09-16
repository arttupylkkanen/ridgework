import type { ObjectiveId } from "./rolling-plan";

/**
 * Widths emitted by scripts/photos.mjs for every photo in public/field. The
 * source JPEGs are ~1 MB; these are the files actually served. Keep this list
 * and the one in the script in step.
 */
export const PHOTO_WIDTHS = [640, 1024, 1536] as const;

/**
 * `name` is the basename under /field with no width suffix or extension.
 * `width` and `height` are the source dimensions, carried so the browser can
 * reserve the right box before anything downloads.
 */
export type Photo = { name: string; width: number; height: number };

const WIDE = { width: 1792, height: 1008 } as const;
const TALL = { width: 1728, height: 1152 } as const;

export const PHOTOS = {
  alpineGlacier: { name: "alpine-glacier", ...WIDE },
  chamonixTrail: { name: "chamonix-trail", ...WIDE },
  colBonhomme: { name: "col-bonhomme", ...TALL },
  colFerret: { name: "col-ferret", ...TALL },
  courmayeurTds: { name: "courmayeur-tds", ...TALL },
  dolomites: { name: "dolomites", ...TALL },
  engine: { name: "engine", ...WIDE },
  expedition: { name: "expedition", ...WIDE },
  hauteRoute: { name: "haute-route", ...TALL },
  iceWall: { name: "ice-wall", ...WIDE },
  sierreZinal: { name: "sierre-zinal", ...TALL },
  trail20: { name: "trail-20", ...WIDE },
  traverse: { name: "traverse", width: 1600, height: 900 },
  ultraRidge: { name: "ultra-ridge", ...WIDE },
} as const satisfies Record<string, Photo>;

export type PhotoId = keyof typeof PHOTOS;

/** Fallback for browsers that ignore srcset. Middle width, not the largest. */
export function photoSrc(photo: Photo): string {
  return `/field/${photo.name}-1024.webp`;
}

export function photoSrcSet(photo: Photo): string {
  return PHOTO_WIDTHS.map((w) => `/field/${photo.name}-${w}.webp ${w}w`).join(", ");
}

export const PROGRAM_MEDIA: Record<ObjectiveId, Photo> = {
  engine: PHOTOS.engine,
  trail20: PHOTOS.trail20,
  fifty: PHOTOS.sierreZinal,
  ultra100: PHOTOS.ultraRidge,
  alpine: PHOTOS.alpineGlacier,
  traverse: PHOTOS.traverse,
  expedition: PHOTOS.expedition,
};

export const METHOD_PHOTO: Photo = PHOTOS.engine;

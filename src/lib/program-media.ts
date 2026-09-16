import type { ObjectiveId } from "./rolling-plan";

export type Photo = { src: string; width: number; height: number };

export const PROGRAM_MEDIA: Record<ObjectiveId, Photo> = {
  engine: { src: "/field/engine.jpg", width: 1792, height: 1008 },
  trail20: { src: "/field/trail-20.jpg", width: 1792, height: 1008 },
  fifty: { src: "/field/sierre-zinal.jpg", width: 1728, height: 1152 },
  ultra100: { src: "/field/ultra-ridge.jpg", width: 1792, height: 1008 },
  alpine: { src: "/field/alpine-glacier.jpg", width: 1792, height: 1008 },
  traverse: { src: "/field/traverse.jpg", width: 1600, height: 900 },
  expedition: { src: "/field/expedition.jpg", width: 1792, height: 1008 },
};

export const HERO_PHOTO: Photo = {
  src: "/field/chamonix-trail.jpg",
  width: 1792,
  height: 1008,
};

export const METHOD_PHOTO: Photo = {
  src: "/field/engine.jpg",
  width: 1792,
  height: 1008,
};

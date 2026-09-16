// Extensions on the relative imports so `node --test` can resolve this module
// too: `--experimental-strip-types` does no extension guessing, and the alias
// `@/` does not exist outside the bundler. Type-only imports are erased, so
// they are left alone.
import type { Locale } from "@/lib/locale";
import type { Copy } from "./types";
import { en } from "./en.ts";
import { fi } from "./fi.ts";
import { fr } from "./fr.ts";
import { de } from "./de.ts";

export const copies: Record<Locale, Copy> = { en, fi, fr, de };

export function getCopy(locale: Locale): Copy {
  return copies[locale];
}

export const SOURCES = [
  {
    authors: "Seiler S",
    year: "2010",
    title:
      "What is Best Practice for Training Intensity and Duration Distribution in Endurance Athletes",
    journal: "International Journal of Sports Physiology and Performance.",
    doi: "10.1123/ijspp.5.3.276",
    href: "https://doi.org/10.1123/ijspp.5.3.276",
    key: true,
  },
  {
    authors: "Seiler S, Kjerland GØ",
    year: "2006",
    title: "Quantifying training intensity distribution in elite endurance athletes",
    journal: "Scandinavian Journal of Medicine & Science in Sports.",
    doi: "10.1111/j.1600-0838.2004.00418.x",
    href: "https://doi.org/10.1111/j.1600-0838.2004.00418.x",
  },
  {
    authors: "Esteve-Lanao J, Foster C, Seiler S, Lucia A",
    year: "2007",
    title: "Impact of training intensity distribution on performance in endurance athletes",
    journal: "Journal of Strength and Conditioning Research.",
    doi: "10.1519/00124278-200708000-00048",
    href: "https://doi.org/10.1519/00124278-200708000-00048",
  },
  {
    authors: "Stöggl T, Sperlich B",
    year: "2014",
    title:
      "Polarized training has greater impact on key endurance variables than threshold, high intensity, or high volume training",
    journal: "Frontiers in Physiology.",
    doi: "10.3389/fphys.2014.00033",
    href: "https://doi.org/10.3389/fphys.2014.00033",
  },
  {
    authors: "Mujika I, Padilla S",
    year: "2003",
    title: "Scientific Bases for Precompetition Tapering Strategies",
    journal: "Medicine & Science in Sports & Exercise.",
    doi: "10.1249/01.mss.0000074448.73931.11",
    href: "https://doi.org/10.1249/01.mss.0000074448.73931.11",
    key: true,
  },
  {
    authors: "Foster C, Florhaug JA, Franklin J, et al.",
    year: "2001",
    title: "A New Approach to Monitoring Exercise Training",
    journal: "Journal of Strength and Conditioning Research.",
    doi: "10.1519/1533-4287(2001)015<0109:ANATME>2.0.CO;2",
    href: "https://doi.org/10.1519/1533-4287(2001)015%3C0109:ANATME%3E2.0.CO;2",
    key: true,
  },
  {
    authors: "Bourdon PC, Cardinale M, Murray A, et al.",
    year: "2017",
    title: "Monitoring Athlete Training Loads: Consensus Statement",
    journal: "International Journal of Sports Physiology and Performance.",
    doi: "10.1123/IJSPP.2017-0208",
    href: "https://doi.org/10.1123/IJSPP.2017-0208",
    key: true,
  },
  {
    authors: "McCammon I",
    year: "2004",
    title: "Heuristic Traps in Recreational Avalanche Accidents: Evidence and Implications",
    journal: "Proceedings of the International Snow Science Workshop.",
    href: "https://arc.lib.montana.edu/snow-science/objects/issw-2004-244-251.pdf",
  },
] as const;

/** The homepage cites only sources that map to a mechanism you can see in the product. */
export const KEY_SOURCES = SOURCES.filter((source) => "key" in source && source.key);

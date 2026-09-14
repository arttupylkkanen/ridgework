const SITE = "https://ridgework.org";
const OG_IMAGE = `${SITE}/og.jpg`;

const OG_LOCALE: Record<string, string> = {
  en: "en_GB",
  fi: "fi_FI",
  fr: "fr_FR",
  de: "de_DE",
};

export function siteMeta(opts: {
  title: string;
  description: string;
  path?: string;
  locale?: string;
}) {
  const path = opts.path ?? "/";
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const locale = OG_LOCALE[opts.locale ?? "en"] ?? "en_GB";
  return [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: locale },
    { property: "og:site_name", content: "Ridgework" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

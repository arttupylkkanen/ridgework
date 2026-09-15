export type AppSearch = {
  program?: string;
  checkout_id?: string;
  qa?: string;
};

// The router's default search parser JSON-parses each raw value, so `?qa=1`
// or `?qa=true` arrives here as a number/boolean, not a string. Coercing them
// back to a string keeps the parsed value's re-serialized URL identical to
// the incoming one — otherwise the router's canonical-URL check sees a
// mismatch (`qa` silently dropped to `undefined`) and redirects it away.
function toStringValue(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return undefined;
}

export function parseAppSearch(search: Record<string, unknown>): AppSearch {
  return {
    program: toStringValue(search.program),
    checkout_id: toStringValue(search.checkout_id),
    qa: toStringValue(search.qa),
  };
}

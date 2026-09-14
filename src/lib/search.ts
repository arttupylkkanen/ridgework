export type AppSearch = {
  program?: string;
  checkout_id?: string;
  qa?: string;
};

export function parseAppSearch(search: Record<string, unknown>): AppSearch {
  return {
    program: typeof search.program === "string" ? search.program : undefined,
    checkout_id: typeof search.checkout_id === "string" ? search.checkout_id : undefined,
    qa: typeof search.qa === "string" ? search.qa : undefined,
  };
}

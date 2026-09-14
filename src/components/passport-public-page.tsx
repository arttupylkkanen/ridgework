import { useEffect, useState } from "react";
import type { Copy } from "@/content/types";
import type { Locale } from "@/lib/locale";
import { loadSharedPassport } from "@/lib/passport-server";
import type { SharedPassport } from "@/lib/passport";
import { PassportReport } from "./passport-report";
import { SiteShell } from "./site-shell";

export function PassportPublicPage({
  locale,
  copy,
  token,
}: {
  locale: Locale;
  copy: Copy;
  token: string;
}) {
  const [shared, setShared] = useState<SharedPassport | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    void loadSharedPassport({ data: { token } })
      .then((row) => {
        if (!cancelled) setShared(row);
      })
      .catch(() => {
        if (!cancelled) setShared(null);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <SiteShell locale={locale} copy={copy} page="passport">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {shared === undefined ? (
          <p className="text-ink-muted">{copy.tools.passport.kicker}</p>
        ) : shared === null ? (
          <p className="max-w-xl text-sm leading-relaxed text-ink-muted">{copy.tools.passport.missing}</p>
        ) : (
          <>
            <div className="mb-6 flex justify-end no-print">
              <button
                type="button"
                onClick={() => window.print()}
                className="min-h-11 rounded-lg border border-line bg-card px-4 text-sm text-ink hover:bg-paper-warm"
              >
                {copy.tools.passport.print}
              </button>
            </div>
            <PassportReport copy={copy} shared={shared} />
          </>
        )}
      </div>
    </SiteShell>
  );
}

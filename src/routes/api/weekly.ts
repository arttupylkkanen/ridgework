import { createFileRoute } from "@tanstack/react-router";
import { sendWeeklyNotes } from "@/lib/notify/weekly-server";

/**
 * The weekly note's trigger, called by a scheduler and by nobody else.
 *
 * Guarded by a shared secret rather than left open: this endpoint sends mail
 * to every enrolled athlete, so an unguarded URL is a way to make Ridgework
 * spam its own users. With no secret configured it refuses outright — a
 * mailer that silently runs open would be worse than one that does not run.
 *
 * Vercel Cron sends `Authorization: Bearer $CRON_SECRET`; the same value in
 * `WEEKLY_CRON_SECRET` lets it be called by hand while testing.
 */
function expected(): string | null {
  const raw = process.env.WEEKLY_CRON_SECRET ?? process.env.CRON_SECRET;
  const secret = raw?.trim();
  return secret ? secret : null;
}

/** Constant-time compare, so the endpoint cannot be probed one byte at a time. */
function matches(given: string, want: string): boolean {
  if (given.length !== want.length) return false;
  let diff = 0;
  for (let i = 0; i < given.length; i += 1) diff |= given.charCodeAt(i) ^ want.charCodeAt(i);
  return diff === 0;
}

async function run(request: Request): Promise<Response> {
  const want = expected();
  if (!want) return new Response("cron secret missing", { status: 503 });

  const header = request.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!matches(given, want)) return new Response("forbidden", { status: 403 });

  const report = await sendWeeklyNotes();
  return new Response(JSON.stringify(report), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export const Route = createFileRoute("/api/weekly")({
  server: {
    // Vercel Cron issues a GET; POST is here so it can be driven by hand
    // without pretending a send is a safe, repeatable read.
    handlers: { GET: ({ request }) => run(request), POST: ({ request }) => run(request) },
  },
});

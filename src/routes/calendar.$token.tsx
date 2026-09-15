import { createFileRoute } from "@tanstack/react-router";
import { feedForToken } from "@/lib/calendar/feed-server";

/**
 * Public by capability: the token is the credential, so it is long, random and
 * rotatable. No session cookie, because calendar clients do not send one.
 *
 * The segment carries a cosmetic `.ics` so the URL looks like a calendar file
 * to people and to clients that sniff the extension; it is stripped here.
 */
export const Route = createFileRoute("/calendar/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const token = params.token.replace(/\.ics$/i, "");
        const body = await feedForToken(token);
        if (body === null) {
          return new Response("Not found", { status: 404 });
        }
        return new Response(body, {
          headers: {
            "content-type": "text/calendar; charset=utf-8",
            "cache-control": "private, max-age=900",
            "content-disposition": 'inline; filename="ridgework.ics"',
          },
        });
      },
    },
  },
});

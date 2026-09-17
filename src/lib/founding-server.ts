/**
 * The founding cohort, read and written server-side.
 *
 * Named `-server.ts`, not `.server.ts`, for the same reason as
 * `owner/metrics-server.ts`: the import-protection plugin mocks `.server.ts`
 * modules in the client bundle, and a mocked server function returns a truthy
 * object — so the desk would believe in a membership that was never recorded.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

export type FoundingMember = {
  name: string;
  email: string;
  /** ISO timestamp of the athlete's first visit to the desk. */
  startedAt: string;
};

type Row = { name: string | null; email: string; started_at: string };

function toMember(row: Row | undefined): FoundingMember | null {
  if (!row) return null;
  return { name: row.name ?? "", email: row.email, startedAt: row.started_at };
}

/**
 * Record the caller as a founding member, or return the record they already
 * have. Idempotent, and deliberately so: the desk calls this on every visit,
 * and `started_at` must keep saying when they first arrived rather than when
 * they last opened a browser.
 *
 * The name can be corrected later — people fix their own spelling — but the
 * date cannot.
 */
export const joinFounding = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ name: z.string().max(120).optional() }))
  .handler(async ({ context, data }): Promise<FoundingMember | null> => {
    const sql = await getSql();
    const name = (data.name ?? "").trim().slice(0, 120);

    // The address comes from the database, never from the client: the whole
    // value of this table is that it is a list of real, verified addresses.
    const users = await sql<{ email: string | null }>`
      select email from "user" where id = ${context.userId} limit 1
    `;
    const email = (users[0]?.email ?? "").trim();
    if (!email) return null;

    const rows = await sql<Row>`
      insert into founding_members (user_id, email, name)
      values (${context.userId}, ${email}, ${name})
      on conflict (user_id) do update
        set email = excluded.email,
            name = case when excluded.name <> '' then excluded.name else founding_members.name end
      returning name, email, started_at::text as started_at
    `;
    return toMember(rows[0]);
  });

export const getFoundingMember = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<FoundingMember | null> => {
    const sql = await getSql();
    const rows = await sql<Row>`
      select name, email, started_at::text as started_at
        from founding_members where user_id = ${context.userId} limit 1
    `;
    return toMember(rows[0]);
  });

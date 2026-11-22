This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Daily Supabase Health Check (Vercel Cron)

This project includes an automated daily Supabase health check triggered by Vercel Cron Jobs:

- **Endpoint:** `GET /api/cron/health` ([`src/app/api/cron/health/route.ts`](src/app/api/cron/health/route.ts))
- **Schedule:** `0 8 * * *` (once daily at 08:00 UTC) configured in [`vercel.json`](vercel.json)
- **Database Check:** Uses the existing server-side Supabase client (`src/lib/supabase/server.ts`) to run a lightweight, read-only `SELECT id FROM contact_submissions LIMIT 1` query. No dummy records are inserted and no production data is modified.
- **RLS Compatibility:** Because `public.contact_submissions` intentionally revokes `SELECT` from `anon`/`authenticated` roles while permitting `INSERT`, PostgreSQL returning SQLSTATE `42501` confirms the database is live, reachable, and enforcing RLS without exposing any contact data or requiring a service-role key.

> **Important Note on Supabase Free Plan Pausing:**
> Running a daily health check generates regular database activity, which helps keep the project active, but **it does not guarantee that Supabase will never pause a Free project**. Supabase may still pause Free-tier projects due to platform policies, maintenance, or inactivity detection changes. For guaranteed always-on availability, upgrade to Supabase Pro.

### Vercel Hobby Plan Compatibility

- **Frequency:** `0 8 * * *` runs once per day, meeting the Vercel Hobby limit (maximum once per day per cron job).
- **Execution Window:** On the Hobby plan, Vercel runs daily cron jobs within a ±59-minute window of the scheduled hour (e.g., between `08:00` and `08:59 UTC`).
- **Environment:** Vercel Cron Jobs only run on **Production** deployments (not Preview deployments).

### Deployment Setup (Vercel)

1. Generate a strong random secret (at least 32 characters):
   ```bash
   openssl rand -hex 32
   ```
2. In your Vercel project dashboard, go to **Settings → Environment Variables** and add:
   - **Key:** `CRON_SECRET`
   - **Value:** `<your-generated-secret>`
   - **Environment:** **Production** (and optionally Development if using `vercel env pull`)
   - *Never prefix `CRON_SECRET` with `NEXT_PUBLIC_` and never commit it to Git.*
3. Deploy to **Production**. Vercel automatically registers `/api/cron/health` from `vercel.json` and sends `Authorization: Bearer <CRON_SECRET>` with each scheduled invocation.
4. Verify the cron job appears under **Settings → Cron Jobs** in the Vercel dashboard and check **Logs** for structured `supabase_health_check` JSON entries.

### Testing Instructions

#### Local Testing

1. Start the local server with a temporary `CRON_SECRET`:
   ```bash
   CRON_SECRET="local-test-secret" npm run start
   ```
2. Confirm unauthenticated requests are rejected (`401 Unauthorized`):
   ```bash
   curl -i http://localhost:3000/api/cron/health
   ```
3. Confirm invalid bearer tokens are rejected (`401 Unauthorized`):
   ```bash
   curl -i -H "Authorization: Bearer wrong-secret" http://localhost:3000/api/cron/health
   ```
4. Confirm authorized requests succeed (`200 OK`) and return connection status + response time:
   ```bash
   curl -i -H "Authorization: Bearer local-test-secret" http://localhost:3000/api/cron/health
   ```

#### Production Testing (After Deploying)

Replace `<YOUR_CRON_SECRET>` with the `CRON_SECRET` configured in Vercel:

```bash
# Should return 401 Unauthorized
curl -i https://upendra-portfolio-blond.vercel.app/api/cron/health

# Should return 200 OK with database status and responseTimeMs
curl -i -H "Authorization: Bearer <YOUR_CRON_SECRET>" https://upendra-portfolio-blond.vercel.app/api/cron/health
```


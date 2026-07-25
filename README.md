# Add Hotel — live interview wizard

A real, working version of the `Add Hotel - Interview Flow` design. Anyone with the link
fills out the 5-step wizard; each submission is saved to disk automatically — no login,
no database to set up.

## What gets saved, and where

Every time someone finishes the wizard, the server writes two things under `DATA_DIR`
(defaults to `./data`):

- **`data/submissions.csv`** — one growing spreadsheet, one row per hotel. Open it in
  Excel/Sheets, or hand it to another tool/script.
- **`data/submissions/<hotel-name>--<timestamp>--<id>.json`** — a separate file per
  submission with the full, unflattened answers (nested arrays, everything). Good for
  feeding into other automation.

Nothing is ever overwritten — each client's answers land as new rows/files.

## Run it locally

```
npm install
npm start
```

Open http://localhost:3000. Submissions land in `./data`.

## Get a real shareable URL

You need a host with a **persistent disk/volume** — the submitted files must survive
restarts and redeploys. Plain "serverless" hosting (e.g. Vercel functions) will silently
lose every submission, so avoid that. Two good free-tier options:

### Option A — Railway (simplest)

1. Push this `app/` folder to a GitHub repo (or connect the repo directly).
2. On [railway.app](https://railway.app): New Project → Deploy from GitHub repo.
3. Add a **Volume**, mount it at `/data`.
4. Set env var `DATA_DIR=/data`.
5. (Optional but recommended) set `ADMIN_TOKEN` to a long random string — see below.
6. Deploy. Railway gives you a public `*.up.railway.app` URL — that's the link you share.

### Option B — Fly.io

```
fly launch          # accept defaults, don't deploy yet
fly volumes create data --size 1
```

In the generated `fly.toml`, add:

```toml
[mounts]
  source = "data"
  destination = "/data"

[env]
  DATA_DIR = "/data"
```

Then `fly deploy`. Fly gives you a `https://<app>.fly.dev` URL to share.

### Option C — your own VPS

`git clone` the repo, `npm install`, run with a process manager (`pm2 start server.js`
or a systemd unit), put it behind Caddy/nginx for HTTPS. `DATA_DIR` can just point at a
normal directory on disk — no special volume needed since the disk is already persistent.

A `Dockerfile` is included if your host prefers a container (Railway/Fly/Render all
accept it directly).

## Downloading the data remotely

The form itself is intentionally open — anyone with the link can fill it out, no
password. But the **saved answers should not be public**, so the CSV/JSON aren't served
by default. Set the `ADMIN_TOKEN` env var to a long random string to enable:

- `GET /admin/export.csv?token=YOUR_TOKEN` — downloads the master CSV.
- `GET /admin/submissions?token=YOUR_TOKEN` — lists the individual JSON filenames.

Without `ADMIN_TOKEN` set, those routes are disabled (404) and the only way to get the
files is direct filesystem/volume access on your host.

## Notes on what changed vs. the original design file

The original `.dc.html` was a Claude Design prototype (React + a custom template
runtime loaded via `support.js`) — meant for mocking up the look, not for running for
real users. This is a from-scratch static frontend (`public/`) + a small Express
backend (`server.js`), styled to match the original pixel-for-pixel, plus:

- The form now starts **blank** with placeholder examples, instead of pre-filled with
  the "Pelican Post Inn" demo data — so each client sees their own empty form.
  The hotel name typed on step 1 now flows live into the preview panel and the
  completion screen (the original hardcoded "Pelican Post Inn & Cottages" everywhere).
- Step 1 requires a hotel name before continuing (a submission needs at least that much
  to be useful as a saved record).
- The "watch radius" chips were renamed from Florida-Keys-specific place names to
  generic distance options, matching the amenities list's earlier generalization to
  work for any hotel.
- Submitting on the last step now actually saves the data (POST `/api/submit`) instead
  of just animating to a static completion screen.

const path = require("path");
const crypto = require("crypto");
const express = require("express");
const { saveSubmission, MASTER_CSV_PATH, SUBMISSIONS_DIR } = require("./lib/storage");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

function arr(x) {
  return Array.isArray(x) ? x.filter((v) => typeof v === "string").slice(0, 200) : [];
}
function str(x) {
  return typeof x === "string" ? x.slice(0, 5000) : "";
}
function num(x) {
  const n = Number(x);
  return Number.isFinite(n) ? Math.max(0, Math.min(4, Math.round(n))) : 2;
}

app.post("/api/submit", (req, res) => {
  const b = req.body || {};
  const basics = b.basics || {};
  const voice = b.voice || {};
  const audience = b.audience || {};
  const monitoring = b.monitoring || {};
  const dims = voice.dimensions || {};

  if (!str(basics.hotelName).trim()) {
    return res.status(400).json({ error: "hotel_name_required" });
  }

  const submission = {
    basics: {
      hotelName: str(basics.hotelName),
      location: str(basics.location),
      propertyType: str(basics.propertyType),
      address: str(basics.address),
      rooms: str(basics.rooms),
      website: str(basics.website),
    },
    offers: { selected: arr(b.offers && b.offers.selected), custom: arr(b.offers && b.offers.custom) },
    voice: {
      archetype: str(voice.archetype),
      tones: arr(voice.tones),
      dimensions: {
        formal: num(dims.formal),
        serious: num(dims.serious),
        reserved: num(dims.reserved),
        factual: num(dims.factual),
      },
      feelings: arr(voice.feelings),
      differentiator: str(voice.differentiator),
      love: arr(voice.love),
      banned: arr(voice.banned),
      tagline: str(voice.tagline),
      voiceStatement: str(voice.voiceStatement),
    },
    audience: {
      guests: arr(audience.guests),
      guestsCustom: arr(audience.guestsCustom),
      ages: arr(audience.ages),
      origins: arr(audience.origins),
      originsCustom: arr(audience.originsCustom),
      interests: arr(audience.interests),
      interestsCustom: arr(audience.interestsCustom),
      trip: arr(audience.trip),
    },
    monitoring: {
      radius: str(monitoring.radius),
      topics: arr(monitoring.topics),
      topicsCustom: arr(monitoring.topicsCustom),
    },
  };

  try {
    const result = saveSubmission(submission);
    res.json({ ok: true, id: result.id });
  } catch (err) {
    console.error("Failed to save submission", err);
    res.status(500).json({ error: "save_failed" });
  }
});

function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) {
    return res.status(404).send("Not found");
  }
  const supplied = req.query.token || req.get("x-admin-token") || "";
  const a = Buffer.from(String(supplied));
  const b = Buffer.from(ADMIN_TOKEN);
  const ok = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) return res.status(403).send("Forbidden");
  next();
}

app.get("/admin/export.csv", requireAdmin, (req, res) => {
  res.download(MASTER_CSV_PATH, "submissions.csv");
});

app.get("/admin/submissions", requireAdmin, (req, res) => {
  const fs = require("fs");
  fs.readdir(SUBMISSIONS_DIR, (err, files) => {
    if (err) return res.json({ files: [] });
    res.json({ files: files.filter((f) => f.endsWith(".json")).sort().reverse() });
  });
});

app.get("/healthz", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Add Hotel wizard running on http://localhost:${PORT}`);
  if (!ADMIN_TOKEN) {
    console.log("ADMIN_TOKEN not set — /admin export routes are disabled. Set ADMIN_TOKEN to enable them.");
  }
});

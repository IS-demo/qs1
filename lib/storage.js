const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { toCsvRow } = require("./csv");

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(__dirname, "..", "data");
const SUBMISSIONS_DIR = path.join(DATA_DIR, "submissions");
const MASTER_CSV_PATH = path.join(DATA_DIR, "submissions.csv");

const CSV_COLUMNS = [
  ["id", (s) => s.id],
  ["submitted_at", (s) => s.submittedAt],
  ["hotel_name", (s) => s.basics.hotelName],
  ["location", (s) => s.basics.location],
  ["property_type", (s) => s.basics.propertyType],
  ["address", (s) => s.basics.address],
  ["rooms", (s) => s.basics.rooms],
  ["website", (s) => s.basics.website],
  ["offers", (s) => join(s.offers.selected)],
  ["offers_added_by_client", (s) => join(s.offers.custom)],
  ["brand_archetype", (s) => s.voice.archetype],
  ["voice_attributes", (s) => join(s.voice.tones)],
  ["tone_formal_to_casual", (s) => s.voice.dimensions.formal],
  ["tone_serious_to_playful", (s) => s.voice.dimensions.serious],
  ["tone_reserved_to_bold", (s) => s.voice.dimensions.reserved],
  ["tone_factual_to_expressive", (s) => s.voice.dimensions.factual],
  ["guest_feelings", (s) => join(s.voice.feelings)],
  ["differentiator", (s) => s.voice.differentiator],
  ["words_we_love", (s) => join(s.voice.love)],
  ["words_never_say", (s) => join(s.voice.banned)],
  ["tagline", (s) => s.voice.tagline],
  ["voice_statement", (s) => s.voice.voiceStatement],
  ["ideal_guests", (s) => join(s.audience.guests)],
  ["ideal_guests_added_by_client", (s) => join(s.audience.guestsCustom)],
  ["age_ranges", (s) => join(s.audience.ages)],
  ["origins", (s) => join(s.audience.origins)],
  ["origins_added_by_client", (s) => join(s.audience.originsCustom)],
  ["interests", (s) => join(s.audience.interests)],
  ["interests_added_by_client", (s) => join(s.audience.interestsCustom)],
  ["typical_stay", (s) => join(s.audience.trip)],
  ["watch_radius", (s) => s.monitoring.radius],
  ["watch_topics", (s) => join(s.monitoring.topics)],
  ["watch_topics_added_by_client", (s) => join(s.monitoring.topicsCustom)],
];

function join(arr) {
  return Array.isArray(arr) ? arr.join("; ") : "";
}

function ensureDirs() {
  fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
}

function slugify(name) {
  const base = (name || "hotel")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "hotel";
}

function saveSubmission(submission) {
  ensureDirs();

  const id = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const record = { id, submittedAt, ...submission };

  const slug = slugify(submission.basics && submission.basics.hotelName);
  const stamp = submittedAt.replace(/[:.]/g, "-");
  const jsonFilename = `${slug}--${stamp}--${id.slice(0, 8)}.json`;
  const jsonPath = path.join(SUBMISSIONS_DIR, jsonFilename);
  fs.writeFileSync(jsonPath, JSON.stringify(record, null, 2), "utf8");

  const isNewCsv = !fs.existsSync(MASTER_CSV_PATH);
  if (isNewCsv) {
    fs.writeFileSync(MASTER_CSV_PATH, toCsvRow(CSV_COLUMNS.map(([col]) => col)), "utf8");
  }
  const row = CSV_COLUMNS.map(([, get]) => get(record));
  fs.appendFileSync(MASTER_CSV_PATH, toCsvRow(row), "utf8");

  return { id, jsonFilename, jsonPath, csvPath: MASTER_CSV_PATH };
}

module.exports = { saveSubmission, DATA_DIR, SUBMISSIONS_DIR, MASTER_CSV_PATH };

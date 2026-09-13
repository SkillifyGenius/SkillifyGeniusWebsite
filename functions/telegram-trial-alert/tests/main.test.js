import assert from "node:assert/strict";
import test from "node:test";
import handler, { formatBdTime } from "../src/main.js";

const booking = {
  $id: "booking-123",
  $databaseId: "skillify_genius_db",
  $collectionId: "trial_bookings",
  parentName: "Parent Name",
  studentName: "Private Student",
  studentAge: 12,
  phone: "+123456789",
  email: "parent@example.com",
  courseSlug: "coding-creative-logic",
  preferredDate: "2026-10-01",
  preferredTime: "10:00 AM - 12:00 PM",
  timezone: "UTC",
  message: "Private notes",
};

const context = (body = booking, event = "databases.skillify_genius_db.collections.trial_bookings.documents.booking-123.create") => ({
  req: {
    headers: { "x-appwrite-trigger": "event", "x-appwrite-event": event },
    bodyJson: body,
  },
  res: { json: (value) => value },
  log: () => {},
  error: () => {},
});

test("sends a minimal Telegram group alert for a new trial booking with BD time", async (t) => {
  const previousFetch = globalThis.fetch;
  const previousEnv = {
    TRIAL_DATABASE_ID: process.env.TRIAL_DATABASE_ID,
    TRIAL_COLLECTION_ID: process.env.TRIAL_COLLECTION_ID,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  };
  t.after(() => {
    globalThis.fetch = previousFetch;
    for (const [key, value] of Object.entries(previousEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  process.env.TRIAL_DATABASE_ID = "skillify_genius_db";
  process.env.TRIAL_COLLECTION_ID = "trial_bookings";
  process.env.TELEGRAM_BOT_TOKEN = "test-token";
  process.env.TELEGRAM_CHAT_ID = "-1001234567890";
  let sent;
  globalThis.fetch = async (url, options) => {
    sent = { url, ...JSON.parse(options.body) };
    return { ok: true, json: async () => ({ ok: true }) };
  };

  assert.deepEqual(await handler(context()), { sent: true });
  assert.equal(sent.url, "https://api.telegram.org/bottest-token/sendMessage");
  assert.equal(sent.chat_id, "-1001234567890");
  assert.match(sent.text, /Parent Name/);
  assert.match(sent.text, /booking-123/);
  assert.match(sent.text, /BD Time: 4:00 PM - 6:00 PM BD/);
  assert.doesNotMatch(sent.text, /Private Student|Private notes/);
});

test("formatBdTime converts UTC time to Bangladesh Time (+6)", () => {
  assert.equal(formatBdTime("2026-09-20", "10:00 AM - 12:00 PM", "UTC"), "4:00 PM - 6:00 PM BD");
});

test("formatBdTime extracts existing BD label from slot string", () => {
  assert.equal(
    formatBdTime("2026-09-20", "Morning: 9:00 AM - 11:00 AM (7:00 PM - 9:00 PM BD)", "America/New_York"),
    "7:00 PM - 9:00 PM BD"
  );
});

test("ignores unrelated collection events", async () => {
  assert.deepEqual(await handler(context({ ...booking, $collectionId: "leads" })), { skipped: true });
});

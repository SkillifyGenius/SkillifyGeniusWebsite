const line = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

export function formatBdTime(dateStr, timeStr, timeZone) {
  if (!timeStr) return "";

  // 1. If timeStr already has an explicit BD label like '(7:00 PM - 9:00 PM BD)', extract that directly
  const bdParenthesis = timeStr.match(/\(([^)]*BD[^)]*)\)/i);
  if (bdParenthesis) {
    return bdParenthesis[1].trim();
  }

  // 2. Parse times from the time string (e.g. "10:00 AM - 12:00 PM" or "9:00 AM")
  const regex = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi;
  const matches = [...timeStr.matchAll(regex)];
  if (matches.length === 0) return "";

  const date = dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? dateStr
    : new Date().toISOString().slice(0, 10);

  const tz = timeZone || "UTC";

  try {
    const convertedTimes = matches.map((m) => {
      let hour = parseInt(m[1], 10);
      const min = parseInt(m[2] || "0", 10);
      const ampm = m[3].toUpperCase();

      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;

      const isoLocal = `${date}T${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}:00`;
      const asUtc = new Date(isoLocal + "Z");

      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).formatToParts(asUtc);

      const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
      const tzDate = new Date(`${p.year}-${p.month}-${p.day}T${p.hour === "24" ? "00" : p.hour}:${p.minute}:${p.second}Z`);
      const offsetMs = asUtc.getTime() - tzDate.getTime();
      const realInstant = new Date(asUtc.getTime() + offsetMs);

      const bdTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(realInstant);

      const bdDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(realInstant);

      return { time: bdTime, date: bdDate };
    });

    if (convertedTimes.length === 1) {
      const single = convertedTimes[0];
      const dateNote = single.date !== date ? ` (${single.date})` : "";
      return `${single.time} BD${dateNote}`;
    }

    if (convertedTimes.length === 2) {
      const [start, end] = convertedTimes;
      const dateNote = start.date !== date ? ` (${start.date})` : "";
      return `${start.time} - ${end.time} BD${dateNote}`;
    }
  } catch {
    // Ignore conversion error and fallback
  }

  return "";
}

export default async ({ req, res, log, error }) => {
  const event = req.headers?.["x-appwrite-event"] ?? "";
  const trigger = req.headers?.["x-appwrite-trigger"] ?? "";
  const booking = req.bodyJson ?? JSON.parse(req.bodyText || "{}");

  if (trigger !== "event" || !event.endsWith(".create")) {
    return res.json({ skipped: true });
  }

  if (
    booking.$databaseId !== process.env.TRIAL_DATABASE_ID ||
    booking.$collectionId !== process.env.TRIAL_COLLECTION_ID
  ) {
    return res.json({ skipped: true });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Telegram Function variables are missing");
  }

  const bdTime = formatBdTime(booking.preferredDate, booking.preferredTime, booking.timezone);

  const message = [
    "New trial assessment request",
    `Booking ID: ${line(booking.$id || booking.id)}`,
    `Parent: ${line(booking.parentName)}`,
    `Phone: ${line(booking.phone)}`,
    `Email: ${line(booking.email)}`,
    `Course: ${line(booking.courseSlug)}`,
    `Preferred date: ${line(booking.preferredDate)}`,
    ...(bdTime ? [`BD Time: ${bdTime}`] : []),
    `Preferred time: ${line(booking.preferredTime)}`,
    `Timezone: ${line(booking.timezone)}`,
  ].join("\n");

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) {
      throw new Error("Telegram rejected the message");
    }
  } catch {
    error(`Telegram delivery failed for booking ${line(booking.$id || booking.id)}`);
    throw new Error("Telegram delivery failed");
  }

  log(`Telegram alert sent for booking ${line(booking.$id || booking.id)}`);
  return res.json({ sent: true });
};

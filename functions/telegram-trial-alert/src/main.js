const line = (value) => String(value ?? "").replace(/\s+/g, " ").trim();

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

  const message = [
    "New trial assessment request",
    `Booking ID: ${line(booking.$id || booking.id)}`,
    `Parent: ${line(booking.parentName)}`,
    `Phone: ${line(booking.phone)}`,
    `Email: ${line(booking.email)}`,
    `Course: ${line(booking.courseSlug)}`,
    `Preferred date: ${line(booking.preferredDate)}`,
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

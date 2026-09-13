export interface TimeZoneEntry {
  iana: string;
  city: string;
  label: string;
  region: "Americas" | "Europe & UK" | "Middle East & South Asia" | "Asia-Pacific & Oceania";
}

export const TIMEZONE_LIST: TimeZoneEntry[] = [
  // Americas
  { iana: "Pacific/Honolulu", city: "Honolulu", label: "Hawaii Standard Time (HST)", region: "Americas" },
  { iana: "America/Anchorage", city: "Anchorage", label: "Alaska Time (AKDT/AKST)", region: "Americas" },
  { iana: "America/Los_Angeles", city: "Los Angeles", label: "Pacific Time - Los Angeles, Vancouver, Seattle", region: "Americas" },
  { iana: "America/Phoenix", city: "Phoenix", label: "Mountain Standard Time - Arizona (No DST)", region: "Americas" },
  { iana: "America/Denver", city: "Denver", label: "Mountain Time - Denver, Calgary, Salt Lake City", region: "Americas" },
  { iana: "America/Chicago", city: "Chicago", label: "Central Time - Chicago, Dallas, Houston, Mexico City", region: "Americas" },
  { iana: "America/New_York", city: "New York", label: "Eastern Time - New York, Toronto, Miami, Boston", region: "Americas" },
  { iana: "America/Halifax", city: "Halifax", label: "Atlantic Time - Halifax", region: "Americas" },
  { iana: "America/Sao_Paulo", city: "São Paulo", label: "Brasília Time - São Paulo, Rio de Janeiro", region: "Americas" },
  { iana: "America/Buenos_Aires", city: "Buenos Aires", label: "Argentina Time - Buenos Aires", region: "Americas" },

  // Europe & UK
  { iana: "Europe/London", city: "London", label: "UK & Ireland - London, Dublin, Edinburgh", region: "Europe & UK" },
  { iana: "Europe/Paris", city: "Paris", label: "Western Europe - Paris, Brussels, Amsterdam", region: "Europe & UK" },
  { iana: "Europe/Berlin", city: "Berlin", label: "Central Europe - Berlin, Frankfurt, Zurich, Vienna", region: "Europe & UK" },
  { iana: "Europe/Rome", city: "Rome", label: "Southern Europe - Rome, Madrid", region: "Europe & UK" },
  { iana: "Europe/Stockholm", city: "Stockholm", label: "Northern Europe - Stockholm, Oslo, Copenhagen", region: "Europe & UK" },
  { iana: "Europe/Athens", city: "Athens", label: "Eastern Europe - Athens, Helsinki, Bucharest", region: "Europe & UK" },

  // Middle East & South Asia
  { iana: "Asia/Jerusalem", city: "Jerusalem", label: "Israel Standard Time - Tel Aviv, Jerusalem", region: "Middle East & South Asia" },
  { iana: "Asia/Riyadh", city: "Riyadh", label: "Arabia Standard Time - Riyadh, Jeddah, Doha, Kuwait", region: "Middle East & South Asia" },
  { iana: "Asia/Dubai", city: "Dubai", label: "Gulf Standard Time - Dubai, Abu Dhabi, Muscat", region: "Middle East & South Asia" },
  { iana: "Asia/Karachi", city: "Karachi", label: "Pakistan Standard Time - Karachi, Islamabad", region: "Middle East & South Asia" },
  { iana: "Asia/Kolkata", city: "New Delhi", label: "India Standard Time - Mumbai, New Delhi, Bengaluru", region: "Middle East & South Asia" },
  { iana: "Asia/Dhaka", city: "Dhaka", label: "Bangladesh Standard Time - Dhaka", region: "Middle East & South Asia" },
  { iana: "Asia/Kathmandu", city: "Kathmandu", label: "Nepal Time - Kathmandu", region: "Middle East & South Asia" },

  // Asia-Pacific & Oceania
  { iana: "Asia/Bangkok", city: "Bangkok", label: "Indochina Time - Bangkok, Hanoi, Jakarta", region: "Asia-Pacific & Oceania" },
  { iana: "Asia/Singapore", city: "Singapore", label: "Singapore Standard Time - Singapore", region: "Asia-Pacific & Oceania" },
  { iana: "Asia/Hong_Kong", city: "Hong Kong", label: "Hong Kong Time - Hong Kong", region: "Asia-Pacific & Oceania" },
  { iana: "Asia/Shanghai", city: "Shanghai", label: "China Standard Time - Beijing, Shanghai", region: "Asia-Pacific & Oceania" },
  { iana: "Asia/Taipei", city: "Taipei", label: "Taipei Standard Time - Taipei", region: "Asia-Pacific & Oceania" },
  { iana: "Asia/Tokyo", city: "Tokyo", label: "Japan Standard Time - Tokyo, Osaka", region: "Asia-Pacific & Oceania" },
  { iana: "Asia/Seoul", city: "Seoul", label: "Korea Standard Time - Seoul", region: "Asia-Pacific & Oceania" },
  { iana: "Australia/Perth", city: "Perth", label: "Western Australia - Perth", region: "Asia-Pacific & Oceania" },
  { iana: "Australia/Adelaide", city: "Adelaide", label: "Central Australia - Adelaide, Darwin", region: "Asia-Pacific & Oceania" },
  { iana: "Australia/Sydney", city: "Sydney", label: "Eastern Australia - Sydney, Canberra", region: "Asia-Pacific & Oceania" },
  { iana: "Australia/Melbourne", city: "Melbourne", label: "Eastern Australia - Melbourne", region: "Asia-Pacific & Oceania" },
  { iana: "Australia/Brisbane", city: "Brisbane", label: "Queensland - Brisbane (No DST)", region: "Asia-Pacific & Oceania" },
  { iana: "Pacific/Auckland", city: "Auckland", label: "New Zealand - Auckland, Wellington", region: "Asia-Pacific & Oceania" },
];

/**
 * Returns current GMT offset string for any valid IANA timezone (e.g. "GMT-4", "GMT+9", "GMT+5:30").
 */
export function getGmtOffsetString(ianaTimezone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: ianaTimezone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(new Date());
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    return tzPart?.value || "GMT";
  } catch {
    return "GMT";
  }
}

/**
 * Generates a human-friendly label for a timezone option, e.g.:
 * "[GMT-4] New York - Eastern Time (US & Canada)"
 */
export function formatTimezoneOption(entry: TimeZoneEntry): string {
  const gmt = getGmtOffsetString(entry.iana);
  return `[${gmt}] ${entry.label}`;
}

/**
 * Returns a concise, elegant display string for the active timezone, e.g.:
 * "New York (GMT-4)" or "Tokyo (GMT+9)"
 */
export function getActiveTimezoneSummary(ianaTimezone: string): string {
  const found = TIMEZONE_LIST.find((t) => t.iana === ianaTimezone);
  const gmt = getGmtOffsetString(ianaTimezone);

  if (found) {
    return `${found.city} (${gmt})`;
  }

  // Fallback if user's local timezone is not in our predefined list
  const cityFromIana = ianaTimezone.split("/").pop()?.replace(/_/g, " ") || ianaTimezone;
  return `${cityFromIana} (${gmt})`;
}

/**
 * Educator Base Availability Slots defined in Bangladesh Time (BD Time = UTC+6):
 * - Morning block: 6:00 AM - 8:00 AM BD (split into two 1-hour windows)
 * - Evening block: 7:00 PM - 11:00 PM BD (split into two 2-hour windows)
 */
export interface BdSlotDefinition {
  id: string;
  name: string;
  bdLabel: string;
  startUtcHour: number;
  startUtcMin: number;
  endUtcHour: number;
  endUtcMin: number;
}

export const BD_TRIAL_SLOTS: BdSlotDefinition[] = [
  {
    id: "slot-1",
    name: "Slot 1 (Early Morning BD)",
    bdLabel: "6:00 AM - 7:00 AM BD",
    startUtcHour: 0,
    startUtcMin: 0,
    endUtcHour: 1,
    endUtcMin: 0,
  },
  {
    id: "slot-2",
    name: "Slot 2 (Morning BD)",
    bdLabel: "7:00 AM - 8:00 AM BD",
    startUtcHour: 1,
    startUtcMin: 0,
    endUtcHour: 2,
    endUtcMin: 0,
  },
  {
    id: "slot-3",
    name: "Slot 3 (Evening BD)",
    bdLabel: "7:00 PM - 9:00 PM BD",
    startUtcHour: 13,
    startUtcMin: 0,
    endUtcHour: 15,
    endUtcMin: 0,
  },
  {
    id: "slot-4",
    name: "Slot 4 (Night BD)",
    bdLabel: "9:00 PM - 11:00 PM BD",
    startUtcHour: 15,
    startUtcMin: 0,
    endUtcHour: 17,
    endUtcMin: 0,
  },
];

export interface ConvertedSlot {
  id: string;
  name: string;
  period: "Morning" | "Afternoon" | "Evening" | "Night";
  localRange: string;
  bdLabel: string;
}

/**
 * Converts the 4 Bangladesh educator availability slots to the user's selected timezone dynamically.
 */
export function getConvertedSlots(ianaTimezone: string): ConvertedSlot[] {
  return BD_TRIAL_SLOTS.map((slot) => {
    try {
      const startD = new Date(Date.UTC(2026, 8, 5, slot.startUtcHour, slot.startUtcMin));
      const endD = new Date(Date.UTC(2026, 8, 5, slot.endUtcHour, slot.endUtcMin));

      const timeFmt = new Intl.DateTimeFormat("en-US", {
        timeZone: ianaTimezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const hourFmt = new Intl.DateTimeFormat("en-US", {
        timeZone: ianaTimezone,
        hour: "numeric",
        hourCycle: "h23",
      });

      const localStart = timeFmt.format(startD);
      const localEnd = timeFmt.format(endD);

      const hourPart = hourFmt.formatToParts(startD).find((p) => p.type === "hour");
      const hourVal = parseInt(hourPart?.value || "12", 10);

      let period: "Morning" | "Afternoon" | "Evening" | "Night" = "Evening";
      if (hourVal >= 5 && hourVal < 12) period = "Morning";
      else if (hourVal >= 12 && hourVal < 17) period = "Afternoon";
      else if (hourVal >= 17 && hourVal < 21) period = "Evening";
      else period = "Night";

      return {
        id: slot.id,
        name: slot.name,
        period,
        localRange: `${localStart} - ${localEnd}`,
        bdLabel: slot.bdLabel,
      };
    } catch {
      return {
        id: slot.id,
        name: slot.name,
        period: "Evening",
        localRange: slot.bdLabel,
        bdLabel: slot.bdLabel,
      };
    }
  });
}

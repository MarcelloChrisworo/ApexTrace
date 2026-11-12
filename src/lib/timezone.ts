export const INDONESIAN_TIMEZONES = {
  WIB: "Asia/Jakarta",
  WITA: "Asia/Makassar",
  WIT: "Asia/Jayapura",
} as const;

export type IndonesianTimezone =
  (typeof INDONESIAN_TIMEZONES)[keyof typeof INDONESIAN_TIMEZONES];
export type ScheduleTimezone = IndonesianTimezone | "track";

const timezoneLabels: Record<IndonesianTimezone, string> = {
  "Asia/Jakarta": "WIB",
  "Asia/Makassar": "WITA",
  "Asia/Jayapura": "WIT",
};

export function formatToIndonesianTime(
  utcDateString: string,
  timeZone: IndonesianTimezone = INDONESIAN_TIMEZONES.WIB,
): { dateStr: string; timeStr: string; tzLabel: string } {
  const date = new Date(utcDateString);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid UTC date: ${utcDateString}`);
  }

  const dateStr = new Intl.DateTimeFormat("id-ID", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const timeStr = new Intl.DateTimeFormat("id-ID", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return {
    dateStr,
    timeStr: `${timeStr} ${timezoneLabels[timeZone]}`,
    tzLabel: timezoneLabels[timeZone],
  };
}

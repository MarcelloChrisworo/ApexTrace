import type { ScheduleTimezone } from "@/lib/timezone";

export type SessionKind =
  | "practice"
  | "sprint-qualifying"
  | "sprint"
  | "qualifying"
  | "race";

export interface GrandPrixSession {
  kind: SessionKind;
  name: string;
  localizedName: string;
  startsAtUtc: string;
}

export interface GrandPrixWeekend {
  season: number;
  round: number;
  name: string;
  country: string;
  city: string;
  circuitName: string;
  circuitLengthKm?: number;
  totalLaps?: number;
  trackTimezone?: string;
  sessions: GrandPrixSession[];
}

export interface ScheduleQuery {
  season: number;
  timezone: ScheduleTimezone;
}

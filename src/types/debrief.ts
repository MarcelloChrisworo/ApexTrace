export interface DriverResult {
  position: number;
  code: string;
  name: string;
  team: string;
  lapsCompleted: number;
  points: number;
  positionChange: number;
}

export interface RaceDebrief {
  grandPrixName: string;
  date: string;
  podium: DriverResult[];
  fastestLap?: { driverCode: string; time: string; pointsAwarded: boolean };
  safetyCarCount: number;
  virtualSafetyCarCount: number;
}

function requiredUrl(name: string, fallback: string): string {
  const value = process.env[name] ?? fallback;

  try {
    new URL(value);
  } catch {
    throw new Error(`${name} must be a valid URL`);
  }

  return value.replace(/\/$/, "");
}

export const apiConfig = {
  openF1Url: requiredUrl("OPENF1_API_URL", "https://api.openf1.org/v1"),
  jolpicaUrl: requiredUrl(
    "JOLPICA_API_URL",
    "https://api.jolpi.ca/ergast/f1",
  ),
} as const;

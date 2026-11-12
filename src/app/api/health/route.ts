import { connection } from "next/server";

export async function GET() {
  await connection();

  return Response.json({
    service: "apextrace-backend",
    status: "ok",
    instance: process.env.INSTANCE_ID ?? "unknown",
  });
}

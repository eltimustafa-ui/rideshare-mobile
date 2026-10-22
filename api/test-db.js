
import { neon } from "@neondatabase/serverless";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.DATABASE_URL) {
    return response.status(500).json({
      success: false,
      message: "DATABASE_URL nuk është konfiguruar në Vercel."
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT 1 AS connected`;

    return response.status(200).json({
      success: true,
      message: "Lidhja me Neon funksionon!",
      database: result[0].connected
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    return response.status(500).json({
      success: false,
      message: "Lidhja me databazën dështoi. Kontrollo konfigurimin në Vercel."
    });
  }
}

// app/admin/api/submissions/route.ts
import { NextResponse } from "next/server";
import { getDb } from "@/lib/data/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Helper to run a SQL command
function dbRun(db: any, sql: string, params: unknown[]): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err: Error | null) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Helper to run a SQL query that returns all rows
function dbAll(db: any, sql: string): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error | null, rows: unknown[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// POST: insert a new submission
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const db = getDb(); //  only initialized at runtime

    const { name, email, occupation, message } = await request.json();

    if (!name || !email || !occupation || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await dbRun(
      db,
      `INSERT INTO submissions (name, email, occupation, message) VALUES (?, ?, ?, ?)`,
      [name, email, occupation, message]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Submissions POST error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

// GET: return all submissions
export async function GET(): Promise<NextResponse> {
  try {
    const db = getDb(); // only initialized at runtime

    const rows = await dbAll(
      db,
      "SELECT * FROM submissions ORDER BY created_at DESC"
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Submissions GET error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
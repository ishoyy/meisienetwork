import { NextResponse } from "next/server";
import { db } from "@/lib/data/db";

function dbRun(sql: string, params: unknown[]): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err: Error | null) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function dbAll(sql: string): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err: Error | null, rows: unknown[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { name, email, occupation, message } = await request.json();

    if (!name || !email || !occupation || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await dbRun(
      `INSERT INTO submissions (name, email, occupation, message) VALUES (?, ?, ?, ?)`,
      [name, email, occupation, message]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Submissions POST error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const rows = await dbAll("SELECT * FROM submissions ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Submissions GET error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
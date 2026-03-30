// db.js - Database connection and initialization
import sqlite3pkg from "sqlite3";
import path from "path";

const { Database } = sqlite3pkg.verbose();

let dbInstance = null;

export function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath =
    process.env.WAITLIST_DB_PATH ||
    path.join(process.cwd(), "lib", "data", "waitlist.db");

  dbInstance = new Database(dbPath, (err) => {
    if (err) {
      console.error("Error connecting to database:", err);
    } else {
      console.log("Connected to SQLite database");
    }
  });

  // Create table at runtime (not build time)
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      occupation TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return dbInstance;
}
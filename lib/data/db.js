// db.js - Database connection and initialization
import sqlite3pkg from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const { Database } = sqlite3pkg.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.WAITLIST_DB_PATH || path.join(__dirname, "waitlist.db");

export const db = new Database(
  dbPath,
  (err) => {
    if (err) {
      console.error("Error connecting to database:", err);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);

// Create submissions table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    occupation TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) {
      console.error("Error creating submissions table:", err);
    } else {
      console.log("Submissions table ready");
    }
  }
);

export default db;
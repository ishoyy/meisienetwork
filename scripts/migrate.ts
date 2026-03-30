import { config } from "dotenv";
import path from "path";


import { getMigrations } from "better-auth/db";
import { auth } from "../lib/auth";

async function migrate() {
    console.log("Database Path detected as:", process.env.DB_PATH);
    try {
        console.log("Running better-auth migrations...");
        const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options);
        
        if (toBeCreated.length === 0 && toBeAdded.length === 0) {
            console.log("✓ No migrations needed — database is up to date");
            process.exit(0);
        }

        console.log("Tables to be created:", toBeCreated.map(t => t.table));
        
        await runMigrations();
        console.log("✓ Migrations complete");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrate();
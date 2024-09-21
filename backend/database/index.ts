import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

let db: Database | null = null;

const getDbConnection = async (): Promise<Database> => {
    try {
        if (!db) {
            db = await open({
                filename: path.resolve(__dirname, "../../database.db"),
                driver: sqlite3.Database,
            });
        }
        return db;
    } catch (err: unknown) {
        console.error("Failed to open the database:", err);
        process.exit(1);
    }
}

export { getDbConnection };

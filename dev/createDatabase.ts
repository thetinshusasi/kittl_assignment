/**
 * This script is used to populate the database with fake data
 */
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const fakeImages = () => {
  return Array.from(Array(100)).map((_, i) => ({
    name: `Illustration ${i + 1}`,
    preview: `https://picsum.photos/seed/${i + 1}/300/300`,
  }));
};

async function openDb() {
  try {
    const db = await open({
      filename: path.resolve(__dirname, "../database.db"),
      driver: sqlite3.Database,
    });
    console.log("Database connection opened successfully.");
    return db;
  } catch (error) {
    console.error("Error opening the database:", error);
    throw error; // Rethrow the error after logging
  }
}

(async () => {
  let db;
  try {
    db = await openDb();

    // (re-)create illustrations table
    console.log("Dropping the existing illustrations table if it exists...");
    await db.exec("DROP TABLE IF EXISTS illustrations;");
    console.log("Creating a new illustrations table...");
    await db.exec(`CREATE TABLE illustrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        preview TEXT,
        impressions INTEGER DEFAULT 0,
        uses INTEGER DEFAULT 0
    );`);

    // Inserting fake images
    console.log("Inserting fake data into the illustrations table...");
    const fakeData = fakeImages()
      .map(({ name, preview }) => `("${name}", "${preview}")`)
      .join(", ");

    await db.exec(`INSERT INTO illustrations(name, preview) VALUES ${fakeData};`);
    console.log("Fake data inserted successfully.");
  } catch (error) {
    console.error("Error during database population:", error);
  } finally {
    if (db) {
      await db.close();
      console.log("Database connection closed.");
    }
  }
})();

/**
 * @file database.ts
 * @description SQLite configuration and initialization using expo-sqlite/next.
 * Schema includes flattened location fields for better query performance.
 */
import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const getDB = async () => {
	if (!db) {
		db = await SQLite.openDatabaseAsync("zubale_audit.db");
	}
	return db;
};

export const initDatabase = async () => {
	const database = await getDB();

	await database.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      status TEXT NOT NULL,
      
      -- Location flattened fields
      address TEXT,
      lat REAL,
      lng REAL,
      
      image_url TEXT,
      expires_at TEXT,
      
      -- Offline logic fields
      sync_status TEXT DEFAULT 'synced',
      local_changes TEXT,
      last_updated_at INTEGER
    );
  `);
};

//TODO: Remove this function
/**
```typescript
* ⚠️ DANGER: Deletes the entire database and recreates it from scratch.
* Useful only for development and testing.
```
 */
export const clearDatabase = async () => {
	const db = await getDB();
	await db.execAsync("DROP TABLE IF EXISTS tasks;");
	await initDatabase();
	console.log("♻️ Database reset completed");
};

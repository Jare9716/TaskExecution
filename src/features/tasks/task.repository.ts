/**
 * @file task.repository.ts
 * @description Data access layer for Tasks.
 * Handles mapping between the flat SQL structure and the nested Task domain model.
 */
import { getDB } from "@/services/database";
import { Task } from "@/models";

export const TaskRepository = {
	upsertTasks: async (tasks: Task[]) => {
		const db = await getDB();

		const localTasks = await db.getAllAsync<{ id: string }>(
			`SELECT id FROM tasks WHERE sync_status = ? OR status = ?`,
			["pending_update", "completed"],
		);

		const protectedIds = new Set(localTasks.map((t) => t.id));

		await db.withTransactionAsync(async () => {
			for (const task of tasks) {
				if (protectedIds.has(task.id)) {
					continue;
				}

				await db.runAsync(
					`INSERT OR REPLACE INTO tasks (
                    id, title, price, status, 
                    address, lat, lng, 
                    image_url, expires_at, sync_status, last_updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'synced', ?);`,
					[
						task.id,
						task.title,
						task.price,
						task.status,
						task.location.address,
						task.location.lat,
						task.location.lng,
						task.image_url,
						task.expires_at,
						Date.now(),
					],
				);
			}
		});
	},

	getAllTasks: async (): Promise<Task[]> => {
		const db = await getDB();
		const rows = await db.getAllAsync<any>(
			`SELECT * FROM tasks ORDER BY last_updated_at DESC;`,
		);

		return rows.map((row) => ({
			id: row.id,
			title: row.title,
			price: row.price,
			status: row.status,
			location: {
				address: row.address,
				lat: row.lat,
				lng: row.lng,
			},
			image_url: row.image_url,
			expires_at: row.expires_at,
			sync_status: row.sync_status,
			local_changes: row.local_changes ? JSON.parse(row.local_changes) : null,
			last_updated_at: row.last_updated_at,
		}));
	},

	markAsPendingSync: async (taskId: string, changes: Partial<Task>) => {
		const db = await getDB();
		// We only store the "audit" data in local_changes, avoiding full object updates if not needed
		const changesJson = JSON.stringify(changes.local_changes || {});
		const newStatus = changes.status || "completed";

		await db.runAsync(
			`UPDATE tasks 
       SET status = ?, local_changes = ?, sync_status = 'pending_update', last_updated_at = ?
       WHERE id = ?;`,
			[newStatus, changesJson, Date.now(), taskId],
		);
	},

	getPendingSyncTasks: async (): Promise<Task[]> => {
		const db = await getDB();
		const rows = await db.getAllAsync<any>(
			`SELECT * FROM tasks WHERE sync_status = 'pending_update';`,
		);

		return rows.map((row) => ({
			id: row.id,
			title: row.title,
			price: row.price,
			status: row.status,
			location: {
				address: row.address,
				lat: row.lat,
				lng: row.lng,
			},
			image_url: row.image_url,
			expires_at: row.expires_at,
			sync_status: row.sync_status,
			local_changes: row.local_changes ? JSON.parse(row.local_changes) : null,
			last_updated_at: row.last_updated_at,
		}));
	},

	markAsSynced: async (taskId: string) => {
		const db = await getDB();
		await db.runAsync(`UPDATE tasks SET sync_status = 'synced' WHERE id = ?;`, [
			taskId,
		]);
	},
};

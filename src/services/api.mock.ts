/**
 * @file api.mock.ts
 * @description Simulates network calls to Zubale's backend.
 * Generates the required JSON structure for the challenge.
 */
import { Task } from "@/models";

const DELAY_MS = 1000;

const MOCK_TASKS: Partial<Task>[] = [
	{
		id: "task_001",
		title: "Audit Coca-Cola Shelf",
		price: 50,
		status: "available",
		location: {
			lat: 19.4326,
			lng: -99.1332,
			address: "Walmart Buenavista",
		},
		image_url: "https://via.placeholder.com/200",
		expires_at: "2026-12-31T23:59:59Z",
	},
	{
		id: "task_002",
		title: "Check Price - Pepsi 2L",
		price: 35,
		status: "available",
		location: {
			lat: 19.435,
			lng: -99.13,
			address: "Oxxo Reforma",
		},
		image_url: "https://via.placeholder.com/200",
		expires_at: "2026-12-31T23:59:59Z",
	},
];

export const MockApi = {
	fetchTasks: async (): Promise<Task[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				// Return deep copy to simulate fresh data
				const data = MOCK_TASKS.map((t) => ({
					...t,
					sync_status: "synced",
					last_updated_at: Date.now(),
				})) as Task[];
				resolve(data);
			}, DELAY_MS);
		});
	},

	submitTask: async (
		taskId: string,
		data: any,
	): Promise<{ success: boolean }> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// Simulate 20% random failure for testing retries
				const randomFailure = Math.random() < 0.2;
				if (randomFailure) {
					reject(new Error("Network Error: 503 Service Unavailable"));
				} else {
					resolve({ success: true });
				}
			}, DELAY_MS);
		});
	},
};

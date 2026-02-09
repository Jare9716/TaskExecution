/**
 * @file api.mock.ts
 * @description Simulates network calls to Zubale's backend.
 * Generates the required JSON structure for the challenge.
 */
import { Task, TaskStatus, SyncStatus } from "@/models";

const DELAY_MS = 1000;

const MOCK_TASKS: Partial<Task>[] = [
	{
		id: "task_001",
		title: "Audit Coca-Cola Shelf",
		price: 50,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.4326,
			lng: -99.1332,
			address: "Walmart Supercenter - Downtown",
		},
		image_url: "https://via.placeholder.com/200/FF0000/FFFFFF?text=Coke",
		expires_at: "2026-12-31T23:59:59Z",
	},
	{
		id: "task_002",
		title: "Check Price - Pepsi 2L",
		price: 35,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.435,
			lng: -99.13,
			address: "7-Eleven Main St.",
		},
		image_url: "https://via.placeholder.com/200/0000FF/FFFFFF?text=Pepsi",
		expires_at: "2026-12-31T23:59:59Z",
	},
	{
		id: "task_003",
		title: "Validate Lay's Promotion",
		price: 45,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.438,
			lng: -99.14,
			address: "Target Store #402",
		},
		image_url: "https://via.placeholder.com/200/FFFF00/000000?text=Lays",
		expires_at: "2026-10-15T12:00:00Z",
	},
	{
		id: "task_004",
		title: "Beer Display Photo - Corona",
		price: 60,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.42,
			lng: -99.16,
			address: "Costco Wholesale",
		},
		image_url: "https://via.placeholder.com/200/FFD700/000000?text=Corona",
		expires_at: "2026-11-20T18:00:00Z",
	},
	{
		id: "task_005",
		title: "Mystery Shopper - Customer Svc",
		price: 120,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.41,
			lng: -99.17,
			address: "H&M Fashion Mall",
		},
		image_url: "https://via.placeholder.com/200/FF00FF/FFFFFF?text=Mystery",
		expires_at: "2026-09-10T14:00:00Z",
	},
	{
		id: "task_006",
		title: "Dairy Inventory Audit",
		price: 80,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.4,
			lng: -99.15,
			address: "Whole Foods Market",
		},
		image_url: "https://via.placeholder.com/200/FFFFFF/000000?text=Dairy",
		expires_at: "2026-12-01T09:00:00Z",
	},
	{
		id: "task_007",
		title: "Price Check - Pharmacy",
		price: 40,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.39,
			lng: -99.18,
			address: "CVS Pharmacy",
		},
		image_url: "https://via.placeholder.com/200/000080/FFFFFF?text=Pharma",
		expires_at: "2026-12-31T23:59:59Z",
	},
	{
		id: "task_008",
		title: "Tech Promoter - POP Material",
		price: 55,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.425,
			lng: -99.12,
			address: "Best Buy Electronics",
		},
		image_url: "https://via.placeholder.com/200/0000FF/FFFFFF?text=Tech",
		expires_at: "2026-08-30T16:00:00Z",
	},
	{
		id: "task_009",
		title: "Quick Audit - Bakery Section",
		price: 30,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.44,
			lng: -99.13,
			address: "Starbucks Coffee",
		},
		image_url: "https://via.placeholder.com/200/006400/FFFFFF?text=Bakery",
		expires_at: "2026-12-15T10:00:00Z",
	},
	{
		id: "task_010",
		title: "Planogram Validation - Dannon",
		price: 90,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.38,
			lng: -99.19,
			address: "Kroger Supermarket",
		},
		image_url: "https://via.placeholder.com/200/0000FF/FFFFFF?text=Dannon",
		expires_at: "2026-11-01T12:00:00Z",
	},
	{
		id: "task_011",
		title: "Expiration Date Check - Deli",
		price: 65,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.45,
			lng: -99.14,
			address: "Sam's Club",
		},
		image_url: "https://via.placeholder.com/200/008000/FFFFFF?text=Deli",
		expires_at: "2026-12-20T18:00:00Z",
	},
	{
		id: "task_012",
		title: "Satisfaction Survey - Apple",
		price: 150,
		status: TaskStatus.AVAILABLE,
		location: {
			lat: 19.4326,
			lng: -99.1332,
			address: "Apple Store Polanco",
		},
		image_url: "https://via.placeholder.com/200/000000/FFFFFF?text=Apple",
		expires_at: "2026-09-15T20:00:00Z",
	},
];

export const MockApi = {
	fetchTasks: async (): Promise<Task[]> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				// Return deep copy to simulate fresh data
				const data = MOCK_TASKS.map((t) => ({
					...t,
					sync_status: SyncStatus.SYNCED,
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

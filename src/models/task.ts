/**
 * @file task.ts
 * @description Core domain models for the Task and Audit features.
 * Defines the shape of Task objects as received from the remote API
 * and extends them with local-only fields for offline synchronization state.
 */

export type TaskStatus = "available" | "completed";

export type SyncStatus = "synced" | "pending_update";

export type TaskLocation = {
	lat: number;
	lng: number;
	address: string;
};

export type TaskAuditData = {
	comment?: string;
	photo_local_uri?: string;
	completed_at?: string;
};

export type Task = {
	// Remote Data (Matches Zubale JSON Spec)
	id: string;
	title: string;
	price: number;
	status: TaskStatus;
	location: TaskLocation;
	image_url: string;
	expires_at: string;

	// Local/Offline State
	sync_status: SyncStatus;
	local_changes?: TaskAuditData | null;
	last_updated_at: number;
};

export type TasksState = {
	list: Task[];
	loading: boolean;
	syncing: boolean;
	error: string | null;
};

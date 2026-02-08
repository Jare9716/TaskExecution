/**
 * @file task.ts
 * @description Core domain models for the Task and Audit features.
 */

export enum TaskStatus {
	AVAILABLE = "available",
	COMPLETED = "completed",
	EXPIRED = "expired",
}

export enum SyncStatus {
	SYNCED = "synced",
	PENDING = "pending_update",
}

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
	id: string;
	title: string;
	price: number;
	status: TaskStatus;
	location: TaskLocation;
	image_url: string;
	expires_at: string;

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

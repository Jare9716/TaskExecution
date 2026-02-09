import { Task, TaskStatus, SyncStatus } from "@/models";

export const editableTask = (task: Task) => {
	return (
		task.status === TaskStatus.COMPLETED &&
		task.sync_status === SyncStatus.SYNCED
	);
};

export const findTask = (tasks: Task[], taskId: string): Task => {
	let task = tasks.find((t) => t.id === taskId);

	if (!task) {
		task = {
			id: taskId,
			title: "",
			price: 0,
			status: TaskStatus.AVAILABLE,
			location: { lat: 0, lng: 0, address: "" },
			image_url: "",
			expires_at: "",
			sync_status: SyncStatus.SYNCED,
			last_updated_at: Date.now(),
		};
	}

	return task;
};

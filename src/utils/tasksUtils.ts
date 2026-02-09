import { Task, Text, SyncStatus, TaskStatus } from "@/models";

export const getTaskStatus = (task: Task): { text: string; color: Text } => {
	if (task.status === TaskStatus.AVAILABLE) {
		return { text: "Pending", color: "tertiary" };
	} else if (task.sync_status === SyncStatus.SYNCED) {
		return { text: "Synced", color: "success" };
	} else {
		return { text: "Syncing", color: "warning" };
	}
};

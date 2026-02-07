import { Task } from "@/models/task";

import { ItemListColor } from "@/models";

export const getTaskColor = (task: Task): ItemListColor => {
	if (task.status === "available") {
		return "available";
	} else if (task.sync_status === "synced") {
		return "synced";
	} else {
		return "pending";
	}
};

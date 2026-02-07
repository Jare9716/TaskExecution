import { Task } from "@/models/task";

import { Text } from "@/models";

export const getTaskStatus = (task: Task): { text: string; color: Text } => {
	if (task.status === "available") {
		return { text: "Pending", color: "tertiary" };
	} else if (task.sync_status === "synced") {
		return { text: "Synced", color: "success" };
	} else {
		return { text: "Syncing", color: "warning" };
	}
};

const completedTasks = (tasks: Task[]) => {
	return tasks.filter((task) => task.status === "completed").length;
};

const pendingTasks = (tasks: Task[]) => {
	return tasks.filter((task) => task.status === "available").length;
};

export const tasksState = (tasks: Task[]) => {
	const completed = completedTasks(tasks);
	const pending = pendingTasks(tasks);
	const total = tasks.length;
	return { completed, pending, total };
};

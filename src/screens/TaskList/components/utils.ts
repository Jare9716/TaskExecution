import { NetInfoState } from "@react-native-community/netinfo";

import { Task, Text } from "@/models";

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

export const getSyncStatus = (
	syncStatus: boolean,
): { text: string; color: Text } => {
	if (syncStatus) {
		return { text: "Syncing", color: "warning" };
	} else {
		return { text: "Free", color: "success" };
	}
};

export const getNetInfoStatus = (
	netInfo: NetInfoState,
): { text: string; color: Text } => {
	if (netInfo.isConnected) {
		return { text: "Connected", color: "success" };
	} else {
		return { text: "Disconnected", color: "error" };
	}
};

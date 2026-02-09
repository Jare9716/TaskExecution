import { NetInfoState } from "@react-native-community/netinfo";

import { Task, Text } from "@/models";

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
	loading: boolean,
): { text: string; color: Text } => {
	if (loading) {
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

import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import * as NetInfo from "@react-native-community/netinfo";

import { TaskRepository } from "@/features/tasks/task.repository";

import { MockApi } from "./api.mock";

const BACKGROUND_SYNC_TASK = "BACKGROUND_SYNC_TASK";

TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
	try {
		const now = new Date().toISOString();
		console.log(`exec at: ${now}`);

		const netState = await NetInfo.fetch();
		if (!netState.isConnected) {
			console.log("no internet. aborting.");
			return BackgroundTask.BackgroundTaskResult.Failed;
		}

		const pendingTasks = await TaskRepository.getPendingSyncTasks();

		if (pendingTasks.length === 0) {
			console.log("no tasks pending.");
			return BackgroundTask.BackgroundTaskResult.Success;
		}

		let syncedCount = 0;
		for (const task of pendingTasks) {
			try {
				if (task.local_changes) {
					await MockApi.submitTask(task.id, task.local_changes);
					await TaskRepository.markAsSynced(task.id);
					syncedCount++;
				}
			} catch (e) {
				console.error(`failed task ${task.id}`, e);
			}
		}

		console.log(`synced: ${syncedCount}`);
		return BackgroundTask.BackgroundTaskResult.Success;
	} catch (error) {
		console.error("critical error:", error);
		return BackgroundTask.BackgroundTaskResult.Failed;
	}
});

export async function registerBackgroundSyncAsync() {
	const isRegistered =
		await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);
	if (isRegistered) {
		console.log("Background Task already registered");
		return;
	}

	return BackgroundTask.registerTaskAsync(BACKGROUND_SYNC_TASK, {
		minimumInterval: 15,
	});
}

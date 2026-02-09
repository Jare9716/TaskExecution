/**
 * @file backgroundSync.ts
 * @description Background task service to sync pending tasks when the app is closed.
 */
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import * as NetInfo from "@react-native-community/netinfo";

import { TaskRepository } from "@/features/tasks/task.repository";
import { MockApi } from "./api.mock";

const BACKGROUND_SYNC_TASK = "BACKGROUND_SYNC_TASK";

// Define the task behavior
TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
	try {
		// 1. Network Check
		const netState = await NetInfo.fetch();
		if (!netState.isConnected) {
			return BackgroundTask.BackgroundTaskResult.Failed;
		}

		// 2. Check for pending work
		const pendingTasks = await TaskRepository.getPendingSyncTasks();

		if (pendingTasks.length === 0) {
			return BackgroundTask.BackgroundTaskResult.Success;
		}

		// 3. Process Queue
		for (const task of pendingTasks) {
			try {
				if (task.local_changes) {
					await MockApi.submitTask(task.id, task.local_changes);
					await TaskRepository.markAsSynced(task.id);
				}
			} catch (error) {
				console.error(`[BackgroundSync] Failed task ${task.id}`, error);
			}
		}

		return BackgroundTask.BackgroundTaskResult.Success;
	} catch (error) {
		console.error("[BackgroundSync] Critical Error:", error);
		return BackgroundTask.BackgroundTaskResult.Failed;
	}
});

/**
 * Registers the background task with the system.
 * Should be called on App launch.
 */
export const registerBackgroundSyncAsync = async () => {
	try {
		const isRegistered =
			await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);
		if (isRegistered) return;

		await BackgroundTask.registerTaskAsync(BACKGROUND_SYNC_TASK, {
			minimumInterval: 15,
		});
	} catch (error) {
		console.error("Failed to register background task:", error);
	}
};

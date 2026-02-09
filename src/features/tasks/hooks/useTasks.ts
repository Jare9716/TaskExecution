/**
 * @file useTasks.ts
 * @description Custom hook that acts as a Facade for the Task feature.
 * Encapsulates Redux dispatching, data selection, and side effects.
 */
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadTasks, completeTask, syncPendingTasks } from "../task.slice";
import { TaskAuditData } from "@/models";

export const useTasks = () => {
	const dispatch = useAppDispatch();

	const tasks = useAppSelector((state) => state.tasks.list);
	const loading = useAppSelector((state) => state.tasks.loading);
	const syncing = useAppSelector((state) => state.tasks.syncing);
	const error = useAppSelector((state) => state.tasks.error);

	/**
	 * Manually triggers a data refresh (Pull-to-refresh).
	 */
	const refresh = useCallback(() => {
		return dispatch(loadTasks()).unwrap();
	}, [dispatch]);

	/**
	 * Saves a task audit (Offline-First Action).
	 * Persists to SQLite immediately and schedules background sync.
	 */
	const auditTask = useCallback(
		async (taskId: string, data: TaskAuditData) => {
			await dispatch(completeTask({ taskId, data })).unwrap();
		},
		[dispatch],
	);

	/**
	 * Manually retries syncing pending changes.
	 * Useful for UI feedback when the user taps on a "Sync Error" icon.
	 */
	const forceSync = useCallback(() => {
		dispatch(syncPendingTasks());
	}, [dispatch]);

	return {
		tasks,
		loading,
		syncing,
		error,
		refresh,
		auditTask,
		forceSync,
	};
};

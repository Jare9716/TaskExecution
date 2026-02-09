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
	 * Forzar una recarga manual (Pull-to-refresh)
	 */
	const refresh = useCallback(() => {
		return dispatch(loadTasks()).unwrap();
	}, [dispatch]);

	/**
	 * Guardar una auditoría (Offline-First Action)
	 * Esto guarda en SQLite inmediatamente y agenda el Sync.
	 */
	const auditTask = useCallback(
		async (taskId: string, data: TaskAuditData) => {
			await dispatch(completeTask({ taskId, data })).unwrap();
		},
		[dispatch],
	);

	/**
	 * Reintentar subir cambios pendientes manualmente
	 * Útil si el usuario ve un icono de "Error de Sync" y lo toca.
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

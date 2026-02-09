/**
 * @file task.slice.ts
 * @description Redux slice managing task state and offline synchronization logic.
 * Implements the "Stale-While-Revalidate" pattern manually via Thunks.
 */

import NetInfo from "@react-native-community/netinfo";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { TaskRepository } from "./task.repository";
import { MockApi } from "@/services/api.mock";

import { Task, TaskAuditData, TasksState, TaskStatus } from "@/models";

const initialState: TasksState = {
	list: [],
	loading: false,
	syncing: false,
	error: null,
};

// Thunk: Load data (Local DB First -> Then Network)
export const loadTasks = createAsyncThunk(
	"tasks/load",
	async (_, { dispatch }) => {
		try {
			// 1. Load from Local DB (Instant UI)
			const localTasks = await TaskRepository.getAllTasks();
			if (localTasks.length > 0) {
				dispatch(setTasks(localTasks));
			}

			// 2. Fetch from Network (Background update)
			const remoteTasks = await MockApi.fetchTasks();

			// 3. Update Local DB with new data
			await TaskRepository.upsertTasks(remoteTasks);

			// 4. Reload from DB to ensure single source of truth
			const finalTasks = await TaskRepository.getAllTasks();
			return finalTasks;
		} catch (error) {
			// If network fails, we rely on the local data already dispatched
			throw error;
		}
	},
);

// Thunk: Complete a task (Offline Action)
export const completeTask = createAsyncThunk(
	"tasks/complete",
	async (payload: { taskId: string; data: TaskAuditData }, { dispatch }) => {
		// 1. Save to Local DB as 'pending_update'
		await TaskRepository.markAsPendingSync(payload.taskId, {
			status: TaskStatus.COMPLETED,
			local_changes: payload.data,
		});

		// 2. Refresh State from DB
		const tasks = await TaskRepository.getAllTasks();
		dispatch(setTasks(tasks));

		// 3. Trigger Background Sync and WAIT for it
		return await dispatch(syncPendingTasks()).unwrap();
	},
);

// Thunk: Sync Manager (The background job)
//TODO: THIS THUNK IS BEEING CALLED CONSTANTLY, I NEED TO FIX THIS
export const syncPendingTasks = createAsyncThunk(
	"tasks/sync",
	async (_, { rejectWithValue }) => {
		//TODO: check if we can use useNetInfo here
		const netStatus = await NetInfo.fetch();

		if (!netStatus.isConnected) {
			return rejectWithValue("No internet connection");
		}

		const pendingTasks = await TaskRepository.getPendingSyncTasks();
		const errors: string[] = [];

		for (const task of pendingTasks) {
			try {
				if (!task.local_changes) continue;

				// Try to send to API
				await MockApi.submitTask(task.id, task.local_changes);

				// If success, mark as synced locally
				await TaskRepository.markAsSynced(task.id);
			} catch (e: any) {
				errors.push(`Task ${task.id}: ${e.message || "Unknown error"}`);
			}
		}

		// Refresh final state
		const finalTasks = await TaskRepository.getAllTasks();

		if (errors.length > 0) {
			return rejectWithValue(errors.join(", "));
		}

		return finalTasks;
	},
);

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<Task[]>) => {
			state.list = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Load Tasks Flo
			.addCase(loadTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadTasks.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload) {
					state.list = action.payload;
				}
			})
			.addCase(loadTasks.rejected, (state, action) => {
				state.loading = false;
				if (state.list.length === 0) {
					state.error = action.error.message || "Error loading tasks";
				}
			})

			// Sync Flow
			.addCase(syncPendingTasks.pending, (state) => {
				state.syncing = true;
			})
			.addCase(syncPendingTasks.fulfilled, (state, action) => {
				state.syncing = false;
				if (action.payload) {
					state.list = action.payload;
				}
			})
			.addCase(syncPendingTasks.rejected, (state, action) => {
				state.syncing = false;
				state.error = (action.payload as string) || "Error syncing tasks";
			});
	},
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

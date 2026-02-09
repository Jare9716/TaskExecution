import { useEffect, useRef } from "react";

import NetInfo from "@react-native-community/netinfo";

import { useAppDispatch } from "@/store/hooks";
import { syncPendingTasks } from "../task.slice";

export const SyncManager = () => {
	const dispatch = useAppDispatch();
	const wasConnected = useRef<boolean | null>(null);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			const isConnected = !!(state.isConnected && state.isInternetReachable);

			// Only sync if we were NOT connected (or it's the first check) and now we ARE
			if (isConnected && wasConnected.current === false) {
				dispatch(syncPendingTasks());
			}

			wasConnected.current = isConnected;
		});

		return () => unsubscribe();
	}, [dispatch]);

	return null;
};

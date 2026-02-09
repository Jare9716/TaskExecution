import { useEffect } from "react";

import NetInfo from "@react-native-community/netinfo";

import { useAppDispatch } from "@/store/hooks";
import { syncPendingTasks } from "../task.slice";

export const SyncManager = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			if (state.isConnected && state.isInternetReachable) {
				dispatch(syncPendingTasks());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return null;
};

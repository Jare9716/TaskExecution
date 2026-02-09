import { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { useInitDatabase } from "@/features/tasks/hooks/useInitDatabase";
import { SyncManager } from "@/features/tasks/components/SyncManager";
import { registerBackgroundSyncAsync } from "@/services/backgroundSync";

import { RootStack } from "./rootStack";

SplashScreen.preventAutoHideAsync();

const Navigation = () => {
	const { loading } = useInitDatabase();

	useEffect(() => {
		registerBackgroundSyncAsync().catch((e) =>
			console.error("Background Task registration failed:", e),
		);
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (!loading) {
			await SplashScreen.hideAsync();
		}
	}, [loading]);

	if (loading) {
		return null;
	}

	return (
		<NavigationContainer onReady={onLayoutRootView}>
			<SyncManager />
			<RootStack />
		</NavigationContainer>
	);
};

export default Navigation;

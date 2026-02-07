import { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useInitDatabase } from "@/features/tasks/hooks/useInitDatabase";

import * as SplashScreen from "expo-splash-screen";

import { RootStack } from "./rootStack";

SplashScreen.preventAutoHideAsync();

const Navigation = () => {
	const { loading } = useInitDatabase();

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
			<RootStack />
		</NavigationContainer>
	);
};

export default Navigation;

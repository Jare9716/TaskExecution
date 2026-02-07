import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/models";

import { TaskListScreen } from "@/screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
	return (
		<Stack.Navigator initialRouteName="TaskList">
			<Stack.Screen name="TaskList" component={TaskListScreen} />
		</Stack.Navigator>
	);
};

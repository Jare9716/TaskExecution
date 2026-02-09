import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@/models";

import { TaskListScreen } from "@/screens";
import { TaskDetailScreen } from "@/screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
	return (
		<Stack.Navigator initialRouteName="TaskList">
			<Stack.Screen
				name="TaskList"
				component={TaskListScreen}
				options={{ title: "Tasks List" }}
			/>
			<Stack.Screen
				name="TaskDetail"
				component={TaskDetailScreen}
				options={{ title: "Task Detail" }}
			/>
		</Stack.Navigator>
	);
};

import { useCallback } from "react";
import {
	View,
	FlatList,
	RefreshControl,
	Text,
	TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/models/task";

import TaskItem from "./components/TaskListItem";

const TaskListScreen = () => {
	const navigation = useNavigation();

	const { tasks, loading, refresh, syncing } = useTasks();

	const handlePressTask = useCallback(
		(task: Task) => {
			// navigation.navigate("TaskDetail", { taskId: task.id });
		},
		[navigation],
	);

	// Función de renderizado para mantener el código limpio
	const renderItem = useCallback(
		({ item }: { item: Task }) => {
			return <TaskItem task={item} onPress={handlePressTask} />;
		},
		[handlePressTask],
	);

	return (
		<View style={{ flex: 1 }}>
			{/* Header con Indicador de Sync Global */}
			{syncing && (
				<View
					style={{
						backgroundColor: "#FFD700",
						padding: 5,
						alignItems: "center",
					}}
				>
					<Text>Subiendo cambios pendientes... ☁️</Text>
				</View>
			)}

			<FlatList
				data={tasks}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
				// Optimización básica para listas
				initialNumToRender={10}
				windowSize={5}
			/>
		</View>
	);
};

export default TaskListScreen;

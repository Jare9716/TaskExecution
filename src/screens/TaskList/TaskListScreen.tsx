import { useCallback } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/models/task";

import TaskItem from "./components/TaskListItem";
import TaskRecapCard from "./components/TaskRecapCard";

import { Spacing, Colors } from "@/styles";

const TaskListScreen = () => {
	const navigation = useNavigation();

	const { tasks, loading, refresh, syncing, auditTask, forceSync } = useTasks();

	const handlePressTask = useCallback(
		(task: Task) => {
			// navigation.navigate("TaskDetail", { taskId: task.id });
		},
		[navigation],
	);

	const renderItem = useCallback(
		({ item }: { item: Task }) => {
			return (
				<TaskItem task={item} onPress={handlePressTask} auditTask={auditTask} />
			);
		},
		[handlePressTask, auditTask],
	);

	return (
		<View style={styles.container}>
			<TaskRecapCard tasks={tasks} forceSync={forceSync} />

			<FlatList
				data={tasks}
				contentContainerStyle={styles.flatListContainer}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
				getItemLayout={(data, index) => ({
					length: 119 + 8,
					offset: (119 + 8) * index,
					index,
				})}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.surface.secondary,
		padding: Spacing.spacing.x4,
		gap: Spacing.spacing.x4,
		flex: 1,
	},
	flatListContainer: {
		gap: Spacing.spacing.x2,
	},
});

export default TaskListScreen;

import { useCallback } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { Task } from "@/models/task";

import TaskItem from "./components/TaskListItem";
import TaskRecapCard from "./components/TaskRecapCard";

import { FilledButton } from "@/components";

import { Spacing, Colors, Buttons } from "@/styles";

const TaskListScreen = () => {
	const navigation = useNavigation();

	const { tasks, loading, refresh, auditTask, forceSync, syncing } = useTasks();

	const handlePressTask = useCallback(
		(task: Task) => {
			navigation.navigate("TaskDetail", { taskId: task.id });
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
		<SafeAreaView style={styles.container} edges={["bottom"]}>
			<TaskRecapCard tasks={tasks} syncing={syncing} />

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
			<View style={styles.buttonContainer}>
				<FilledButton
					title="Force sync"
					onPress={forceSync}
					iconName="sync"
					style={styles.button}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.surface.secondary,
		paddingHorizontal: Spacing.spacing.x4,
		paddingTop: Spacing.spacing.x4,
		gap: Spacing.spacing.x4,
		flex: 1,
	},
	flatListContainer: {
		gap: Spacing.spacing.x2,
	},
	buttonContainer: {
		paddingVertical: Spacing.spacing.x4,
	},
	button: {
		...Buttons.filledLarge.primary,
	},
});

export default TaskListScreen;

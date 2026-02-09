import { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, AppState } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useTasks } from "@/features/tasks/hooks/useTasks";

import { Task } from "@/models/task";
import { clearDatabase } from "@/services/database";

import { FilledButton, LoadingView } from "@/components";
import TaskItem from "./components/TaskListItem";
import TaskRecapCard from "./components/TaskRecapCard";

import { Spacing, Colors, Buttons } from "@/styles";

const TaskListScreen = () => {
	const navigation = useNavigation();

	const { tasks, loading, refresh, auditTask, forceSync } = useTasks();

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

	useEffect(() => {
		refresh();
		const subscription = AppState.addEventListener("change", (nextAppState) => {
			if (nextAppState === "active") {
				refresh();
			}
		});

		return () => {
			subscription.remove();
		};
	}, []);

	return (
		<LoadingView loading={loading}>
			<SafeAreaView style={styles.container} edges={["bottom"]}>
				<TaskRecapCard tasks={tasks} loading={loading} />

				<FlatList
					data={tasks}
					contentContainerStyle={styles.flatListContainer}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
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
					{/* TODO: Remove this button */}
					{/* <FilledButton
						title="Clear database"
						onPress={clearDatabase}
						iconName="delete"
						style={styles.button}
					/> */}
				</View>
			</SafeAreaView>
		</LoadingView>
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
		paddingBottom: Spacing.spacing.x4,
		gap: Spacing.spacing.x2,
	},
	button: {
		...Buttons.filledLarge.primary,
	},
});

export default TaskListScreen;

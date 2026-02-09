import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useTasks } from "@/features/tasks/hooks/useTasks";

import { TaskDetailScreenProps } from "@/models";

import { editableTask, findTask } from "./utils";
import { simpleAlert } from "@/utils/alerts";

import { TasksDetails } from "./components/TasksDetails";
import { FilledButton, LoadingView } from "@/components";

import { Colors, Spacing, Typography, Buttons } from "@/styles";

const TaskDetailScreen = ({ route }: TaskDetailScreenProps) => {
	const navigation = useNavigation();
	const { taskId } = route.params;
	const { tasks, auditTask, error, loading } = useTasks();

	const task = findTask(tasks, taskId);
	const isEditable = editableTask(task);

	const [comment, setComment] = useState(task?.local_changes?.comment || "");

	const handleSave = async () => {
		try {
			await auditTask(task.id, {
				comment: comment,
				completed_at: new Date().toISOString(),
			});
		} catch (e: any) {
			if (error) {
				simpleAlert(
					"Error",
					"Failed to save task. Please check your internet connection or try again later.",
				);
			}
		} finally {
			navigation.goBack();
		}
	};

	return (
		<LoadingView loading={loading}>
			<SafeAreaView style={styles.container} edges={["bottom"]}>
				<ScrollView>
					<Text style={styles.title}>{task.title}</Text>
					<View style={styles.formSection}>
						<View style={styles.inputContainer}>
							<Text style={styles.inputTitle}>Observations</Text>
							<TextInput
								style={styles.input}
								multiline
								placeholder="Example: Product damage, price incorrect..."
								value={comment}
								onChangeText={setComment}
								editable={!isEditable}
							/>
						</View>
					</View>
					<TasksDetails task={task} />
				</ScrollView>
				{!isEditable && (
					<View style={styles.buttonContainer}>
						<FilledButton
							title={"Complete Task"}
							onPress={handleSave}
							style={styles.button}
						/>
					</View>
				)}
			</SafeAreaView>
		</LoadingView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.surface.primary,
		paddingHorizontal: Spacing.spacing.x4,
		paddingTop: Spacing.spacing.x2,
		flex: 1,
	},
	title: {
		...Typography.headline.headline5,
		color: Colors.text.primary,
	},
	subtitle: {
		...Typography.subtitle.subtitle2,
		color: Colors.text.contrast,
	},
	inputTitle: {
		...Typography.subtitle.subtitle2,
		color: Colors.text.primary,
	},
	formSection: {
		paddingVertical: Spacing.spacing.x4,
		borderBottomColor: Colors.border.secondary,
		borderBottomWidth: 1,
	},
	inputContainer: {
		gap: Spacing.spacing.x2,
	},
	input: {
		backgroundColor: Colors.surface.primary,
		borderColor: Colors.border.secondary,
		borderRadius: Spacing.radius.md,
		padding: Spacing.spacing.x3,
		textAlignVertical: "top",
		height: 100,
		borderWidth: 1,
	},
	buttonContainer: {
		paddingBottom: Spacing.spacing.x4,
	},
	button: {
		...Buttons.filledLarge.primary,
	},
});

export default TaskDetailScreen;

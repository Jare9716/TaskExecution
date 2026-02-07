import { View, Text, StyleSheet } from "react-native";

import { TaskRecapCardProps } from "@/models";

import { tasksState } from "./utils";

import { FilledButton } from "@/components";

import { Buttons, Spacing, Colors, Typography } from "@/styles";

const TaskRecapCard = ({ tasks, forceSync }: TaskRecapCardProps) => {
	const { completed, pending, total } = tasksState(tasks);

	const onFirstPress = () => {
		console.log("onFirstPress");
	};

	return (
		<View style={styles.container}>
			<View style={styles.informationConatiner}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Tasks</Text>
					<Text style={styles.titleValue}>{total}</Text>
				</View>
				<View style={styles.subtitleContainer}>
					<View style={styles.subtitleLeft}>
						<Text style={styles.titleText}>Completed</Text>
						<Text style={styles.subtitleText}>{completed}</Text>
					</View>
					<View style={styles.subtitleRight}>
						<Text style={styles.titleText}>Pending</Text>
						<Text style={styles.subtitleText}>{pending}</Text>
					</View>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<FilledButton
					title="Add"
					onPress={onFirstPress}
					iconName="add"
					style={styles.button}
				/>
				<FilledButton
					title="Force sync"
					onPress={forceSync}
					iconName="sync"
					style={styles.button}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: Spacing.radius.md,
		backgroundColor: Colors.surface.primary,
	},
	informationConatiner: {
		paddingHorizontal: Spacing.spacing.x2,
		paddingVertical: Spacing.spacing.x4,
		gap: Spacing.spacing.x4,
		borderBottomColor: Colors.border.secondary,
		borderBottomWidth: 1,
	},
	titleContainer: {
		gap: Spacing.spacing.x1,
	},
	titleText: {
		...Typography.subtitle.subtitle2,
		color: Colors.text.contrast,
	},
	titleValue: {
		...Typography.headline.headline4,
		color: Colors.text.tertiary,
	},
	subtitleContainer: {
		flexDirection: "row",
	},
	subtitleLeft: {
		gap: Spacing.spacing.x1,
		flex: 1,
	},
	subtitleRight: {
		gap: Spacing.spacing.x1,
		alignItems: "flex-end",
		flex: 1,
	},
	subtitleText: {
		...Typography.body.body1,
		color: Colors.text.secondary,
	},
	buttonContainer: {
		paddingHorizontal: Spacing.spacing.x2,
		paddingVertical: Spacing.spacing.x4,
		gap: Spacing.spacing.x4,
		flexDirection: "row",
	},
	button: {
		...Buttons.filledSmall.primary,
		flex: 1,
		flexShrink: 1,
	},
});

export default TaskRecapCard;

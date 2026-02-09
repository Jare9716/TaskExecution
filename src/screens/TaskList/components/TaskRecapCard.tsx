import { View, Text, StyleSheet } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import { TaskRecapCardProps } from "@/models";

import { tasksState, getSyncStatus, getNetInfoStatus } from "../utils";

import { Spacing, Colors, Typography } from "@/styles";

const TaskRecapCard = ({ tasks, loading }: TaskRecapCardProps) => {
	const netInfo = useNetInfo();

	const { completed, pending, total } = tasksState(tasks);
	const { text: syncText, color: syncColor } = getSyncStatus(loading);
	const { text: netInfoText, color: netInfoColor } = getNetInfoStatus(netInfo);

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Tasks</Text>
					<Text style={styles.titleValue}>{total}</Text>
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Completed</Text>
					<Text style={styles.titleValue}>{completed}</Text>
				</View>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>Pending</Text>
					<Text style={styles.titleValue}>{pending}</Text>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<View style={styles.subtitleLeft}>
					<Text style={styles.titleText}>Server status</Text>
					<Text
						style={[styles.subtitleText, { color: Colors.text[syncColor] }]}
					>
						{syncText}
					</Text>
				</View>
				<View style={styles.subtitleRight}>
					<Text style={styles.titleText}>Internet</Text>
					<Text
						style={[styles.subtitleText, { color: Colors.text[netInfoColor] }]}
					>
						{netInfoText}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: Spacing.radius.md,
		backgroundColor: Colors.surface.primary,
	},
	headerContainer: {
		padding: Spacing.spacing.x4,
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: Colors.border.secondary,
	},
	titleContainer: {
		gap: Spacing.spacing.x1,
		alignItems: "center",
	},
	titleText: {
		...Typography.subtitle.subtitle2,
		color: Colors.text.contrast,
	},
	titleValue: {
		...Typography.headline.headline4,
		color: Colors.text.tertiary,
	},
	bottomContainer: {
		padding: Spacing.spacing.x4,
		justifyContent: "space-between",
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
	},
});

export default TaskRecapCard;

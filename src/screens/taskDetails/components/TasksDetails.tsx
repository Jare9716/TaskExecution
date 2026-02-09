import { View, StyleSheet } from "react-native";

import { TaskDetailsProps } from "@/models";

import { getTaskStatus } from "@/utils/tasksUtils";
import { numberFormat, dateToString } from "@/utils/textTransform";

import { TaskDetailItem } from "./TaskDetailItem";

import { Spacing } from "@/styles";

export const TasksDetails = ({ task }: TaskDetailsProps) => {
	const { text: statusText, color: statusColor } = getTaskStatus(task);

	const currency = numberFormat({
		options: {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		},
	});

	return (
		<View style={styles.container}>
			<TaskDetailItem
				title="Status"
				value={statusText}
				textColor={statusColor}
			/>
			<TaskDetailItem title="Location" value={task.location.address} />
			<TaskDetailItem title="Task ID" value={task.id} />
			<TaskDetailItem title="Price" value={currency.format(task.price)} />
			<TaskDetailItem
				title="Expires at"
				value={dateToString(task.expires_at)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: Spacing.spacing.x4,
		gap: Spacing.spacing.x4,
	},
});

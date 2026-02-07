import { memo } from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import { TaskListItemProps } from "@/models";

import { getTaskColor } from "./utils";
import { applyOpacity } from "@/utils/pressablesFeedback";

import { Typography, Colors } from "@/styles";

const TaskListItem = memo(({ task, onPress }: TaskListItemProps) => {
	let color = getTaskColor(task);

	return (
		<Pressable
			style={applyOpacity([
				styles.container,
				{ backgroundColor: Colors.itemListColor[color] },
			])}
			onPress={() => onPress(task)}
		>
			<Text>{task.title}</Text>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	container: {
		height: 56,
	},
});

export default TaskListItem;

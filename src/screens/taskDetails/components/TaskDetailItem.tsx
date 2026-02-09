import { Text, View, StyleSheet } from "react-native";

import { TaskDetaiItemProps } from "@/models";

import { Colors, Typography } from "@/styles";

export const TaskDetailItem = ({
	title,
	value,
	textColor,
}: TaskDetaiItemProps) => {
	const color = textColor || "primary";

	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			<Text style={[styles.value, { color: Colors.text[color] }]}>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {
		...Typography.subtitle.subtitle2,
		color: Colors.text.contrast,
	},
	value: {
		...Typography.body.body1,
	},
});

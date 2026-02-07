import { memo, useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { getTaskStatus } from "./utils";
import { applyBackground } from "@/utils/pressablesFeedback";
import { numberFormat, dateToString } from "@/utils/textTransform";

import { TaskListItemProps } from "@/models";

import { IconButton } from "@/components";

import { Typography, Colors, Spacing, Buttons } from "@/styles";

const TaskListItem = memo(({ task, onPress, auditTask }: TaskListItemProps) => {
	let { text, color } = getTaskStatus(task);

	const currency = numberFormat({
		options: {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		},
	});

	const handleAuditTask = useCallback(() => {
		auditTask(task.id, {});
	}, [auditTask, task.id]);

	return (
		<Pressable
			style={applyBackground(styles.container)}
			onPress={() => onPress(task)}
		>
			<View style={styles.headerContainer}>
				<View style={styles.headerLeft}>
					<Text style={styles.headerTitleText}>{task.title}</Text>
					<Text style={styles.headerValueText}>{task.location.address}</Text>
				</View>
				{task.status == "available" && (
					<IconButton
						iconName="sync"
						iconSize={24}
						style={styles.button}
						type="brand"
						onPress={handleAuditTask}
					/>
				)}
			</View>
			<View style={styles.footerContainer}>
				<View style={styles.footerItem}>
					<Text style={styles.footerTitleText}>Status</Text>
					<Text style={[styles.footerValueText, { color: Colors.text[color] }]}>
						{text}
					</Text>
				</View>
				<View style={styles.footerItem}>
					<Text style={styles.footerTitleText}>Price</Text>
					<Text style={styles.footerValueText}>
						{currency.format(task.price)}
					</Text>
				</View>
				<View style={styles.footerItem}>
					<Text style={styles.footerTitleText}>Expires at</Text>
					<Text style={styles.footerValueText}>
						{dateToString(task.expires_at)}
					</Text>
				</View>
			</View>
		</Pressable>
	);
});

const styles = StyleSheet.create({
	container: {
		borderRadius: Spacing.radius.md,
		padding: Spacing.spacing.x2,
		justifyContent: "space-between",
		height: 119,
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerLeft: {
		flex: 1,
		flexShrink: 1,
	},
	headerTitleText: {
		...Typography.body.body1,
		color: Colors.text.primary,
	},
	headerValueText: {
		...Typography.overline.overline1,
		color: Colors.text.primary,
	},
	button: {
		...Buttons.standardIconSmall.primary,
		flexShrink: 1,
	},
	footerContainer: {
		flexDirection: "row",
	},
	footerItem: {
		flex: 1,
		flexShrink: 1,
	},
	footerTitleText: {
		...Typography.subtitle.subtitle2,
		color: Colors.text.contrast,
	},
	footerValueText: {
		...Typography.body.body1,
		color: Colors.text.primary,
	},
});

export default TaskListItem;

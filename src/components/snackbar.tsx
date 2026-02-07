import { StyleSheet } from "react-native";

import { useEffect } from "react";
import { Pressable, Text } from "react-native";

import Animated, { FadeOut, FadeInDown } from "react-native-reanimated";

import { SnackbarProps } from "@/models";

import { Spacing, Typography, Colors } from "@/styles";

export const Snackbar = ({
	title,
	showSnackbar,
	setShowSnackbar,
	onDismiss,
}: SnackbarProps) => {
	const AnimatedPressabe = Animated.createAnimatedComponent(Pressable);

	const hide = () => {
		setShowSnackbar(false);

		if (onDismiss) onDismiss();
	};

	useEffect(() => {
		if (showSnackbar) {
			const timeout = setTimeout(hide, 1500);
			return () => clearTimeout(timeout);
		}
	}, [showSnackbar]);

	if (!showSnackbar) return null;

	return (
		<AnimatedPressabe
			style={styles.container}
			onPress={hide}
			entering={FadeInDown}
			exiting={FadeOut}
		>
			<Text style={styles.title}>{title}</Text>
		</AnimatedPressabe>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingLeft: Spacing.spacing.x4,
		paddingRight: Spacing.spacing.x2,
		paddingVertical: Spacing.spacing.x2,
		marginHorizontal: Spacing.spacing.x4,
		borderRadius: Spacing.radius.sm,
		backgroundColor: Colors.surface.invert,
		bottom: Spacing.spacing.x7,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		position: "absolute",
		left: 0,
		right: 0,
		minHeight: 48,
	},
	title: {
		...Typography.caption.caption2,
		color: Colors.text.contrast,
		flexShrink: 1,
	},
});

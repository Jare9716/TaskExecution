import { Pressable, Text, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { applyOpacity } from "@/utils/pressablesFeedback";

import { ButtonProps, IconButtonProps, TextButtonProps } from "@/models";

import { Typography, Colors } from "@/styles";

export function FilledButton({ title, onPress, style, iconName }: ButtonProps) {
	return (
		<Pressable style={applyOpacity(style)} onPress={onPress}>
			{iconName && (
				<MaterialIcons
					name={iconName}
					size={24}
					color={Colors.iconColor.onBrand}
				/>
			)}
			<Text style={styles.filledButtonText}>{title}</Text>
		</Pressable>
	);
}

export function IconButton({
	iconName,
	iconSize,
	style,
	type,
	onPress,
}: IconButtonProps) {
	return (
		<Pressable style={applyOpacity(style)} onPress={onPress}>
			<MaterialIcons
				name={iconName}
				size={iconSize}
				color={Colors.iconColor[type]}
			/>
		</Pressable>
	);
}

export function TextButton({ title, onPress }: TextButtonProps) {
	return (
		<Pressable style={applyOpacity(styles.textButtonHandler)} onPress={onPress}>
			<Text style={styles.textButtonText}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	filledButtonText: {
		...Typography.button.button1,
		color: Colors.text.invert,
	},
	textButtonHandler: {
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	textButtonText: {
		...Typography.button.button2,
		color: Colors.text.tertiary,
	},
});

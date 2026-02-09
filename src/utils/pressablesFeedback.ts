import { ViewStyle, PressableStateCallbackType, StyleProp } from "react-native";

import { PressableStyle } from "@/models";

import { Colors } from "@/styles";

const backgroundColor = (state: PressableStateCallbackType): ViewStyle => {
	const backgroundColor = state.pressed
		? Colors.surface.tertiary
		: Colors.surface.primary;
	return { backgroundColor };
};

const opacityValue = (state: PressableStateCallbackType): ViewStyle => {
	const opacity = state.pressed ? 0.84 : 1;
	return { opacity };
};

/**
 * Hight order function that takes the pressable state and returns a style object with the backgroundColor property.
 * Returns a function that takes the pressable state and returns a style object.
 */
export const applyBackground = (style: PressableStyle) => {
	return (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
		const base = typeof style === "function" ? style(state) : style;

		return [base, backgroundColor(state)];
	};
};

/**
 * Hight order function that takes the pressable state and returns a style object with the opacity property.
 * Returns a function that takes the pressable state and returns a style object.
 */
export const applyOpacity = (style: PressableStyle) => {
	return (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
		const base = typeof style === "function" ? style(state) : style;

		return [base, opacityValue(state)];
	};
};

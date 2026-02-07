import { ViewStyle, PressableStateCallbackType, StyleProp } from "react-native";

export type PressableStyle =
	| StyleProp<ViewStyle>
	| ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);

export type NumberFormatProps = {
	options?: Intl.NumberFormatOptions;
};

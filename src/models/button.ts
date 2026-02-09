import { ViewStyle } from "react-native";

import { MaterialIconName } from "./icon";
import { IconColor } from "./styles";

export type ButtonProps = {
	title: string;
	onPress: () => void;
	style: ViewStyle;
	iconName?: MaterialIconName;
};

export type IconButtonProps = {
	iconName: MaterialIconName;
	iconSize: number;
	style: ViewStyle;
	type: IconColor;
	onPress?: () => void;
};

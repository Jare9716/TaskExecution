import { ViewStyle } from "react-native";

import { Filled, StandardIcon } from "@/models";

import * as Colors from "./colors";
import * as Spacing from "./spacing";

const filledBase: ViewStyle = {
	borderRadius: Spacing.radius.xxl,
	gap: Spacing.spacing.x2,
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "row",
};

const standardIconBase: ViewStyle = {
	borderRadius: Spacing.radius.xxl,
	justifyContent: "center",
	alignItems: "center",
};

export const filledLarge: Record<Filled, ViewStyle> = {
	primary: {
		backgroundColor: Colors.buttonColor.primary,
		paddingHorizontal: Spacing.spacing.x5,
		...filledBase,
		height: 48,
	},
};

export const filledSmall: Record<Filled, ViewStyle> = {
	primary: {
		backgroundColor: Colors.buttonColor.primary,
		paddingHorizontal: Spacing.spacing.x4,
		...filledBase,
		height: 40,
	},
};

export const standardIconSmall: Record<StandardIcon, ViewStyle> = {
	primary: {
		...standardIconBase,
		height: 40,
		width: 40,
	},
};

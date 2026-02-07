import { ViewStyle } from "react-native";

import { Spacing, Radius, Shadow } from "@/models";

export const spacing: Record<Spacing, number> = {
	x1: 4,
	x2: 8,
	x3: 12,
	x4: 16,
	x5: 24,
	x6: 32,
	x7: 40,
};

export const radius: Record<Radius, number> = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 32,
	xl: 128,
	xxl: 360,
};

export const shadow: Record<Shadow, ViewStyle> = {
	base: {
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 2,
	},
};

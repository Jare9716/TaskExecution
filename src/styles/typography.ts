import { TextStyle } from "react-native";

import { Headline, Subtitle, Body, Button, Caption, Overline } from "@/models";

export const headline: Record<Headline, TextStyle> = {
	headline4: {
		fontWeight: "400",
		fontSize: 34,
		lineHeight: 41,
		letterSpacing: 0.25,
	},
	headline5: {
		fontWeight: "400",
		fontSize: 24,
		lineHeight: 29,
		letterSpacing: 0.25,
	},
	headline6: {
		fontWeight: "600",
		fontSize: 20,
		lineHeight: 24,
		letterSpacing: 0.15,
	},
};

export const subtitle: Record<Subtitle, TextStyle> = {
	subtitle1: {
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.15,
	},
	subtitle2: {
		fontWeight: "600",
		fontSize: 14,
		lineHeight: 19,
		letterSpacing: 0.1,
	},
};

export const body: Record<Body, TextStyle> = {
	body1: {
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.5,
	},
	body2: {
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.25,
	},
};

export const button: Record<Button, TextStyle> = {
	button1: {
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 1.25,
	},
};

export const caption: Record<Caption, TextStyle> = {
	caption1: {
		fontWeight: "400",
		fontSize: 16,
		lineHeight: 19,
		letterSpacing: 0.4,
	},
	caption2: {
		fontWeight: "600",
		fontSize: 14,
		lineHeight: 19,
		letterSpacing: 0.15,
	},
};

export const overline: Record<Overline, TextStyle> = {
	overline1: {
		fontWeight: "400",
		fontSize: 10,
		lineHeight: 12,
		letterSpacing: 1.5,
	},
};

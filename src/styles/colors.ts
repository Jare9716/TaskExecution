import {
	Neutral,
	Blue,
	Green,
	Yellow,
	Text,
	Surface,
	Border,
	IconColor,
	ButtonColor,
	ChipColor,
	ItemListColor,
	Transparent,
} from "@/models";

const neutral: Record<Neutral, string> = {
	s0: "#FFFFFF",
	s50: "#F2F2F7",
	s100: "#999999",
	s800: "#3C3C43",
	s900: "#202020",
	s1000: "#000000",
};

const blue: Record<Blue, string> = {
	s50: "#EAEFF7",
	s200: "#4985E8",
	s600: "#007AFF",
	s800: "#174291",
};

const green: Record<Green, string> = {
	s600: "#3CB371",
};

const yellow: Record<Yellow, string> = {
	s600: "#FFC107",
};

export const text: Record<Text, string> = {
	primary: neutral.s1000,
	secondary: neutral.s800,
	tertiary: blue.s600,
	contrast: neutral.s0,
};

export const surface: Record<Surface, string> = {
	primary: neutral.s0,
	secondary: blue.s800,
	tertiary: blue.s50,
	invert: neutral.s900,
};

export const border: Record<Border, string> = {
	primary: blue.s50,
	secondary: neutral.s0,
};

export const iconColor: Record<IconColor, string> = {
	primary: neutral.s0,
	secondary: blue.s800,
};

export const buttonColor: Record<ButtonColor, string> = {
	primary: green.s600,
	secondary: blue.s50,
	tertiary: blue.s800,
	onSecondary: blue.s200,
};

export const chipColor: Record<ChipColor, string> = {
	primary: blue.s800,
	secondary: neutral.s100,
	tertiary: green.s600,
};

export const itemListColor: Record<ItemListColor, string> = {
	synced: green.s600,
	pending: yellow.s600,
	available: green.s600,
};

export const transparent: Record<Transparent, string> = {
	darkGray: "rgba(0, 0, 0, 0.5)",
};

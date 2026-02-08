import {
	Neutral,
	Blue,
	Green,
	Yellow,
	Red,
	Text,
	Surface,
	Border,
	IconColor,
	ButtonColor,
	ChipColor,
	Transparent,
} from "@/models";

const neutral: Record<Neutral, string> = {
	s0: "#FFFFFF",
	s25: "#FCFCFC",
	s50: "#F7F7F7",
	s100: "#E8E8E8",
	s600: "#979797",
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

const red: Record<Red, string> = {
	s700: "#D73726",
};

export const text: Record<Text, string> = {
	primary: neutral.s1000,
	secondary: neutral.s800,
	tertiary: blue.s800,
	contrast: neutral.s600,
	invert: neutral.s0,
	success: green.s600,
	warning: yellow.s600,
	error: red.s700,
};

export const surface: Record<Surface, string> = {
	primary: neutral.s0,
	secondary: blue.s50,
	tertiary: neutral.s25,
};

export const border: Record<Border, string> = {
	primary: blue.s50,
	secondary: neutral.s100,
};

export const iconColor: Record<IconColor, string> = {
	primary: neutral.s50,
	secondary: neutral.s900,
	onPrimary: neutral.s800,
	onBrand: neutral.s0,
	brand: blue.s800,
};

export const buttonColor: Record<ButtonColor, string> = {
	primary: blue.s800,
	secondary: blue.s50,
	onSecondary: blue.s200,
};

export const chipColor: Record<ChipColor, string> = {
	primary: blue.s800,
	secondary: neutral.s100,
	tertiary: green.s600,
};

export const transparent: Record<Transparent, string> = {
	darkGray: "rgba(0, 0, 0, 0.5)",
};

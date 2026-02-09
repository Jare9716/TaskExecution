import { Alert } from "react-native";

export const simpleAlert = (tittle: string, message: string) => {
	Alert.alert(tittle, message, [
		{
			text: "OK",
			style: "cancel",
		},
	]);
};

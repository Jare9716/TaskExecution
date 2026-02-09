import { Alert } from "react-native";

export function simpleAlert(tittle: string, message: string) {
	Alert.alert(tittle, message, [
		{
			text: "Cerrar",
			style: "cancel",
		},
	]);
}

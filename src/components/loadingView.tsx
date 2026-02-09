import { View, ActivityIndicator, StyleSheet } from "react-native";

import { LoadingViewProps } from "@/models";

import { Colors } from "@/styles";

export const LoadingView = ({ children, loading }: LoadingViewProps) => {
	return (
		<>
			{children}
			{loading && (
				<View style={styles.loadingViewContainer}>
					<ActivityIndicator size="large" color={Colors.iconColor.brand} />
				</View>
			)}
		</>
	);
};

export const styles = StyleSheet.create({
	loadingViewContainer: {
		backgroundColor: Colors.transparent.darkGray,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		position: "absolute",
	},
});

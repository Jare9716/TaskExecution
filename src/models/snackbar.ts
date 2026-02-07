export type SnackbarProps = {
	title: string;
	showSnackbar: boolean;
	setShowSnackbar: (value: boolean) => void;
	onDismiss?: () => void;
};

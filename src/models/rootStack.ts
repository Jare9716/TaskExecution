export type RootStackParamList = {
	Debug: undefined;
	TaskList: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

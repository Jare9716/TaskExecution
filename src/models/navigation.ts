export type RootStackParamList = {
	TaskDetail: { taskId: string };
	TaskList: undefined;
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

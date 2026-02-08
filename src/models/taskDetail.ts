import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "./navigation";

export type TaskDetailScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"TaskDetail"
>;

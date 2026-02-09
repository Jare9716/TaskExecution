import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Task } from "./task";
import { Text } from "./styles";

import { RootStackParamList } from "./navigation";

export type TaskDetailScreenProps = NativeStackScreenProps<
	RootStackParamList,
	"TaskDetail"
>;

export type TaskDetailsProps = {
	task: Task;
};

export type TaskDetaiItemProps = {
	title: string;
	value: string;
	textColor?: Text;
};

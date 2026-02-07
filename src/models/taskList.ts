import { Task } from "./task";

export type TaskListItemProps = {
	task: Task;
	onPress: (task: Task) => void;
};

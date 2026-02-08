import { Task, TaskAuditData } from "./task";

export type TaskListItemProps = {
	task: Task;
	onPress: (task: Task) => void;
	auditTask: (taskId: string, data: TaskAuditData) => void;
};

export type TaskRecapCardProps = {
	tasks: Task[];
	syncing: boolean;
};

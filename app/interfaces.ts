export interface Action {
  type: string;
  data: any;
}

export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export interface TasksState {
  tasks: Task[];
}

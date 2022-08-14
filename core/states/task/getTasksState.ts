export type TasksView = {
  index: number
  name: string
  description: string
}

export class GetTasksState {
  tasks: TasksView[] = []
}

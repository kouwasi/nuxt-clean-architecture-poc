export class TasksView {
  index: number
  name: string
  description: string

  constructor(index: number, name: string, description: string) {
    this.index = index
    this.name = name
    this.description = description
  }
}

export class GetTasksState {
  tasks: TasksView[] = []
}

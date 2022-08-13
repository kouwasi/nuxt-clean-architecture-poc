import { Task } from "~/core/entities/task";

export class GetTasksRequest {
  after?: number

  constructor(after?: number) {
    this.after = after
  }
}

export class GetAllTasksResult {
  tasks: Task[]

  constructor(tasks: Task[]) {
    this.tasks = tasks
  }
}

export interface GetTasksUseCase {
  getAll(request: GetTasksRequest): void
}

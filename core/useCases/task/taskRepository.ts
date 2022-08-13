import { Task } from "~/core/entities/task";
import {GetTasksRequest} from "~/core/useCases/task/getTasksUseCase";

export interface TaskRepository {
  getAll(request: GetTasksRequest): Task[]
  getAfter(index: number): Task[]
  create(task: Task): void
}

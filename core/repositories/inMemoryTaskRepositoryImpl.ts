import {TaskRepository} from "~/core/useCases/task/taskRepository";
import {Task} from "~/core/entities/task";
import {GetTasksRequest} from "~/core/useCases/task/getTasksUseCase";

export class InMemoryTaskRepositoryImpl implements TaskRepository {
  private tasks: Task[] = []

  getAll({ after }: GetTasksRequest): Task[] {
    if (after != null) {
      return this.tasks.slice(after)
    } else {
      return this.tasks
    }
  }

  getAfter(index: number): Task[] {
    return this.tasks.splice(index)
  }

  create(task: Task): void {
    this.tasks.push(task)
  }
}

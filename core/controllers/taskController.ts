import {CreateTaskRequest, CreateTaskUseCase} from "~/core/useCases/task/createTaskUseCase";
import {GetTasksRequest, GetTasksUseCase} from "~/core/useCases/task/getTasksUseCase";

export class TaskController {
  private createTaskUseCase: CreateTaskUseCase
  private getTasksUseCase: GetTasksUseCase

  constructor(createTaskUseCase: CreateTaskUseCase, getTasksUserCase: GetTasksUseCase) {
    this.createTaskUseCase = createTaskUseCase
    this.getTasksUseCase = getTasksUserCase
  }

  getAll(after?: number) {
    const request = new GetTasksRequest(after)
    this.getTasksUseCase.getAll(request)
  }

  create(name: string, description: string) {
    const request = new CreateTaskRequest(name, description)
    this.createTaskUseCase.create(request)
  }
}

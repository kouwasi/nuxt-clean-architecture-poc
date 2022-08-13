import {CreateTaskRequest, CreateTaskUseCase} from "~/core/useCases/task/createTaskUseCase";

export class TaskController {
  private createTaskUseCase: CreateTaskUseCase

  constructor(createTaskUseCase: CreateTaskUseCase) {
    this.createTaskUseCase = createTaskUseCase
  }

  create(name: string, description: string) {
    const request = new CreateTaskRequest(name, description)
    this.createTaskUseCase.create(request)
  }
}

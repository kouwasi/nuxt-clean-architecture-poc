import {CreateTaskRequest, CreateTaskUseCase} from "~/core/useCases/task/createTaskUseCase";
import {TaskRepository} from "~/core/useCases/task/taskRepository";
import {CreateTaskPresenter} from "~/core/useCases/task/createTaskPresenter";
import {Task} from "~/core/entities/task";

export class CreateTaskInteractor implements CreateTaskUseCase {
  private repository: TaskRepository
  private presenter: CreateTaskPresenter

  constructor(repository: TaskRepository, presenter: CreateTaskPresenter) {
    this.repository = repository
    this.presenter = presenter
  }

  create(request: CreateTaskRequest) {
    if (request.name.length > 10) {
      this.presenter.setError('名前は10文字未満で指定してください。')
      return
    } else {
      this.presenter.clearError()
      const task = new Task(request.name, request.description)
      this.repository.create(task)
    }
  }
}

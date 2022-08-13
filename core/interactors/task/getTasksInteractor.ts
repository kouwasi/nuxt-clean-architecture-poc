import {GetAllTasksResult, GetTasksRequest, GetTasksUseCase} from "~/core/useCases/task/getTasksUseCase";
import {TaskRepository} from "~/core/useCases/task/taskRepository";
import {GetTasksPresenter} from "~/core/useCases/task/getTasksPresenter";

export class GetTasksInteractor implements GetTasksUseCase {
  private repository: TaskRepository
  private presenter: GetTasksPresenter

  constructor(repository: TaskRepository, presenter: GetTasksPresenter) {
    this.repository = repository
    this.presenter = presenter
  }

  getAll(request: GetTasksRequest) {
    const tasks = this.repository.getAll(request)
    const output = new GetAllTasksResult(tasks)

    this.presenter.putAll(output)
  }
}

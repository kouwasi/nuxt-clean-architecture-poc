import {GetTasksPresenter} from "~/core/useCases/task/getTasksPresenter";
import {GetTasksState, TasksView} from "~/core/states/task/getTasksState";
import {GetAllTasksResult} from "~/core/useCases/task/getTasksUseCase";

export class GetTasksPresenterImpl implements GetTasksPresenter {
  readonly state: GetTasksState

  constructor(state: GetTasksState) {
    this.state = state
  }

  putAll(result: GetAllTasksResult) {
    this.state.tasks = result.tasks.map((task, index) => {
      return new TasksView(index, task.name, task.description)
    })
  }
}

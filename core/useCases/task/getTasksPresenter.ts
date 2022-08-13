import {GetAllTasksResult} from "~/core/useCases/task/getTasksUseCase";
import {GetTasksState} from "~/core/states/task/getTasksState";

export interface GetTasksPresenter {
  readonly state: GetTasksState

  putAll(tasks: GetAllTasksResult): void
}

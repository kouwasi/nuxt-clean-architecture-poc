import {CreateTaskState} from "~/core/states/task/createTaskState";

export interface CreateTaskPresenter {
  readonly state: CreateTaskState

  setError(error: string): void
  clearError(): void
}

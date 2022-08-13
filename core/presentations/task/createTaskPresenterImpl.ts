import {CreateTaskPresenter} from "~/core/useCases/task/createTaskPresenter";
import {CreateTaskState} from "~/core/states/task/createTaskState";

export class CreateTaskPresenterImpl implements CreateTaskPresenter {
  readonly state: CreateTaskState;

  constructor(state: CreateTaskState) {
    this.state = state
  }

  setError(error: string): void {
    this.state.error = error
  }

  clearError(): void {
    this.state.error = null
  }
}

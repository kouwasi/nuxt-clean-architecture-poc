import {defineNuxtPlugin, onGlobalSetup, InjectionKey, provide, reactive} from "@nuxtjs/composition-api";
import {TaskRepository} from "~/core/useCases/task/taskRepository";
import {GetTasksUseCase} from "~/core/useCases/task/getTasksUseCase";
import {GetTasksPresenter} from "~/core/useCases/task/getTasksPresenter";
import {GetTasksState} from "~/core/states/task/getTasksState";
import {CreateTaskUseCase} from "~/core/useCases/task/createTaskUseCase";
import {CreateTaskPresenter} from "~/core/useCases/task/createTaskPresenter";
import {CreateTaskState} from "~/core/states/task/createTaskState";
import {InMemoryTaskRepositoryImpl} from "~/core/repositories/inMemoryTaskRepositoryImpl";
import {GetTasksPresenterImpl} from "~/core/presentations/task/getTasksPresenterImpl";
import {GetTasksInteractor} from "~/core/interactors/task/getTasksInteractor";
import {CreateTaskPresenterImpl} from "~/core/presentations/task/createTaskPresenterImpl";
import {CreateTaskInteractor} from "~/core/interactors/task/createTaskInteractor";
import {TaskController} from "~/core/controllers/taskController";

export const Keys: {
  TaskRepository: InjectionKey<TaskRepository>
  GetTasksUseCase: InjectionKey<GetTasksUseCase>
  GetTasksPresenter: InjectionKey<GetTasksPresenter>
  GetTasksState: InjectionKey<GetTasksState>
  CreateTaskUseCase: InjectionKey<CreateTaskUseCase>
  CreateTaskPresenter: InjectionKey<CreateTaskPresenter>
  CreateTaskState: InjectionKey<CreateTaskState>
  TaskController: InjectionKey<TaskController>
} = {
  TaskRepository: Symbol('TaskRepository'),
  GetTasksUseCase: Symbol('GetTasksUseCase'),
  GetTasksPresenter: Symbol('GetTasksPresenter'),
  GetTasksState: Symbol(GetTasksState.name),
  CreateTaskUseCase: Symbol('CreateTaskUseCase'),
  CreateTaskPresenter: Symbol('CreateTaskPresenter'),
  CreateTaskState: Symbol(CreateTaskState.name),
  TaskController: Symbol(TaskController.name)
}

export default defineNuxtPlugin(() => {
  onGlobalSetup(() => {
    const repository = new InMemoryTaskRepositoryImpl()
    provide(Keys.TaskRepository, repository)

    const getTasksState = reactive(new GetTasksState())
    const getTasksPresenter = new GetTasksPresenterImpl(getTasksState)
    provide(Keys.GetTasksState, getTasksState)
    provide(Keys.GetTasksPresenter, getTasksPresenter)
    provide(Keys.GetTasksUseCase, new GetTasksInteractor(repository, getTasksPresenter))

    const createTaskState = reactive(new CreateTaskState())
    const createTaskPresenter = new CreateTaskPresenterImpl(createTaskState)
    provide(Keys.CreateTaskState, createTaskState)
    provide(Keys.CreateTaskPresenter, createTaskPresenter)
    const useCase = new CreateTaskInteractor(repository, createTaskPresenter)
    provide(Keys.CreateTaskUseCase, useCase)
    provide(Keys.TaskController, new TaskController(useCase))
  })
})

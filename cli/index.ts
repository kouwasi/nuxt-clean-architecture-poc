import {InMemoryTaskRepositoryImpl} from "~/core/repositories/inMemoryTaskRepositoryImpl";
import {GetTasksState} from "~/core/states/task/getTasksState";
import {GetTasksPresenterImpl} from "~/core/presentations/task/getTasksPresenterImpl";
import {GetTasksInteractor} from "~/core/interactors/task/getTasksInteractor";
import {CreateTaskState} from "~/core/states/task/createTaskState";
import {CreateTaskPresenterImpl} from "~/core/presentations/task/createTaskPresenterImpl";
import {CreateTaskInteractor} from "~/core/interactors/task/createTaskInteractor";
import {TaskController} from "~/core/controllers/taskController";
const prompts = require('prompts')

const repository = new InMemoryTaskRepositoryImpl()
const getTasksState = new GetTasksState()
const getTasksPresenter = new GetTasksPresenterImpl(getTasksState)
const getTasksUseCase = new GetTasksInteractor(repository, getTasksPresenter)
const createTaskState = new CreateTaskState()
const createTaskPresenter = new CreateTaskPresenterImpl(createTaskState)
const createTaskUseCase = new CreateTaskInteractor(repository, createTaskPresenter)
const controller = new TaskController(createTaskUseCase, getTasksUseCase)

const showPrompt = (async () => {
  const response = await prompts([
    {
      type: 'select',
      name: 'action',
      message: 'Choose action',
      choices: [
        { title: 'list', value: 'list' },
        { title: 'create', value: 'create' },
        { title: 'quit', value: 'quit' }
      ]
    },
    {
      // @ts-ignore
      type: prev => (prev == 'list' ? 'text' : null),
      name: 'after',
      message: 'after?'
    },
    {
      // @ts-ignore
      type: (_prev, values) => (values.action == 'create' ? 'text' : null),
      name: 'name',
      message: 'name'
    },
    {
      // @ts-ignore
      type: (_prev, values) => (values.action == 'create' ? 'text' : null),
      name: 'description',
      message: 'description'
    }
  ])

  switch (response.action!!) {
    case 'list':
      controller.getAll(response.after)
      getTasksState.tasks.forEach((task) => {
        console.table({ index: task.index, name: task.name, description: task.description })
      })
      break;
    case 'create':
      controller.create(response.name, response.description)
      if (createTaskState.error != null) {
        console.error(createTaskState.error)
      } else {
        console.log('Created!')
      }
      break;
    case 'quit':
      process.exit()
  }

  await showPrompt()
});

(async () => {
  await showPrompt()
})();

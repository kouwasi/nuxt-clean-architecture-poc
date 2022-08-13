<template>
  <div>
    <form @submit.prevent="fetch">
      <div>
        <label>N個以降</label>
        <input type="number" v-model="filterState.after">
      </div>

      <button>絞り込み</button>
    </form>

    <div v-for="task in tasksState.tasks" :key="task.index">
      <div style="margin-top: 4px">
        <div>index: {{ task.index }}</div>
        <div>name: {{ task.name }}</div>
        <div>description: {{ task.description }}</div>
      </div>
    </div>

    <form @submit.prevent="onCreate">
      <div>
        <label>name</label>
        <input type="text" v-model="formState.name">
      </div>
      <div>
        <label>description</label>
        <input type="text" v-model="formState.description">
      </div>
      <div style="color: red">{{ createTaskState.error }}</div>
      <button>作成</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, reactive} from "@nuxtjs/composition-api";
import {Keys} from "~/plugins/dependencyInjector";
import {GetTasksRequest} from "~/core/useCases/task/getTasksUseCase";

export default defineComponent({
  setup() {
    const taskController = inject(Keys.TaskController)!!
    const useCase = inject(Keys.GetTasksUseCase)!!
    const tasksState = inject(Keys.GetTasksState)!!
    const createTaskState = inject(Keys.CreateTaskState)!!
    const initialState = {
      name: '',
      description: ''
    }
    const formState = reactive({ ...initialState })
    const filterState = reactive({ after: undefined })

    const fetch = () => {
      useCase.getAll(new GetTasksRequest(filterState.after))
    }

    const onCreate = () => {
      taskController.create(formState.name, formState.description)

      if (createTaskState.error == null) {
        Object.assign(formState, initialState)
        fetch()
      }
    }

    return { tasksState, createTaskState, fetch, onCreate, formState, filterState }
  }
})
</script>

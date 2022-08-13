<template>
  <div>
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
        <input type="text" v-model="name">
      </div>
      <div>
        <label>description</label>
        <input type="text" v-model="description">
      </div>
      <div style="color: red">{{ createTaskState.error }}</div>
      <button>作成</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, reactive, toRefs} from "@nuxtjs/composition-api";
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

    const onCreate = () => {
      taskController.create(formState.name, formState.description)

      if (createTaskState.error == null) {
        Object.assign(formState, initialState)
        useCase.getAll(new GetTasksRequest())
      }
    }

    return { tasksState, createTaskState, onCreate, ...toRefs(formState) }
  }
})
</script>

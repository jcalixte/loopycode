<script setup lang="ts">
import EstimationTimeArrival from '@/components/EstimationTimeArrival.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Stepable } from '../interfaces/stepable'
import type { Taskable } from '../interfaces/taskable'
import { Task } from '../models/task'
import { useTaskStore } from '../stores/useTask.store'
import StepInput from './StepInput.vue'

const store = useTaskStore()
const router = useRouter()
const props = defineProps<{ id: string; initialTask?: Taskable }>()
const id = computed(() => props.id)

const steps = ref<Stepable[]>(props.initialTask?.steps ?? [])

const title = ref(props.initialTask?.title ?? '')
const link = ref(props.initialTask?.link ?? '')

const totalEstimation = computed(() =>
  steps.value.map((step) => step.estimation).reduce((a, b) => a + b, 0)
)

const saveTask = () => {
  const task = new Task(id.value, title.value)
  if (link.value) {
    task.link = link.value
  }
  task.addSteps(...steps.value)

  if (Task.validate(task)) {
    store.saveTask(task)
    router.push({
      name: 'task-view',
      params: {
        id: id.value
      }
    })
  }

  return false
}
</script>

<template>
  <div class="task-form columns is-centered">
    <div class="column is-half">
      <h1 class="title">Create a task</h1>
      <h2 class="subtitle">
        <estimation-time-arrival :estimation="totalEstimation" />
      </h2>
      <form @submit.prevent="saveTask">
        <div class="field">
          <label class="label" for="title">Title</label>
          <div class="control">
            <input class="input" type="text" id="title" v-model="title" />
          </div>
        </div>
        <div class="field">
          <label class="label" for="link">User story link</label>
          <div class="control">
            <input class="input" type="text" id="link" v-model="link" />
          </div>
        </div>
        <step-input v-model="steps" />
        <div class="columns is-centered">
          <div class="column is-one-third">
            <button class="button is-primary is-fullwidth" type="submit">
              save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-form {
  form {
    padding: 1rem 0;
  }
}
</style>

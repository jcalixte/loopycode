import { formatDiffInMinutes } from '@/shared/format-date'
import { computed, isRef, type Ref } from 'vue'
import type { TaskRecord } from '../models/task-record'

export const useTaskRecordMetadata = (
  record: TaskRecord | Ref<TaskRecord | null>
) => {
  const taskDurations = computed(() => {
    const recordValue = isRef(record) ? record.value : record

    if (!recordValue?.end) {
      return []
    }

    const finishedTaskDurations = Object.values(recordValue.stepRecords)
      .filter((record) => !!record.end)
      .map((record) => formatDiffInMinutes(record.start, record.end!))

    return finishedTaskDurations
  })

  const duration = computed(() => {
    return taskDurations.value.reduce((a, b) => a + b, 0)
  })

  return {
    duration
  }
}

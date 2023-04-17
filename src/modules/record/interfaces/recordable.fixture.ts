import { toISODate } from '@/shared/types/date'
import { faker } from '@faker-js/faker'
import type { Recordable } from './recordable'

export const createRecordableFixture = (
  partialRecordable?: Partial<Recordable>
): Recordable => ({
  taskId: partialRecordable?.taskId ?? faker.datatype.uuid(),
  notes: partialRecordable?.notes ?? faker.lorem.paragraph(),
  start: partialRecordable?.start ?? toISODate(faker.datatype.datetime()),
  breakTime: partialRecordable?.breakTime ?? undefined,
  stepRecords: partialRecordable?.stepRecords ?? {
    [faker.datatype.uuid()]: {
      start: toISODate(faker.datatype.datetime())
    }
  }
})
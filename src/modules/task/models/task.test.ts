import type { Taskable } from '@/modules/task/interfaces/taskable'
import { fixtureStep } from '@/modules/task/models/step.fixture'
import { Task } from '@/modules/task/models/task'
import { toISODate } from '@/shared/types/date'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from 'vitest'

describe('Task', () => {
  it('has a simple id', () => {
    const uuid = faker.datatype.uuid()

    const task = new Task(uuid, faker.animal.bear())

    expect(task.id).equals(uuid)
  })

  it('allows a new task from a taskable object', () => {
    const taskable: Taskable = {
      id: faker.datatype.uuid(),
      date: toISODate(faker.date.recent()),
      title: faker.animal.lion(),
      link: faker.internet.url(),
      steps: [fixtureStep()]
    }
    const task = Task.fromTaskable(taskable)

    expect(task).toEqual(taskable)
  })

  it('adds steps and removes them', () => {
    const task = new Task(faker.datatype.uuid(), faker.color.human())

    const [firstStep, secondStep] = [fixtureStep(), fixtureStep()]

    task.addSteps(firstStep, secondStep)

    expect(task.steps).toEqual([firstStep, secondStep])

    task.removeStep(0)
    expect(task.steps).toEqual([secondStep])

    task.removeStep(0)
    expect(task.steps).toEqual([])
  })

  it('must have an id, a title and steps to be valid', () => {
    const task = new Task(faker.datatype.uuid(), faker.color.human())
    expect(Task.validate(task)).toEqual(false)

    task.addSteps(fixtureStep())
    expect(Task.validate(task)).toEqual(true)
  })

  it('calculates the total estimation of steps', () => {
    const task = new Task(faker.datatype.uuid(), faker.color.human())

    task.addSteps(
      fixtureStep({ estimation: 1 }),
      fixtureStep({ estimation: 2 }),
      fixtureStep({ estimation: 3 })
    )

    expect(task.totalEstimation).toEqual(6)
  })
})

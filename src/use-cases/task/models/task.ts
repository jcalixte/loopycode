import type { Stepable } from '@/use-cases/task/interfaces/stepable'
import type { Taskable } from '@/use-cases/task/interfaces/taskable'
import { Step } from '@/use-cases/task/models/step'

export class Task implements Taskable {
  public steps: Step[] = []
  public link: string | null = null

  constructor(public readonly id: string, public readonly title: string) {}

  public addSteps(...steps: Stepable[]) {
    this.steps.push(...Step.fromStepable(...steps))
    return this
  }

  public removeStep(index: number) {
    if (index < 0) {
      return this
    }

    if (index >= this.steps.length) {
      return this
    }

    this.steps.splice(index, 1)
    return this
  }

  public get totalEstimation() {
    return this.steps.map((step) => step.estimation).reduce((a, b) => a + b, 0)
  }

  public static fromTaskable(taskable: Taskable) {
    const task = new Task(taskable.id, taskable.title)
    task.link = taskable.link
    task.addSteps(...taskable.steps)

    return task
  }

  public static validate(task: Taskable) {
    return !!task.id && !!task.title && task.steps.length > 0
  }
}

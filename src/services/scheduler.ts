import type ScheduledTask from '../types/ScheduledTask.d'

// List of scheduled tasks.
const tasks: ScheduledTask[] = []

/**
 * Add a task to the scheduler.
 *
 * @param task The task to add.
 */
export const addTask = (task: ScheduledTask) => tasks.push(task)

/**
 * Schedule all unscheduled tasks.
 *
 * @param startup Whether the scheduler is being started up.
 */
export const scheduleTasks = (startup: boolean) => {
  Promise.all(
    tasks.map((task) => {
      if (startup && task.onStartup) setTimeout(() => runTask(task), task.startupOffset)
      else if (!task.timeoutId) task.timeoutId = setTimeout(() => runTask(task), task.interval)
    })
  )
}

/**
 * Run a task.
 *
 * @param task The task to run.
 */
const runTask = (task: ScheduledTask) => {
  // Check if tasks are disabled.
  if (process.env.DISABLE_SCHEDULED_TASKS === 'true') return

  // Clear the timeout ID.
  clearTimeout(task.timeoutId)
  task.timeoutId = undefined

  // Run the task.
  task
    .task()
    .then(() => taskSuccess(task))
    .catch(() => taskFailed(task))
}

/**
 * Task ran successfully.
 *
 * @param task The task that ran.
 */
const taskSuccess = (task: ScheduledTask) => (task.timeoutId = setTimeout(() => runTask(task), task.interval))

/**
 * Task failed to run.
 *
 * @param task The task that failed.
 */
const taskFailed = (task: ScheduledTask) => {
  console.error(`Task ${task.name} failed to run.`)
  task.timeoutId = setTimeout(() => runTask(task), task.retryInterval)
}

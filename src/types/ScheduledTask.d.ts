export default interface ScheduledTask {
  name: string
  interval: number
  onStartup: boolean
  startupOffset: number
  retryInterval: number
  task: () => Promise<any>
  timeoutId?: NodeJS.Timeout
}

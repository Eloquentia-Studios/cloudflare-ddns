import { toast } from '@zerodevx/svelte-toast'

export const showLoadingToast = (message: string): number => toast.push(message, { initial: 0, dismissable: false })

export const setSuccessToast = (id: number, message: string): void =>
  toast.set(id, {
    msg: message,
    duration: 300,
    dismissable: true,
    next: 1,
    theme: {
      '--toastBackground': '#4daa4f',
      '--toastProgressBackground': '#78d075'
    }
  })

export const setErrorToast = (id: number, message: string): void =>
  toast.set(id, {
    msg: message,
    duration: 300,
    dismissable: true,
    next: 1,
    theme: {
      '--toastBackground': '#ff4d4f',
      '--toastProgressBackground': '#ff7875'
    }
  })

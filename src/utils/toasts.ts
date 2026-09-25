import { toast } from 'react-toastify'

export function showSuccessToast(msg: string) {
  toast.success(msg, { position: 'top-left' })
}

/** Accepts anything a `.catch()` hands over, so callers can pass errors straight in. */
export function showErrorToast(error: unknown) {
  let msg = 'Sorry, something went wrong'
  if (typeof error === 'string')
    msg = error
  else if (error instanceof Error)
    msg = error.message

  toast.error(msg, { position: 'top-left' })
}

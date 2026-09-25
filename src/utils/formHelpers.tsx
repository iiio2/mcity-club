import type { FormikProps } from 'formik'
import { FormHelperText } from '@mui/material'

function fieldError<T>(formik: FormikProps<T>, field: keyof T & string) {
  const error = formik.errors[field]
  return formik.touched[field] && typeof error === 'string' ? error : undefined
}

export function textErrorHelper<T>(formik: FormikProps<T>, field: keyof T & string) {
  const error = fieldError(formik, field)
  return { error: !!error, helperText: error }
}

export function selectErrorHelper<T>(formik: FormikProps<T>, field: keyof T & string) {
  const error = fieldError(formik, field)
  return error ? <FormHelperText>{error}</FormHelperText> : null
}

export function selectIsError<T>(formik: FormikProps<T>, field: keyof T & string) {
  return !!fieldError(formik, field)
}

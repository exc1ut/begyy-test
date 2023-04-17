import { omit, pick, join, pipe, prop } from 'ramda'
import { FORM_ERROR } from 'final-form'
import { toast } from 'react-toastify'
import { toCamelCase } from './toCamelCase'

export const mapResponseToFormError = error => {
  const fieldErrors = toCamelCase(omit(['nonFieldErrors'], error))

  const commonErrors = pick(['nonFieldErrors'], error || {})

  if (!error?.data?.message) {
    toast.error('Ошибка', {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })

    return fieldErrors
  } else {
    toast.error(
      error?.data?.message || 'Ошибка при оформлении заказа, попробуйте позже или позвоните на горячую линию',
      {
        position: 'top-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      }
    )
  }
  return {
    ...fieldErrors,
    [FORM_ERROR]: join(', ', commonErrors.nonFieldErrors)
  }
}

const toArray = err => {
  if (!err) {
    return []
  }

  if (Array.isArray(err)) {
    return err
  }

  return [err]
}
export const getFieldError = pipe(prop('submitError'), toArray, join(','))

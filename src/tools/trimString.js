import { is } from 'ramda'

export const trimString = (text, length = 60) => {
  if (is(String, text)) {
    if (text.length <= length) {
      return text
    } else {
      return text.slice(0, length) + '...'
    }
  }
  return text
}

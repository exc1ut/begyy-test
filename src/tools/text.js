export const textTrim = (text, length = 300) => {
  if (typeof text === 'string') {
    if (text.length <= length) {
      return text
    } else {
      return text.slice(0, length) + '...'
    }
  }
  return text
}

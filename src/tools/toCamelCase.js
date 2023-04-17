import { compose, is, curry, keys, map, values, zipObj, path, equals } from 'ramda'
import * as API from 'constants/api'

const mapKeys = curry((fn, obj) => zipObj(map(fn, keys(obj)), values(obj)))

const camelize = str => {
  return str
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/(?:^\w|[A-Z]|_|\b\w)/g, (letter, index) => {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    })
    .replace(/\s+/g, '')
}

const invocableCompose = compose

export const toCamelCase = data => {
  if (is(Array, data)) {
    return map(toCamelCase, data)
  }

  if (is(Object, data)) {
    return invocableCompose(map(toCamelCase), mapKeys(camelize))(data)
  }

  return data
}

export const responseToCamelCase = (data, response) => {
  const responseContentType = path(['content-type'], response)

  if (equals(API.CONTENT_TYPE_JSON, responseContentType)) {
    return toCamelCase(JSON.parse(data))
  }

  if (is(Object, data) || is(Array, data)) {
    return toCamelCase(data)
  }

  return data
}

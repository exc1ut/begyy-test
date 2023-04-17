import { equals, is, path } from 'ramda'
import * as API from 'constants/api'

const responseToJSON = (data, response) => {
  const responseContentType = path(['content-type'], response)

  if (equals(API.CONTENT_TYPE_JSON, responseContentType)) {
    return JSON.parse(data)
  }

  if (is(Object, data) || is(Array, data)) {
    return data
  }

  return data
}

export default responseToJSON

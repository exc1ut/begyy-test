import axios from 'axios'
import { compose, curry, isNil, path, prop } from 'ramda'
import * as API from 'constants/api'
import responseToJSON from 'tools/responseToJSON'
import responseToCamelCase from 'tools/responseToCamelCase'

// GetSuccess
export const getPayloadFromSuccess = data => {
  return prop('data', data)
}

// GetError
export const getPayloadFromError = compose(data => !isNil(data) && Promise.reject(data), path(['response', 'data']))

// ErrorInterceptors
const errorInterceptors = curry((dispatch, error) => Promise.reject(error))

// Axios
const axiosRequest = ({ dispatch }, toCamelCase = true) => {
  axios.defaults.baseURL = API.ROOT_URL
  axios.defaults.timeout = 100000

  if (toCamelCase) {
    axios.defaults.transformResponse = [responseToCamelCase]
  } else {
    axios.defaults.transformResponse = [responseToJSON]
  }

  axios.defaults.headers.common = {}

  axios.interceptors.response.use(response => response, errorInterceptors(dispatch))

  return axios
}

export default axiosRequest

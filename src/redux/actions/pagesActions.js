import axios, { getPayloadFromError, getPayloadFromSuccess } from 'tools/axios'
import { sprintf } from 'sprintf-js'
import * as API from 'constants/api'
import * as ACTION_TYPES from 'constants/actionTypes'

export const pagesDetailActions = alias => {
  return dispatch => {
    const payload = axios({ dispatch })
      .get(sprintf(API.PAGES_DETAIL, alias))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.PAGES_DETAIL,
      payload
    })
  }
}

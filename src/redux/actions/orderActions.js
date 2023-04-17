import axios, { getPayloadFromError, getPayloadFromSuccess } from 'tools/axios'
import * as API from 'constants/api'
import * as ACTION_TYPES from 'constants/actionTypes'

export const orderAction = data => {
  return dispatch => {
    const payload = axios({ dispatch }, false)
      .post(API.ORDER, data)
      .then(getPayloadFromSuccess)
      .catch(err => {
        return getPayloadFromError(err)
      })
    return dispatch({
      type: ACTION_TYPES.ORDER,
      payload
    })
  }
}

export const zoodpayConfigAction = params => {
  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.ZOODPAY_CONFIG, params)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.ZOODPAY_CONFIG,
      payload
    })
  }
}

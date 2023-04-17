import * as API from 'constants/api'
import axios, { getPayloadFromError, getPayloadFromSuccess } from 'tools/axios'
import * as ACTION_TYPES from 'constants/actionTypes'

export const configsAction = params => {
  return dispatch => {
    const payload = axios({ dispatch }, false)
      .get(API.CONFIGS, params)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.CONFIGS,
      payload
    })
  }
}

export const categoriesAction = params => {
  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.CATEGORIES, params)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.CATEGORIES,
      payload
    })
  }
}

export const bannersAction = params => {
  return dispatch => {
    const payload = axios({ dispatch }).get(API.BANNER, params).then(getPayloadFromSuccess).catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.BANNERS,
      payload
    })
  }
}

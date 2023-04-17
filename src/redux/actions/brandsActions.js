import axios, { getPayloadFromError, getPayloadFromSuccess } from 'tools/axios'
import * as API from 'constants/api'
import * as ACTION_TYPES from 'constants/actionTypes'
import * as COLLECTIONS from 'constants/collections'

export const brandsActions = () => {
  return dispatch => {
    const payload = axios({ dispatch }).get(API.BRANDS).then(getPayloadFromSuccess).catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.BRANDS,
      payload
    })
  }
}

export const brandsPopularAction = () => {
  const params = {
    collection: COLLECTIONS.POPULAR
  }

  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.BRANDS, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.BRANDS_POPULAR,
      payload
    })
  }
}

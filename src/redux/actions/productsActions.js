import axios, { getPayloadFromError, getPayloadFromSuccess } from 'tools/axios'
import * as API from 'constants/api'
import * as ACTION_TYPES from 'constants/actionTypes'
import { sprintf } from 'sprintf-js'
import * as COLLECTIONS from 'constants/collections'

export const productsOptionsAction = params => {
  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.PRODUCTS_OPTIONS, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.PRODUCTS_OPTIONS,
      payload
    })
  }
}

export const productsOptionsClearAction = () => {
  return dispatch => {
    return dispatch({
      type: `${ACTION_TYPES.PRODUCTS_OPTIONS}_CLEAR`
    })
  }
}

export const productsPopularAction = () => {
  const params = {
    collection: COLLECTIONS.POPULAR
  }

  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.PRODUCTS, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.PRODUCTS_POPULAR,
      payload
    })
  }
}

export const productsSaleAction = () => {
  const params = {
    collection: COLLECTIONS.SALE
  }

  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.PRODUCTS, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.PRODUCTS_SALE,
      payload
    })
  }
}

export const productsRecommendAction = () => {
  const params = {
    collection: COLLECTIONS.RECOMMEND
  }

  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.PRODUCTS, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.PRODUCTS_RECOMMEND,
      payload
    })
  }
}

export const productsNewAction = () => {
  const params = {
    ordering: '-created_date',
    limit: 20
  }

  return dispatch => {
    const payload = axios({ dispatch })
      .get(API.PRODUCTS, { params })
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.PRODUCTS_NEW,
      payload
    })
  }
}

export const productsDetailAction = ({ alias }) => {
  return dispatch => {
    const payload = axios({ dispatch })
      .get(sprintf(API.PRODUCTS_DETAIL, alias))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)
    return dispatch({
      type: ACTION_TYPES.PRODUCTS_DETAIL,
      payload
    })
  }
}

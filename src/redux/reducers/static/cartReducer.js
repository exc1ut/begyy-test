import * as ACTION_TYPES from 'constants/actionTypes'
import createReducer from 'redux/tools/createReducer'
import { length } from 'ramda'

const defaultState = []

const cartReducer = () => {
  return createReducer(defaultState, {
    [`${ACTION_TYPES.CART}`](state, { payload }) {
      return {
        count: length(payload),
        data: payload
      }
    }
  })
}

export default cartReducer

import createReducer from 'redux/tools/createReducer'

const defaultState = {
  loading: false,
  data: null,
  success: false,
  error: null,
  failed: false
}

export const actions = actionName => ({
  [`${actionName}_PENDING`](state) {
    return {
      ...state,
      loading: true
    }
  },
  [`${actionName}_FULFILLED`](state, action) {
    return {
      ...state,
      data: action.payload,
      success: true,
      error: null,
      failed: false,
      loading: false
    }
  },
  [`${actionName}_REJECTED`](state, action) {
    return {
      ...state,
      data: null,
      success: false,
      error: action.payload,
      failed: true,
      loading: false
    }
  },
  [`${actionName}_CLEAR`]() {
    return defaultState
  }
})

const createThunkReducer = actionName => {
  return createReducer(defaultState, actions(actionName))
}

export default createThunkReducer

import { useMemo } from 'react'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from 'redux/reducers'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

let store

export const initialStore = (initialState = {}) => {
  // Middleware Configuration
  const middleware = [thunk, promise]

  // Browser console logger
  // if (process.env.NODE_ENV === 'development') {
  //   middleware.push(createLogger({ collapsed: true }))
  // }

  // Store Instantiation and HMR Setup
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
}

export const initializeStore = (preloadedState = {}) => {
  let _store = store ?? initialStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initialStore({
      ...store.getState(),
      ...preloadedState
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export const useStore = (initialState = {}) => {
  return useMemo(() => initializeStore(initialState), [initialState])
}

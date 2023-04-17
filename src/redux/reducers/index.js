import { combineReducers } from 'redux'
import * as ACTION_TYPES from 'constants/actionTypes'
import * as STATES from 'constants/states'
import createThunkReducer from 'redux/tools/createThunkReducer'
import cartReducer from 'redux/reducers/static/cartReducer'

export default combineReducers({
  [STATES.CART]: cartReducer(),

  [STATES.CONFIGS]: createThunkReducer(ACTION_TYPES.CONFIGS),

  [STATES.CATEGORIES]: createThunkReducer(ACTION_TYPES.CATEGORIES),

  [STATES.ZOODPAY_CONFIG]: createThunkReducer(ACTION_TYPES.ZOODPAY_CONFIG),

  [STATES.BANNERS]: createThunkReducer(ACTION_TYPES.BANNERS),

  [STATES.ORDER]: createThunkReducer(ACTION_TYPES.ORDER),

  [STATES.BRANDS]: createThunkReducer(ACTION_TYPES.BRANDS),
  [STATES.BRANDS_POPULAR]: createThunkReducer(ACTION_TYPES.BRANDS_POPULAR),

  [STATES.PRODUCTS]: createThunkReducer(ACTION_TYPES.PRODUCTS),
  [STATES.PRODUCTS_DETAIL]: createThunkReducer(ACTION_TYPES.PRODUCTS_DETAIL),
  [STATES.PRODUCTS_POPULAR]: createThunkReducer(ACTION_TYPES.PRODUCTS_POPULAR),
  [STATES.PRODUCTS_NEW]: createThunkReducer(ACTION_TYPES.PRODUCTS_NEW),
  [STATES.PRODUCTS_SALE]: createThunkReducer(ACTION_TYPES.PRODUCTS_SALE),
  [STATES.PRODUCTS_RECOMMEND]: createThunkReducer(ACTION_TYPES.PRODUCTS_RECOMMEND),
  [STATES.PRODUCTS_OPTIONS]: createThunkReducer(ACTION_TYPES.PRODUCTS_OPTIONS),

  [STATES.PAGES_DETAIL]: createThunkReducer(ACTION_TYPES.PAGES_DETAIL)
})

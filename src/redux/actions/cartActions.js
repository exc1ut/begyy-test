import * as ACTION_TYPES from 'constants/actionTypes'
import { concat, prop, propEq, reject, when, assoc, curry, map, find, propOr } from 'ramda'
import { getCartProducts } from 'tools/cart'
import * as STORAGE from 'constants/storage'

export const initCartProductsAction = products => {
  return {
    type: ACTION_TYPES.CART,
    payload: products
  }
}

export const clearCartProductsAction = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE.CART_KEY, '[]')
  }

  return {
    type: `${ACTION_TYPES.CART}`,
    payload: []
  }
}

export const addCartProductAction = product => {
  const cartId = prop('cartId', product)
  const clearProducts = reject(propEq('cartId', cartId), getCartProducts())

  const newProducts = concat(clearProducts, [product])
  const newCartItemsStringify = JSON.stringify(newProducts)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE.CART_KEY, newCartItemsStringify)
  }

  return {
    type: ACTION_TYPES.CART,
    payload: newProducts
  }
}

export const removeCartProductByCartIdAction = cartId => {
  const newProducts = reject(propEq('cartId', cartId), getCartProducts())

  const newCartItemsStringify = JSON.stringify(newProducts)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE.CART_KEY, newCartItemsStringify)
  }

  return {
    type: ACTION_TYPES.CART,
    payload: newProducts
  }
}

const newProductsWithEditedCount = curry((count, cartId, items) =>
  map(when(propEq('cartId', cartId), assoc('count', count)), items)
)

export const setCountCartProductAction = (cartId, count = 1) => {
  const newProducts = newProductsWithEditedCount(count, cartId, getCartProducts())
  const newCartItemsStringify = JSON.stringify(newProducts)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE.CART_KEY, newCartItemsStringify)
  }

  return {
    type: ACTION_TYPES.CART,
    payload: newProducts
  }
}

export const setPlusCountCartProduct = cartId => {
  const currentProduct = find(propEq('cartId', cartId), getCartProducts())
  const currentCount = +propOr(0, 'count', currentProduct)
  const newCount = currentCount + 1

  if (typeof newCount === 'number') {
    const newProducts = newProductsWithEditedCount(newCount, cartId, getCartProducts())
    const newCartItemsStringify = JSON.stringify(newProducts)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE.CART_KEY, newCartItemsStringify)
    }

    return {
      type: ACTION_TYPES.CART,
      payload: newProducts
    }
  }
}

export const setMinusCountCartProduct = cartId => {
  const currentProduct = find(propEq('cartId', cartId), getCartProducts())
  const currentCount = +propOr(0, 'count', currentProduct)
  const newCount = currentCount - 1

  if (typeof newCount === 'number' && newCount >= 1) {
    const newProducts = newProductsWithEditedCount(newCount, cartId, getCartProducts())
    const newCartItemsStringify = JSON.stringify(newProducts)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE.CART_KEY, newCartItemsStringify)
    }

    return {
      type: ACTION_TYPES.CART,
      payload: newProducts
    }
  }
}

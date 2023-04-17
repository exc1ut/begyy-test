import { find, isEmpty, isNil, map, prop, propEq, propOr, sort } from 'ramda'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import * as STORAGE from 'constants/storage'

export const getCartId = (id, options = []) =>
  isEmpty(options) ? `${id}` : `${id}_${sort((a, b) => a - b, options).join('-')}`

export const parseCartId = (cartId = '') => {
  const id = cartId.split('_')[0]
  const optionsStr = cartId.split('_')[1]
  const optionsArr = optionsStr ? optionsStr.split('-') : []
  const options = map(item => Number(item), optionsArr)

  return {
    id: Number(id),
    options
  }
}

export const getCartProducts = () => {
  const currentProductsStringify =
    typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE.CART_KEY) || '[]' : '[]'
  const prevProducts = JSON.parse(currentProductsStringify)

  if (Array.isArray(prevProducts)) {
    return prevProducts
  } else {
    return []
  }
}

export const getCartProductsToOrder = () => {
  const cartProducts = getCartProducts()
  return map(item => {
    const id = prop('id', item)
    const cartId = prop('cartId', item)
    const isInstallmentPlan = prop('isInstallmentPlan', item)
    const count = prop('count', item)
    const parsedCartId = parseCartId(cartId)
    const options = propOr([], 'options', parsedCartId)

    return {
      product_id: id,
      count,
      isInstallmentPlan,
      options
    }
  }, cartProducts)
}

export const getCartProductByCartId = cartId => {
  const cart = useSelector(prop(STATES.CART))
  const cartData = propOr([], 'data', cart)

  const foundProduct = find(propEq('cartId', cartId), cartData)

  if (!isNil(foundProduct)) {
    return foundProduct
  } else {
    return {}
  }
}

export const hasInCart = cartId => {
  const cart = useSelector(prop(STATES.CART))
  const cartData = propOr([], 'data', cart)

  const foundProduct = find(propEq('cartId', cartId), cartData)

  return !isNil(foundProduct)
}

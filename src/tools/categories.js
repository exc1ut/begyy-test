import { find, flatten } from 'ramda'

export const getFlattenCategories = arr => {
  if (Array.isArray(arr) && arr.length > 0) {
    // Если понадобится поле children раскомментировать нижнюю строку
    // return flatten(arr.map(item => [item, getFlattenCategories(item?.children)]))
    return flatten(arr.map(({ children, ...rest }) => [rest, getFlattenCategories(children)]))
  }
  return []
}
export const getCategoryByAlias = (arr, alias) => {
  if (Array.isArray(arr) && arr.length > 0) return find(({ alias: a }) => a === alias, getFlattenCategories(arr))
  return undefined
}

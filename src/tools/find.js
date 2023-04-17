import { append, filter, find, flatten, isEmpty, isNil, join, map, pipe, prop, propOr, reverse } from 'ramda'
import { sprintf } from 'sprintf-js'
import * as ROUTES from 'constants/routes'

export const deepFindById = (id, arr = []) => {
  const mappedArr = map(item => {
    const { id: fId, children: fChildren } = item

    if (fId === id) {
      return item
    } else if (!isNil(fChildren) && !isEmpty(fChildren)) {
      return deepFindById(id, fChildren)
    } else {
      return null
    }
  }, arr)

  const findObj = find(item => !isNil(item) && !isEmpty(item), mappedArr)

  if (!isNil(findObj) && !isEmpty(findObj)) return findObj

  return []
}

export const deepFindChildrenById = (id, arr = []) => {
  const child = deepFindById(id, arr)?.children

  if (!isNil(child) && !isEmpty(child)) return child

  return []
}

export const deepFindByAlias = (alias, arr = []) => {
  const mappedArr = map(item => {
    const { alias: fAlias, children: fChildren } = item

    if (fAlias === alias) {
      return item
    } else if (!isNil(fChildren) && !isEmpty(fChildren)) {
      return deepFindByAlias(alias, fChildren)
    } else {
      return null
    }
  }, arr)

  const findObj = find(item => !isNil(item) && !isEmpty(item), mappedArr)

  if (!isNil(findObj) && !isEmpty(findObj)) return findObj

  return []
}

export const deepFindChildrenByAlias = (alias, arr = []) => {
  const child = deepFindByAlias(alias, arr)?.children

  if (!isNil(child) && !isEmpty(child)) return child

  return []
}

// startId (id<number> or alias<string>)
export const getTreeFrom = ({ startId, startAlias }, item) => {
  const title = propOr('...', 'name', item)
  const alias = propOr('', 'alias', item)
  const parent = propOr({}, 'parent', item)
  const id = propOr(0, 'id', item)

  if ((+startId === +id || startAlias === alias) && isEmpty(parent)) {
    return []
  } else if ((+startId === +id || startAlias === alias) && !isEmpty(parent)) {
    return getTreeFrom({ startId, startAlias }, parent)
  } else if (!isEmpty(parent)) {
    return [
      {
        id,
        title,
        alias
      },
      ...getTreeFrom({ startId, startAlias }, parent)
    ]
  } else if (isEmpty(parent)) {
    return [
      {
        id,
        title,
        alias
      }
    ]
  } else {
    return []
  }
}

export const getItemFromTree = (arr, target) => {
  // eslint-disable-next-line guard-for-in,no-unused-vars
  for (const i in arr) {
    const a = arr[i]
    if (a.id === target) {
      return a
    }
    if (Array.isArray(a.children)) {
      const child = getItemFromTree(a.children, target)
      // eslint-disable-next-line max-depth
      if (child !== null) {
        return child
      }
    }
  }
  return null
}

export const getFullTreeForItem = (arr, target) => {
  const endlessTree = (arrNext, targetNext) =>
    [1].reduce(result => {
      const foundItem = getItemFromTree(arr, targetNext)
      result.push(foundItem)
      foundItem?.parent && result.push(getFullTreeForItem(arrNext, foundItem.parent))
      return result
    }, [])
  return flatten(endlessTree(arr, target))
}

export const getDetailUrlByItem = item => {
  const category = propOr({}, 'category', item)
  const alias = prop('alias', item)

  const categoryTree = reverse(getTreeFrom({ startAlias: name }, category))

  const detailUrlSuffix = pipe(
    map(({ alias }) => alias),
    filter(item => !!item),
    append(alias),
    join('/')
  )(categoryTree)

  return sprintf(ROUTES.PRODUCTS_ITEM_URL, detailUrlSuffix)
}

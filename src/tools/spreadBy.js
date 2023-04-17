import { filter, length, prop, reduceBy, sortBy, toPairs } from 'ramda'

export const spreadBy = arr => {
  const getFirstLetter = ({ name }) => (name.slice(0, 1) || ' ').toLowerCase()
  const groupNames = (acc, item) => acc.concat(item)
  const reducedName = reduceBy(groupNames, [], getFirstLetter, arr)
  const pairedArr = toPairs(reducedName)
  return sortBy(prop('0'), pairedArr)
}

export const findAndSpreadByFirstLetter = ({ arr, value }) => {
  const evLength = length(value)
  const newResults = filter(item => {
    return prop('name', item).slice(0, evLength).toLowerCase() === value.toLowerCase()
  }, arr)
  return spreadBy(newResults)
}

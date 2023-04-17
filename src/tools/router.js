import { ifElse, is, last, pathOr, pipe } from 'ramda'

// getCurrentItemFromSlug
export const getLastAliasFromSpread = (router, pathArr = ['query', 'aliases']) =>
  pipe(
    pathOr([], pathArr),
    ifElse(is(String), value => value, last)
  )(router)

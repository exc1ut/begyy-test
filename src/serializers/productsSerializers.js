import { getLastAliasFromSpread } from 'tools/router'
import * as ROUTES from 'constants/routes'
import { prop } from 'ramda'

export const productsSerializers = (data, isBrandPage) => {
  const request = {
    [ROUTES.COLLECTION_QUERY]: prop(ROUTES.COLLECTION_QUERY, data),
    [ROUTES.ORDERING_QUERY]: prop(ROUTES.ORDERING_QUERY, data),
    [ROUTES.SEARCH_QUERY]: prop(ROUTES.SEARCH_QUERY, data),
    [ROUTES.OPTIONS_QUERY]: prop(ROUTES.OPTIONS_QUERY, data),
    [ROUTES.BRANDS_QUERY]: prop(ROUTES.BRANDS_QUERY, data)
  }
  return isBrandPage
    ? {
        [ROUTES.CATEGORY_QUERY]: prop(ROUTES.CATEGORY_QUERY, data),
        ...request
      }
    : {
        category_alias: getLastAliasFromSpread(data, [ROUTES.SPREAD_QUERY]),
        ...request
      }
}

import React from 'react'
import { useRouter } from 'next/router'
import { isNil, join, pipe, pluck, prop, propOr, reverse, take } from 'ramda'
import * as ROUTES from 'constants/routes'
import ListContainer from 'components/list/container/ListContainer'
import ListFilters from 'components/list/filters/ListFilters'
import ListResults from 'components/list/results/ListResults'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import { getTreeFrom } from 'tools/find'
import { getLastAliasFromSpread } from 'tools/router'

// Component
function CategoriesDetailGrid(props) {
  const { detail } = props

  const router = useRouter()
  const asPath = propOr('', 'asPath', router)

  const categoryQuery = getLastAliasFromSpread(router, ['query', ROUTES.SPREAD_QUERY])

  const isAllCategories =
    `${asPath}`.split('?')[0] === ROUTES.PRODUCTS_URL || `${asPath}`.split('?')[0] === `${ROUTES.PRODUCTS_URL}/`

  const isSuccess = !isNil(detail) || isAllCategories

  const productsOptions = useSelector(prop(STATES.PRODUCTS_OPTIONS))
  const productsOptionsData = propOr({}, 'data', productsOptions)
  const productsOptionsLoading = propOr(false, 'loading', productsOptions)
  const productsOptionsCurrentCategory = propOr({}, 'currentCategory', productsOptionsData)

  const treeFrom = reverse(getTreeFrom({ startAlias: categoryQuery }, productsOptionsCurrentCategory))
  const categoriesTreeFrom = treeFrom.map(({ title: t }, index) => ({
    path: sprintf(ROUTES.PRODUCTS_SLUG_URL, pipe(take(index + 1), pluck('alias'), join('/'))(treeFrom)),
    title: t
  }))

  const name = prop('name', detail)
  const title = propOr(name, 'title', detail)
  const nameAlt = isAllCategories ? 'Все товары' : name
  const titleList = isAllCategories ? 'Все товары' : title
  const id = prop('id', detail)
  const description = prop('description', detail)

  const breadcrumbsWay = isAllCategories
    ? []
    : [
        {
          title: 'Все товары',
          path: ROUTES.PRODUCTS_URL
        },
        ...(productsOptionsLoading ? [{ title: '...' }] : categoriesTreeFrom)
      ]

  const pickParams = [
    ROUTES.COLLECTION_QUERY,
    ROUTES.BRANDS_QUERY,
    ROUTES.SEARCH_QUERY,
    ROUTES.OPTIONS_QUERY,
    ROUTES.ORDERING_QUERY
  ]
  const addParams = id ? { [ROUTES.CATEGORY_QUERY]: id } : {}

  return (
    <ListContainer title={nameAlt} breadcrumbsWay={breadcrumbsWay}>
      <ListFilters title={nameAlt} breadcrumbsWay={breadcrumbsWay} isSuccess={isSuccess} />
      <ListResults
        title={titleList}
        id={id}
        description={description}
        isSuccess={isSuccess}
        pickParams={pickParams}
        addParams={addParams}
      />
    </ListContainer>
  )
}

export default CategoriesDetailGrid

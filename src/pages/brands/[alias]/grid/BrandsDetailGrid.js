import React from 'react'
import { isNil, prop } from 'ramda'
import * as ROUTES from 'constants/routes'
import ListContainer from 'components/list/container/ListContainer'
import ListFilters from 'components/list/filters/ListFilters'
import ListResults from 'components/list/results/ListResults'

// Component
function BrandsDetailGrid(props) {
  const { detail } = props

  const isSuccess = !isNil(detail)

  const title = prop('name', detail)
  const id = prop('id', detail)
  const description = prop('description', detail)

  const breadcrumbsWay = [
    {
      title: 'Все бренды',
      path: ROUTES.BRANDS_URL
    }
  ]

  const pickParams = [ROUTES.SEARCH_QUERY, ROUTES.ORDERING_QUERY, ROUTES.CATEGORY_QUERY]
  const addParams = { [ROUTES.BRANDS_QUERY]: id }

  return (
    <ListContainer title={title} breadcrumbsWay={breadcrumbsWay}>
      <ListFilters title={title} breadcrumbsWay={breadcrumbsWay} isBrandPage />
      <ListResults
        title={title}
        id={id}
        description={description}
        isSuccess={isSuccess}
        pickParams={pickParams}
        addParams={addParams}
      />
    </ListContainer>
  )
}

export default BrandsDetailGrid

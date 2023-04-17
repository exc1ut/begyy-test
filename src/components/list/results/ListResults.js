import React from 'react'
import styled from 'styled-components'
import * as BREAKPOINTS from 'constants/breakpoints'
import numberFormat from 'tools/numberFormat'
import * as API from 'constants/api'
import * as ACTION_TYPES from 'constants/actionTypes'
import * as STATES from 'constants/states'
import * as ORDERING from 'constants/ordering'
import InfiniteScroll from 'components/infiniteScroll'
import { useSelector } from 'react-redux'
import { map, pathOr, prop, propOr } from 'ramda'
import ProductsItem from 'components/products/item'
import { useMediaQuery } from 'react-responsive'

//Styles
const Wrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: calc(100% - 180px - 30px);
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    width: 100%;
  }
`
const Title = styled('h1')`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.titleLarge};
  font-weight: 500;
  text-shadow: ${({ theme }) => theme.textShadow.primary};
`
const HTML = styled('div')`
  display: flex;
  white-space: pre-line;
  flex-flow: column nowrap;
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.title};
  text-shadow: ${({ theme }) => theme.textShadow.headline};
  font-weight: 300;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  & h1,
  & h2 {
    font-size: ${({ theme }) => theme.fontSize.titleLarge};
  }
  & b {
    font-weight: 500;
  }
  & em {
    font-style: italic;
  }
  & ul {
    list-style: disc;
    padding-left: 30px;
  }
  & ol {
    list-style: decimal;
    padding-left: 30px;
  }
  & a {
    color: ${({ theme }) => theme.palette.primary};
    &:hover {
      text-decoration: underline;
    }
  }
`
const SubTitle = styled('h3')`
  font-size: ${({ theme }) => theme.fontSize.body};
  text-transform: uppercase;
`

// Component
function ListResults(props) {
  const { title, description, isSuccess, pickParams, addParams = {} } = props

  const isMobileL = useMediaQuery({ query: `(${BREAKPOINTS.MOBILE_L})` })
  const isMobileM = useMediaQuery({ query: `(${BREAKPOINTS.MOBILE_M})` })

  const scrollStyles = {
    gridTemplateColumns: isMobileM ? 'repeat(2, 1fr)' : isMobileL ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'
  }

  const products = useSelector(prop(STATES.PRODUCTS))
  const productsCount = pathOr(0, ['data', 'count'], products)
  const productsData = pathOr([], ['data', 'results'], products)
  const productsLoading = propOr(false, 'loading', products)

  const list = map(item => {
    const { id } = item
    return <ProductsItem key={id} item={item} />
  }, productsData)

  const searchText = 'Подготовка товаров . . .'

  const titleEl = <Title>{isSuccess ? title : searchText}</Title>
  const subTitleEl = isSuccess ? (
    <SubTitle>{productsLoading ? searchText : `По запросу найдено ${numberFormat(productsCount)} товаров`}</SubTitle>
  ) : null

  const listEl = isSuccess ? (
    <InfiniteScroll
      api={API.PRODUCTS}
      actionType={ACTION_TYPES.PRODUCTS}
      stateName={STATES.PRODUCTS}
      params={{ ordering: `-${ORDERING.DATE}`, ...addParams }}
      pickParams={pickParams}
      list={list}
      styles={scrollStyles}
    />
  ) : null

  return (
    <Wrap>
      {titleEl}
      {subTitleEl}
      {listEl}
      <HTML dangerouslySetInnerHTML={{ __html: description }} />
    </Wrap>
  )
}

export default ListResults

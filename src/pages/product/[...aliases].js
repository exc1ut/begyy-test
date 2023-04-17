import React from 'react'
import Layout from 'layouts/main'
import ProductsDetailGrid from './grid'
import * as STATES from 'constants/states'
import { pathOr, prop, propOr } from 'ramda'
import { initializeStore } from 'redux/store/store'
import { productsDetailAction, productsRecommendAction } from 'redux/actions/productsActions'
import { getLastAliasFromSpread } from 'tools/router'

// Component
const ProductsDetail = props => {
  const { productsRecommend, productsDetail } = props
  const productsRecommendData = pathOr([], ['data', 'results'], productsRecommend)
  const productsDetailData = propOr({}, 'data', productsDetail)
  const name = propOr('', 'name', productsDetailData)
  const brandName = pathOr('', ['brand', 'name'], productsDetailData)
  const title = `${name} ${brandName}`
  const metaDescription = `${name}. ${brandName}.`
  const metaKeywords = `${name}, ${brandName}`

  return (
    <Layout title={title} metaDescription={metaDescription} metaKeywords={metaKeywords}>
      <ProductsDetailGrid productData={productsDetailData} productsRecommendData={productsRecommendData} />
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  const alias = getLastAliasFromSpread(ctx)
  await dispatch(productsDetailAction({ alias }))
  await dispatch(productsRecommendAction())

  const states = reduxStore.getState()

  const productsRecommend = prop(STATES.PRODUCTS_RECOMMEND, states)
  const productsDetail = prop(STATES.PRODUCTS_DETAIL, states)

  return {
    props: {
      productsDetail,
      productsRecommend
    }
  }
}

export default ProductsDetail

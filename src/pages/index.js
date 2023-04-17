import React from 'react'
import Layout from 'layouts/main'
import MainGrid from 'pages/main/grid'
import { bannersAction } from 'redux/actions/mainActions'
import { initializeStore } from 'redux/store/store'
import { pathOr, prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import { brandsPopularAction } from 'redux/actions/brandsActions'
import { productsNewAction, productsPopularAction, productsSaleAction } from 'redux/actions/productsActions'

// Component
const Main = props => {
  const { banners, brandsPopular, productsPopular, productsSale, productsNew } = props

  const bannersData = propOr([], 'data', banners)
  const brandsPopularData = propOr([], 'data', brandsPopular)
  const productsPopularData = pathOr([], ['data', 'results'], productsPopular)
  const productsSaleData = pathOr([], ['data', 'results'], productsSale)
  const productsNewData = pathOr([], ['data', 'results'], productsNew)

  const productsCollections = {
    productsNewData,
    productsPopularData,
    productsSaleData
  }
  return (
    <Layout
      defaultMetaDescription={false}
      metaDescription={
        'Купить косметику и парфюмерию в Ташкенте в мультибрендовом интернет-магазине | Средства для волос и тела, мужские и женские ароматы, тени, туши для ресниц, очищающие средства, уходовая косметика в каталоге Elcos'
      }
    >
      <MainGrid banners={bannersData} brands={brandsPopularData} productsCollections={productsCollections} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  await dispatch(bannersAction())
  await dispatch(brandsPopularAction())
  await dispatch(productsPopularAction())
  await dispatch(productsSaleAction())
  await dispatch(productsNewAction())

  const states = reduxStore.getState()

  const banners = prop(STATES.BANNERS, states)
  const brandsPopular = prop(STATES.BRANDS_POPULAR, states)
  const productsPopular = prop(STATES.PRODUCTS_POPULAR, states)
  const productsSale = prop(STATES.PRODUCTS_SALE, states)
  const productsNew = prop(STATES.PRODUCTS_NEW, states)

  return {
    props: {
      banners,
      brandsPopular,
      productsNew,
      productsSale,
      productsPopular
    }
  }
}

export default Main

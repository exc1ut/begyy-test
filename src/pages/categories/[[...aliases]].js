import React, { useEffect } from 'react'
import Layout from 'layouts/main'
import { useRouter } from 'next/router'
import { prop, propOr } from 'ramda'
import { initializeStore } from 'redux/store/store'
import * as STATES from 'constants/states'
import { SPREAD_QUERY } from 'constants/routes'
import CategoriesDetailGrid from './grid'
import { categoriesAction } from 'redux/actions/mainActions'
import { getLastAliasFromSpread } from 'tools/router'
import { useDispatch } from 'react-redux'
import { productsOptionsAction, productsOptionsClearAction } from 'redux/actions/productsActions'
import { getCategoryByAlias } from 'tools/categories'
import { brandsActions } from 'redux/actions/brandsActions'
import * as CONST from '../../constants/constants'

// Component
const Products = props => {
  const { categories } = props
  const dispatch = useDispatch()

  const router = useRouter()
  const categoryAlias = getLastAliasFromSpread(router, ['query', SPREAD_QUERY])

  const categoriesData = propOr([], 'data', categories)
  const detail = getCategoryByAlias(categoriesData, categoryAlias)

  useEffect(() => {
    dispatch(brandsActions())
  }, [])

  useEffect(() => {
    if (categoryAlias) {
      dispatch(productsOptionsAction({ category_alias: categoryAlias }))
    } else {
      dispatch(productsOptionsClearAction())
    }
  }, [categoryAlias])

  const title = propOr(`Все товары  - ${CONST.STATIC_TITLE}`, 'metaTitle', detail)
  const metaDescription = propOr(CONST.META_DESCRIPTION, 'metaDescription', detail)
  return (
    <Layout title={title} defaultMetaDescription={false} defaultMetaTitle={false} metaDescription={metaDescription}>
      <CategoriesDetailGrid detail={detail} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  await dispatch(categoriesAction())
  await dispatch(brandsActions())

  const states = reduxStore.getState()

  const categories = prop(STATES.CATEGORIES, states)

  return { props: { categories } }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default Products

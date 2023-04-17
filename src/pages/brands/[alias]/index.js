import React from 'react'
import Layout from 'layouts/main'
import { initializeStore } from 'redux/store/store'
import { brandsActions } from 'redux/actions/brandsActions'
import { find, prop, propEq, propOr } from 'ramda'
import * as STATES from 'constants/states'
import { useRouter } from 'next/router'
import BrandsDetailGrid from './grid'

const Brand = props => {
  const { brands } = props

  const router = useRouter()
  const queries = propOr({}, 'query', router)
  const brandsAlias = propOr('', 'alias', queries)

  const brandsData = propOr([], 'data', brands)
  const detail = find(propEq('alias', brandsAlias))(brandsData)

  const title = prop('name', detail)

  return (
    <Layout title={title || 'Товары'}>
      <BrandsDetailGrid detail={detail} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  await dispatch(brandsActions())

  const states = reduxStore.getState()

  const brands = prop(STATES.BRANDS, states)

  return {
    props: {
      brands
    }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export default Brand

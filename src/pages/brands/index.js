import React from 'react'
import Layout from 'layouts/main'
import BrandsGrid from './grid'
import { initializeStore } from 'redux/store/store'
import { prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import { brandsActions } from 'redux/actions/brandsActions'

// Component
const Brands = props => {
  const { brands } = props

  const brandsData = propOr([], 'data', brands)

  return (
    <Layout title={'Бренды'}>
      <BrandsGrid brands={brandsData} />
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

export default Brands

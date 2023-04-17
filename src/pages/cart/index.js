import React from 'react'
import Layout from 'layouts/main'
import CartGrid from './grid'
import { initializeStore } from 'redux/store/store'
import { prop } from 'ramda'
import * as STATES from 'constants/states'
import { zoodpayConfigAction } from 'redux/actions/orderActions'

// Component
const Cart = props => {
  const title = 'Корзина'
  return (
    <Layout title={title}>
      <CartGrid {...props} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  await dispatch(zoodpayConfigAction())

  const states = reduxStore.getState()

  const zoodpayConfig = prop(STATES.ZOODPAY_CONFIG, states)

  return { props: { zoodpayConfig } }
}

export default Cart

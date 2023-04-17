import React from 'react'
import Layout from 'layouts/main'
import PageGrid from './grid'
import { initializeStore } from 'redux/store/store'
import { prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import * as ROUTES from 'constants/routes'
import { pagesDetailActions } from 'redux/actions/pagesActions'

// Component
const Page = props => {
  const { pagesDetail } = props

  const pagesDetailData = propOr({}, 'data', pagesDetail)
  const { name = '' } = pagesDetailData

  return (
    <Layout title={name}>
      <PageGrid pagesDetail={pagesDetail} />
    </Layout>
  )
}
export async function getStaticProps(context) {
  const params = propOr({}, 'params', context)
  const alias = prop('alias', params)

  const reduxStore = initializeStore()
  const { dispatch } = reduxStore
  await dispatch(pagesDetailActions(alias))

  const states = reduxStore.getState()

  const pagesDetail = prop(STATES.PAGES_DETAIL, states)
  return { props: { pagesDetail: pagesDetail } }
}

const pageAliases = [
  ROUTES.DELIVERY_ALIAS,
  ROUTES.PAYMENT_ALIAS,
  ROUTES.ABOUT_US_ALIAS,
  ROUTES.CONTACTS_ALIAS,
  ROUTES.COOPERATION_ALIAS,
  ROUTES.SOCIAL_MEDIA_ALIAS,
  ROUTES.TERMS_OF_USE_ALIAS,
  ROUTES.RETURNS_ALIAS
]
const paths = pageAliases.map(alias => ({ params: { alias } }))

export async function getStaticPaths() {
  return { paths, fallback: false }
}

export default Page

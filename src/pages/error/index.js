import Layout from '../../layouts/main'
import React from 'react'
import SuccessErrorGrid from '../../components/successError/SuccessErrorGrid'

const Error = () => {
  return (
    <Layout title={''}>
      <SuccessErrorGrid error={true} />
    </Layout>
  )
}

export default Error

import React from 'react'
import Layout from 'layouts/main'
import NotFoundGrid from 'pages/404/grid'

// Component
const NotFound = () => {
  const title = 'Страница не найдена'

  return (
    <Layout title={title}>
      <NotFoundGrid />
    </Layout>
  )
}

export default NotFound

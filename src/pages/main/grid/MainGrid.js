import Container from 'components/container'
import Banner from 'components/banner'
import Brands from 'components/brands'
import ProductsList from 'components/products/list'
import * as COLLECTIONS from 'constants/collections'
import styled from 'styled-components'

const Title = styled('h1')`
  text-align: center;
  margin-bottom: 25px;
  font-size: ${({ theme }) => theme.fontSize.titleLarge};
`

// Component
const MainGrid = props => {
  const { banners, brands, productsCollections } = props

  const { productsPopularData, productsSaleData, productsNewData } = productsCollections

  return (
    <Container>
      <Banner banners={banners} />
      <Brands brands={brands} />
      <Title>Косметика и парфюмерия в Ташкенте</Title>
      <ProductsList title={'Популярное'} alias={COLLECTIONS.POPULAR} data={productsPopularData} />
      <ProductsList title={'Новинки'} alias={COLLECTIONS.NEW} data={productsNewData} />
      <ProductsList title={'Распродажа'} alias={COLLECTIONS.SALE} data={productsSaleData} />
    </Container>
  )
}

export default MainGrid

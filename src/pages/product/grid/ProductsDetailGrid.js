import Container from 'components/container'
import styled from 'styled-components'
import Breadcrumbs from 'components/breadcrumbs'
import * as ROUTES from 'constants/routes'
import ProductsList from 'components/products/list'
import Form from 'components/form'
import { useEffect, useState } from 'react'
import { sprintf } from 'sprintf-js'
import { find, isEmpty, join, map, path, pipe, pluck, prop, propEq, propOr, reverse, sortBy, take, values } from 'ramda'
import ProductDetailFields from './fields/ProductDetailFields'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import noImage from 'media/images/no-image.png'
import { getCartProductByCartId, getCartId } from 'tools/cart'
import { addCartProductAction } from 'redux/actions/cartActions'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import ChevronRight from 'media/icons/ChevronRight'
import mapIndexed from 'tools/mapIndexed'
import * as COLLECTIONS from 'constants/collections'
import { useMediaQuery } from 'react-responsive'
import * as BREAKPOINTS from 'constants/breakpoints'
import * as CONST from 'constants/constants'
import { getDetailUrlByItem, getTreeFrom } from 'tools/find'

// SwiperCore
SwiperCore.use([Pagination])

// Styles
const Product = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 30px;
  @media only screen and (${BREAKPOINTS.TABLET}) {
    flex-flow: column nowrap;
    margin-bottom: 30px;
  }
`
const Side = styled('div')`
  display: flex;
  flex-flow: column nowrap;
`
const Preview = styled(Side)`
  width: 410px;
  min-width: 410px;
  margin-right: 30px;
  & .swiper-container {
    width: 100%;
    padding-bottom: 40px;
  }
  & .swiper-pagination-bullet {
    background: ${({ theme }) => theme.background.pagination};
    opacity: 0.85;
  }
  & .swiper-pagination-bullet-active-main {
    background: ${({ theme }) => theme.palette.main};
    opacity: 1;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    margin: 0 auto;
    align-items: center;
  }
`
const PreviewImgBase = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  overflow: hidden;
  background: ${({ theme }) => theme.background.skeleton};
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    & > img {
      width: auto;
    }
  }
`
const PreviewImg = styled(PreviewImgBase)`
  width: 100%;
  height: 410px;
  @media only screen and (${BREAKPOINTS.TABLET}) {
    width: auto;
    min-height: 410px;
    height: 410px;
    max-width: 100%;
    margin-bottom: 20px;
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    width: auto;
    min-height: 290px;
    height: 290px;
    max-width: 100%;
  }
`
const MiniPreviews = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin-top: 10px;
  max-width: 100%;
  & .swiper-button-next,
  & .swiper-button-prev {
    position: absolute;
    top: 50px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: ${({ theme }) => theme.palette.grey};
    border-radius: 100%;
    z-index: 100;
    cursor: pointer;
    opacity: 0.6;
    &.swiper-button-disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
  }
  & .swiper-button-prev {
    left: 2px;
    & > svg {
      transform: rotate(180deg);
    }
  }
  & .swiper-button-next {
    right: 2px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    width: 100%;
  }
`
const MiniPreview = styled(PreviewImgBase)`
  width: 80px;
  height: 80px;
  padding: 5px;
  margin: 0 auto;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
  border: ${({ isActive, theme }) => (isActive ? theme.border.primary : theme.border.card)};
  cursor: pointer;
  transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  & > img {
    border-radius: inherit;
  }
  &:hover {
    opacity: 1;
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
`
const Info = styled(Side)`
  flex-grow: 1;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
  & > form {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    margin-top: 10px;
  }
`
const Brand = styled('a')`
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: 400;
  text-shadow: ${({ theme }) => theme.textShadow.primary};
  transition: ${({ theme }) => `color ${theme.transition.fast}`};
  align-self: flex-start;
  &:hover,
  &:active {
    text-decoration: underline;
    color: ${({ theme }) => theme.palette.primary};
    transition: ${({ theme }) => `color ${theme.transition.fast}`};
  }
`
const Name = styled('h1')`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.fontSize.titleLarge};
  font-weight: 500;
  text-shadow: ${({ theme }) => theme.textShadow.primary};
`
const Article = styled('p')`
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.title};
  text-shadow: ${({ theme }) => theme.textShadow.headline};
  font-weight: 300;
  & > em {
    color: ${({ theme }) => theme.palette.primary};
    font-weight: 500;
    margin-left: 8px;
  }
`
const Status = styled('p')`
  color: ${({ theme, isAvailable }) => (isAvailable ? theme.palette.green : theme.palette.red)};
  font-size: ${({ theme }) => theme.fontSize.title};
  text-shadow: ${({ theme }) => theme.textShadow.headline};
  font-weight: 500;
`
const Wrap = styled(Container)`
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`
const Remark = styled('div')`
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.headline};
  font-weight: 300;
  @media only screen and (${BREAKPOINTS.TABLET}) {
    font-size: ${({ theme }) => theme.fontSize.body};
  }
`
const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
`
const TextBlock = styled('div')`
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`
const Description = styled('p')`
  display: flex;
  flex-flow: column nowrap;
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.title};
  text-shadow: ${({ theme }) => theme.textShadow.headline};
  font-weight: 300;
  margin-bottom: 20px;
  & br {
    display: block;
    content: '';
  }
  & ul {
    list-style: disc;
    padding-left: 30px;
    margin: 15px 0;
  }
  & ol {
    list-style: decimal;
    padding-left: 30px;
    margin: 15px 0;
  }
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    margin-bottom: 0;
  }
`
const Table = styled('table')`
  border: ${({ theme }) => theme.border.button};
  color: inherit;
  font-size: ${({ theme }) => theme.fontSize.body};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  width: 100%;
  &,
  & th,
  & tr,
  & td {
    border-collapse: collapse;
    padding: 8px 10px;
    border: ${({ theme }) => theme.border.button};
    text-align: left;
    font-weight: 300;
  }
  & tr > th {
    font-weight: 500;
  }
  & tr > td:first-child {
    font-weight: 400;
  }
`

// Component
const ProductsDetailGrid = props => {
  const { productData, productsRecommendData } = props

  const dispatch = useDispatch()

  const isTablet = useMediaQuery({ query: `(${BREAKPOINTS.TABLET})` })

  const name = propOr('', 'name', productData)
  const description = propOr('', 'description', productData)
  const isInstallmentPlan = prop('isInstallmentPlan', productData)
  const id = propOr(0, 'id', productData)
  const characteristics = propOr([], 'characteristics', productData)
  const vendorCode = propOr('00000000', 'vendorCode', productData)
  const brand = propOr({}, 'brand', productData)
  const brandName = propOr('', 'name', brand)
  const brandId = propOr(0, 'id', brand)
  const basicPrice = propOr(0, 'basicPrice', productData)
  const status = propOr({}, 'status', productData)
  const statusText = propOr('', 'name', status)
  const statusIsAvailable = propOr(true, 'isAvailable', status)
  const category = propOr({}, 'category', productData)
  const treeFrom = reverse(getTreeFrom({ startAlias: name }, category))
  const categoriesWayArr = [
    {
      title: 'Все товары',
      path: ROUTES.PRODUCTS_URL
    },
    ...treeFrom.map((i, index) => ({
      path: { pathname: `${ROUTES.PRODUCTS_URL}/` + pipe(take(index + 1), pluck('alias'), join('/'))(treeFrom) },
      ...i
    }))
  ]
  const categoriesWay = !isEmpty(categoriesWayArr) ? categoriesWayArr : []

  const detailUrl = getDetailUrlByItem(productData)

  const images = sortBy(propEq('isPrimary', false), propOr([], 'images', productData))
  const primaryImage = find(propEq('isPrimary', true), images)
  const firstImageId = path(['0', 'id'], images)
  const primaryImageId = propOr(firstImageId, 'id', primaryImage)

  const currentCartProduct = getCartProductByCartId(id)
  const currentCartCount = propOr(0, 'count', currentCartProduct)
  const initCount = currentCartCount !== 0 ? currentCartCount : 1

  const [count, setCount] = useState(initCount)
  const [selectedImgId, setSelectedImgId] = useState(primaryImageId)
  const [price, setPrice] = useState(basicPrice)

  useEffect(() => {
    setSelectedImgId(primaryImageId)
    setPrice(basicPrice)
    setCount(initCount)
  }, [id])

  const swiperConfig = {
    slidesPerView: 3,
    spaceBetween: 10,
    // centeredSlides: isTablet,
    loop: false,
    pagination: {
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      450: {
        slidesPerView: 4,
        spaceBetween: 15
      },
      550: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      650: {
        slidesPerView: 6,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 7,
        spaceBetween: 20
      },
      850: {
        slidesPerView: 8,
        spaceBetween: 20
      },
      950: {
        slidesPerView: 9,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10
      }
    }
  }

  const options = propOr([], 'options', productData)

  const initialOptions = options.reduce((acc, { name, fields }) => ((acc[name] = fields[0].id), acc), {})
  const initialValues = {
    ...initialOptions
  }

  const handleGetImageById = id => find(propEq('id', id), images)

  const handleCountMinus = () => setCount(count - 1)
  const handleCountPlus = () => setCount(count + 1)
  const handleSubmit = optionValues => {
    const selectedOptions = values(optionValues)
    const newProduct = {
      cartId: getCartId(id, selectedOptions),
      name,
      id,
      isInstallmentPlan,
      brandName: propOr('', 'name', brand),
      count,
      price,
      imageSrc: prop('image', primaryImage) || path(['0', 'image'], images),
      options,
      url: detailUrl
    }

    if (statusIsAvailable) {
      return dispatch(addCartProductAction(newProduct))
    } else {
      alert(CONST.PRODUCTS_UNAVAILABLE)
    }
  }

  const preview = (
    <Preview>
      <PreviewImg>
        <img
          src={propOr(noImage, 'image', handleGetImageById(selectedImgId))}
          alt={name}
          title={name}
          loading={'lazy'}
        />
      </PreviewImg>
      {!isEmpty(images) ? (
        <MiniPreviews>
          <Swiper {...swiperConfig}>
            {map(
              ({ image, id }) => (
                <SwiperSlide key={id}>
                  <MiniPreview isActive={selectedImgId === id} onClick={() => setSelectedImgId(id)}>
                    <img src={image} alt={name} title={name} loading={'lazy'} />
                  </MiniPreview>
                </SwiperSlide>
              ),
              images
            )}
            <div className={'swiper-button-next'}>
              <ChevronRight />
            </div>
            <div className={'swiper-button-prev'}>
              <ChevronRight />
            </div>
          </Swiper>
        </MiniPreviews>
      ) : null}
    </Preview>
  )

  const info = (
    <Info>
      <Link href={sprintf(ROUTES.PRODUCTS_BRANDS_ITEM_URL, brandId)} passHref>
        <Brand>{brandName}</Brand>
      </Link>
      <Name>{name}</Name>
      <Status isAvailable={statusIsAvailable}>{statusText}</Status>
      <Article>
        Артикул товара:
        <em>{vendorCode}</em>
      </Article>
      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <ProductDetailFields
          id={id}
          handleSubmit={handleSubmit}
          options={options}
          count={count}
          price={price}
          setPrice={setPrice}
          setCount={setCount}
          basicPrice={basicPrice}
          description={description}
          isInstallmentPlan={isInstallmentPlan}
          images={images}
          setSelectedImgId={setSelectedImgId}
          handleCountPlus={handleCountPlus}
          handleCountMinus={handleCountMinus}
        />
      </Form>
    </Info>
  )

  const descriptionEl = (
    <TextBlock>
      <Title>Описание</Title>
      <Description dangerouslySetInnerHTML={{ __html: description }} />
    </TextBlock>
  )

  const characteristicsEl = (
    <TextBlock>
      <Title>Характеристики</Title>
      <Table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          {mapIndexed((item, index) => {
            const key = propOr('Название неизвестно', 'key', item)
            const value = propOr('Значение неизвестно', 'value', item)
            return (
              <tr key={index}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            )
          }, characteristics)}
        </tbody>
      </Table>
    </TextBlock>
  )

  return (
    <Wrap>
      <Breadcrumbs way={categoriesWay} currentWay={name} />
      <Product>
        {preview}
        {info}
      </Product>
      {description && isTablet ? descriptionEl : null}
      {!isEmpty(characteristics) ? characteristicsEl : null}
      <Remark>
        У производителя остается право на изменение конструкции, дизайна и комплектующих без предварительного
        оповещения. Информация, размещенная на сайте, носит ознакомительный характер и не представляет собой публичную
        оферту.
      </Remark>
      <ProductsList title={'Рекомендуем'} alias={COLLECTIONS.RECOMMEND} data={productsRecommendData} />
    </Wrap>
  )
}

export default ProductsDetailGrid

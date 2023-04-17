import ProductsItem from 'components/products/item'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { isEmpty, map } from 'ramda'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import ChevronRight from 'media/icons/ChevronRight'
import { useRouter } from 'next/router'
import { sprintf } from 'sprintf-js'
import * as ROUTES from 'constants/routes'

// SwiperCore
SwiperCore.use([Pagination, Navigation])

// Styles
const Wrap = styled('div')`
  margin: 0;
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
  & .swiper-container {
    height: 100%;
  }
  & .swiper-wrapper {
    margin: 0 0 40px;
    align-items: stretch;
  }
  & .swiper-slide {
    height: auto;
    min-height: 100%;
  }
  & .swiper-pagination-bullet {
    background: ${({ theme }) => theme.background.pagination};
    opacity: 0.85;
  }
  & .swiper-pagination-bullet-active-main {
    background: ${({ theme }) => theme.palette.main};
    opacity: 1;
  }
  & .swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
    bottom: 10px;
  }
  & .swiper-button-next,
  & .swiper-button-prev {
    position: absolute;
    top: 110px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
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
    left: 5px;
    & > svg {
      transform: rotate(180deg);
    }
  }
  & .swiper-button-next {
    right: 5px;
  }
`
const List = styled('div')`
  position: relative;
`
const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.palette.primary};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
`

// Component
const ProductsList = props => {
  const { title = '', alias = '', data = [] } = props

  const router = useRouter()

  const swiperConfig = {
    spaceBetween: 10,
    slidesPerView: 2,
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
      500: {
        spaceBetween: 10,
        slidesPerView: 3
      },
      600: {
        spaceBetween: 20,
        slidesPerView: 3
      },
      800: {
        spaceBetween: 10,
        slidesPerView: 4
      },
      860: {
        spaceBetween: 20,
        slidesPerView: 4
      },
      1024: {
        spaceBetween: 20,
        slidesPerView: 5
      },
      1100: {
        spaceBetween: 30,
        slidesPerView: 5
      }
    }
  }

  const list = (
    <List>
      <Swiper {...swiperConfig}>
        {map(item => {
          const { id } = item
          return (
            <SwiperSlide key={id}>
              <ProductsItem item={item} />
            </SwiperSlide>
          )
        }, data)}
        <div className={'swiper-button-next'}>
          <ChevronRight />
        </div>
        <div className={'swiper-button-prev'}>
          <ChevronRight />
        </div>
      </Swiper>
    </List>
  )

  const handleRedirectToCollection = () => {
    router.push(sprintf(ROUTES.PRODUCTS_COLLECTIONS_ITEM_URL, alias)).then(() => window.scrollTo(0, 0))
  }

  if (!isEmpty(data)) {
    return (
      <Wrap>
        <Title onClick={handleRedirectToCollection}>{title}</Title>
        {list}
      </Wrap>
    )
  } else {
    return null
  }
}

export default ProductsList

import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import { isEmpty, map } from 'ramda'
import ChevronRight from 'media/icons/ChevronRight'

// SwiperCore
SwiperCore.use([Pagination, Autoplay, Navigation])

// SwiperConfig
const swiperConfig = {
  spaceBetween: 10,
  slidesPerView: 1,
  pagination: {
    clickable: true,
    dynamicBullets: true
  },
  autoplay: {
    delay: 10000
  },
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}

// Styles
const Wrap = styled('div')`
  & .swiper-container {
    height: 100%;
    padding-bottom: 20px;
  }
  & .swiper-slide {
    margin-bottom: 20px;
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
    bottom: 16px;
  }
  & .swiper-button-next,
  & .swiper-button-prev {
    position: absolute;
    top: calc(50% - 40px);
    transform: translateY(calc(-50% + 20px));
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
const ImgLink = styled('a')`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 0;
  padding-bottom: 39%;
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  overflow: hidden;
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    background: #eee;
  }
`

// Component
const Banner = props => {
  const { banners } = props

  if (banners && !isEmpty(banners)) {
    return (
      <Wrap>
        <Swiper {...swiperConfig}>
          {map(item => {
            const { photo, id, link, title } = item

            return (
              <SwiperSlide key={id}>
                <ImgLink href={link} target={'_blank'} rel={'noreferrer noopener'}>
                  <img src={photo} alt={title} title={title} loading={'lazy'} />
                </ImgLink>
              </SwiperSlide>
            )
          }, banners)}
          <div className={'swiper-button-next'}>
            <ChevronRight />
          </div>
          <div className={'swiper-button-prev'}>
            <ChevronRight />
          </div>
        </Swiper>
      </Wrap>
    )
  } else {
    return null
  }
}

export default Banner

import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import CallIcon from 'media/icons/CallIcon'
import TelegramIcon from 'media/icons/TelegramIcon'
import Link from 'next/link'
import * as ROUTES from 'constants/routes'
import LogoSVG from 'media/svg/LogoSVG'
import Menu from 'components/menu'
import Cart from 'components/cart'
import Form from 'components/form'
import SearchBar from 'components/fields/searchBar'
import { useSelector } from 'react-redux'
import { prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import { useRouter } from 'next/router'
import { paramsToSearch } from 'tools/url'
import DeliveryIcon from 'media/icons/DeliveryIcon'
import WalletIcon from 'media/icons/WalletIcon'
import { sprintf } from 'sprintf-js'
import * as BREAKPOINTS from 'constants/breakpoints'
import { useMediaQuery } from 'react-responsive'
import MenuHamburger from 'components/menuHamburger'
import SearchIcon from 'media/icons/SearchIcon'
import XIcon from 'media/icons/XIcon'

// Animations
const loadingAnimation = keyframes`
  0% {right: 100%; width: 10%;}
  50% {right: 30%; width: 40%;}
  100% {right: 0; width: 10%;}
`

// Styles
export const Header = styled('header')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: ${({ theme }) => theme.height.header.desktop};
  transform: ${({ hide }) => hide && 'translateY(-100%)'};
  transition: ${({ theme }) => `transform ${theme.transition.long}`};
  @media only screen and (${BREAKPOINTS.TABLET}) {
    height: ${({ theme }) => theme.height.header.tablet};
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    height: ${({ theme }) => theme.height.header.mobile};
  }
`
const HeaderSide = styled('div')`
  position: fixed;
  left: 0;
  right: 0;
`
const Inner = styled('div')`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: ${({ theme }) => theme.width.wrap};
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 15px;
`
const Info = styled(HeaderSide)`
  top: 0;
  height: ${({ theme }) => theme.height.headerInfo.desktop};
  background: ${({ theme }) => theme.background.headerInfo};
  & > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    height: ${({ theme }) => theme.height.headerInfo.tablet};
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    display: none;
  }
`
const InfoSide = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  &:not(:last-child) {
    margin-right: 20px;
  }
  & > *:not(:last-child) {
    margin-right: 20px;
  }
`
const InfoLeft = styled(InfoSide)`
  justify-content: flex-start;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    justify-content: space-between;
    width: 100%;
    & > *:not(:last-child) {
      margin: 0 10px 0 0;
    }
  }
`
const InfoRight = styled(InfoSide)`
  justify-content: flex-end;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    & > *:not(:last-child) {
      margin: 0 10px 0 0;
    }
  }
`
const Nav = styled(HeaderSide)`
  position: relative;
  top: ${({ theme }) => theme.height.headerInfo.desktop};
  height: ${({ theme }) => theme.height.headerNav.desktop};
  background: ${({ theme }) => theme.background.headerNav};
  color: ${({ theme }) => theme.color.headerNav};
  border-bottom: ${({ theme }) => `1px solid ${theme.background.secondary}`};
  @media only screen and (${BREAKPOINTS.TABLET}) {
    top: ${({ theme }) => theme.height.headerInfo.tablet};
    height: ${({ theme }) => theme.height.headerNav.tablet};
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    top: 0;
    height: ${({ theme }) => theme.height.headerNav.mobile};
  }
`
const NavMobileButtons = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  margin-left: auto;
  & > * {
    height: 100%;
  }
`
const Loader = styled('div')`
  display: ${({ loading }) => loading === 'false' && 'none'};
  position: fixed;
  content: '';
  left: 0;
  right: 0;
  top: 0;
  background: ${({ theme }) => theme.palette.white};
  height: 3px;
  z-index: 10000;
  &:before {
    content: '';
    position: fixed;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.palette.primary};
    right: 120%;
    z-index: 100;
    top: 0;
    animation: ${loadingAnimation} linear 5s infinite;
  }
`
const LogoLink = styled('a')`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 26px;
  font-weight: 300;
  line-height: 100%;
  user-select: none;
  margin-right: 30px;
  transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  &:active {
    opacity: ${({ theme }) => theme.opacity.linkActive};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    margin-right: 20px;
    & svg {
      height: 25px;
    }
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    & svg {
      height: 25px;
    }
  }
`
const InfoLink = styled('a')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  user-select: none;
  height: 100%;
  transition: ${({ theme }) => `all ${theme.transition.fast}`};
  & svg {
    font-size: 16px;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.palette.primary};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
`
const SearchBarDesktop = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
`
const SearchBarMobile = styled('div')`
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  right: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  height: 45px;
  padding: 0 15px;
  background: ${({ theme }) => theme.background.headerNav};
  & > form {
    width: 100%;
  }
`
const SearchMobileButton = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;
  user-select: none;
`

// Component
const NavBar = props => {
  const { loading } = props

  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)
  const [headerHide, setHeaderHide] = useState(false)

  useEffect(() => {
    const scrollListener = () => {
      const defaultOffset = 200
      const scrollPosition = typeof document !== 'undefined' ? document?.documentElement.scrollTop : null

      if (!searchIsOpen && scrollPosition > lastScroll && !headerHide && scrollPosition > defaultOffset) {
        setHeaderHide(true)
      } else if (scrollPosition < lastScroll && headerHide) {
        setHeaderHide(false)
      }
      setLastScroll(scrollPosition)
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [lastScroll, searchIsOpen])

  const isTablet = useMediaQuery({ query: `(${BREAKPOINTS.TABLET})` })
  const isMobile = useMediaQuery({ query: `(${BREAKPOINTS.MOBILE})` })

  const router = useRouter()
  const queries = propOr({}, 'query', router)
  const pathname = router.pathname

  const isProductsByCategory = pathname.startsWith(ROUTES.PRODUCTS_URL)
  const isProductsByBrand =
    pathname.startsWith(ROUTES.BRANDS_URL) && `${pathname}`.length > `${ROUTES.BRANDS_URL}`.length
  const isProductsUrl = isProductsByCategory || isProductsByBrand

  const searchQuery = propOr('', ROUTES.SEARCH_QUERY, queries)

  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const workTimeStart = propOr('09:00', 'WORK_TIME_START', configsData)
  const workTimeEnd = propOr('18:00', 'WORK_TIME_END', configsData)
  const workTimePrompt = propOr('', 'WORK_TIME_PROMPT', configsData)
  const deliveryRegion = propOr('Ташкент', 'DELIVERY_REGION', configsData)
  const deliveryRegionPrompt = propOr('', 'DELIVERY_REGION_PROMPT', configsData)
  const phoneNumber = propOr('', 'PHONE_NUMBER', configsData)
  const phoneText = propOr('', 'PHONE_TEXT', configsData)
  const telegramLink = propOr('#', 'TELEGRAM_LINK', configsData)
  const telegramText = !isTablet ? propOr('', 'TELEGRAM_TEXT', configsData) : 'Telegram'

  const searchBarMobileRef = useRef(null)

  useEffect(() => {
    const listener = event => {
      if (searchBarMobileRef.current && searchIsOpen) {
        if (!searchBarMobileRef.current.contains(event.target)) {
          setSearchIsOpen(false)
        }
      }
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [searchIsOpen])

  const handleSubmit = ({ search = '' }) => {
    const { aliases, alias, ...restQueries } = queries
    const aliasesStr = aliases?.join('/') || ''
    const aliasStr = alias || ''

    const pathname = isProductsByCategory
      ? sprintf(ROUTES.PRODUCTS_SLUG_URL, aliasesStr)
      : isProductsByBrand
      ? sprintf(ROUTES.BRANDS_ITEM_URL, aliasStr)
      : ROUTES.PRODUCTS_URL

    const query = isProductsUrl ? paramsToSearch({ ...restQueries, search }) : paramsToSearch({ search })

    router.push({ pathname, query }).then(() => window.scrollTo(0, 0))
  }

  const restInfoLinks = (
    <>
      <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.DELIVERY_ALIAS)} passHref>
        <InfoLink>
          <DeliveryIcon />
          <span>Доставка</span>
        </InfoLink>
      </Link>
      <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.PAYMENT_ALIAS)} passHref>
        <InfoLink>
          <WalletIcon />
          <span>Оплата</span>
        </InfoLink>
      </Link>
    </>
  )

  const info = (
    <Info>
      <Inner>
        <InfoLeft>
          <InfoLink href={`tel:${phoneNumber}`}>
            <CallIcon />
            <span>{phoneText}</span>
          </InfoLink>
          <InfoLink target={'_blank'} rel={'noreferrer noopener'} href={telegramLink}>
            <TelegramIcon />
            <span>{telegramText}</span>
          </InfoLink>
          {!isTablet ? restInfoLinks : null}
        </InfoLeft>
        {!isMobile ? (
          <InfoRight>
            <span title={workTimePrompt}>
              Приём заказов с <b>{workTimeStart}</b> до <b>{workTimeEnd}</b>
            </span>
            {isMobile ? (
              <b title={deliveryRegionPrompt}>{deliveryRegion}</b>
            ) : (
              <span title={deliveryRegionPrompt}>
                Регион: <b>{deliveryRegion}</b>
              </span>
            )}
          </InfoRight>
        ) : null}
      </Inner>
    </Info>
  )

  const logo = (
    <Link href={ROUTES.ROOT_URL} passHref>
      <LogoLink>
        <LogoSVG />
      </LogoLink>
    </Link>
  )

  const searchFields = (
    <Form initialValues={{ search: searchQuery }} onSubmit={handleSubmit}>
      <SearchBar />
    </Form>
  )

  const navDesktop = (
    <Nav>
      <Inner>
        {logo}
        <SearchBarDesktop>{searchFields}</SearchBarDesktop>
        <Cart />
      </Inner>
    </Nav>
  )

  const navMobile = (
    <Nav>
      <Inner>
        {logo}
        <NavMobileButtons>
          <SearchMobileButton onClick={() => setSearchIsOpen(!searchIsOpen)}>
            {searchIsOpen ? <XIcon /> : <SearchIcon />}
          </SearchMobileButton>
          <Cart />
          <MenuHamburger />
        </NavMobileButtons>
      </Inner>
      {searchIsOpen ? <SearchBarMobile ref={searchBarMobileRef}>{searchFields}</SearchBarMobile> : null}
    </Nav>
  )

  const nav = isTablet ? navMobile : navDesktop

  const menu = !isTablet ? <Menu alwaysClose={headerHide} /> : null

  return (
    <>
      <Loader loading={`${loading}`} />
      <Header hide={headerHide}>
        {info}
        {nav}
        {menu}
      </Header>
    </>
  )
}

export default NavBar

import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import Portal from 'components/portal/Portal'
import * as PORTALS from 'constants/portals'
import * as BREAKPOINTS from 'constants/breakpoints'
import * as ROUTES from 'constants/routes'
import MenuIcon from 'media/icons/MenuIcon'
import LogoSVG from 'media/svg/LogoSVG'
import XIcon from 'media/icons/XIcon'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { map, prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import { useRouter } from 'next/router'
import { createSlugsPath } from 'tools/url'
import { getFullTreeForItem } from 'tools/find'

// Styles
const MenuButton = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  ${({ styles }) => styles};
`
const MenuDropdown = styled('div')`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? 0 : '-100%')};
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
  background: ${({ theme }) => theme.background.headerMenuMobile};
  color: ${({ theme }) => theme.color.headerMenuMobile};
  padding: ${({ theme }) => `${theme.height.headerInfo.tablet} 0 0`};
  z-index: 10000;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    padding: ${({ theme }) => `${theme.height.headerInfo.mobile} 0 0`};
  }
`
const MenuDropdownHeader = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  min-height: ${({ theme }) => theme.height.headerNav.tablet};
  height: ${({ theme }) => theme.height.headerNav.tablet};
  padding: 0 15px;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    min-height: ${({ theme }) => theme.height.headerNav.mobile};
    height: ${({ theme }) => theme.height.headerNav.mobile};
  }
`
const BGMask = styled('div')`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.background.mask};
  opacity: ${({ open }) => (open ? 1 : 0)};
  z-index: ${({ open }) => (open ? 1000 : -1000)};
  display: ${({ open }) => (open ? 'block' : 'none')};
`
const LogoLink = styled('a')`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 300;
  line-height: 100%;
  user-select: none;
  transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  font-size: 24px;
  margin-right: 20px;
  &:active {
    opacity: ${({ theme }) => theme.opacity.linkActive};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    font-size: 22px;
  }
`
const MenuItems = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex-grow: 1;
  padding: 0 15px 30px;
  margin: 0 0 5px;
  overflow-y: auto;
  width: 100%;
`
const MenuItem = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.headline};
  min-height: 40px;
  padding: 10px;
  background: transparent;
  margin-bottom: 5px;
  cursor: pointer;
  width: 100%;
  user-select: none;
  color: ${({ theme, isActive }) => isActive && theme.palette.primaryLight};
  text-decoration: ${({ isActive }) => isActive && 'underline'};
  transition: ${({ theme }) => `color ${theme.transition.fast}`};
  &:hover {
    color: ${({ theme }) => theme.palette.primary};
    text-decoration: underline;
    transition: ${({ theme }) => `color ${theme.transition.fast}`};
  }
`

// Component
const MenuHamburger = () => {
  const router = useRouter()
  const queries = propOr({}, 'query', router)
  const pathname = propOr('/', 'pathname', router)
  const categoryQuery = propOr('', ROUTES.CATEGORY_QUERY, queries)

  const [isOpen, setIsOpen] = useState(null)

  const categories = useSelector(prop(STATES.CATEGORIES))
  const categoriesData = propOr([], 'data', categories)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'hidden scroll'
    }
  }, [isOpen])

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handlerRedirect = id => {
    handleClose()
    const newPathname = id
      ? sprintf(ROUTES.PRODUCTS_SLUG_URL, createSlugsPath(getFullTreeForItem(categoriesData, id)))
      : ROUTES.PRODUCTS_URL
    return router.push(newPathname).then(() => window.scrollTo(0, 0))
  }

  // Некорректное значение isActive?!
  return (
    <>
      <MenuButton onClick={handleOpen}>
        <MenuIcon />
      </MenuButton>
      <Portal selector={PORTALS.MENU_PORTAL}>
        <MenuDropdown open={isOpen}>
          <MenuDropdownHeader>
            <Link href={ROUTES.ROOT_URL} passHref>
              <LogoLink>
                <LogoSVG />
              </LogoLink>
            </Link>
            <MenuButton styles={{ marginLeft: 'auto' }} onClick={handleClose}>
              <XIcon />
            </MenuButton>
          </MenuDropdownHeader>
          <MenuItems>
            <MenuItem isActive={pathname === ROUTES.PRODUCTS_URL && !categoryQuery} onClick={() => handlerRedirect()}>
              Все товары
            </MenuItem>
            {map(({ name, id }) => {
              return (
                <MenuItem isActive={+id === +categoryQuery} onClick={() => handlerRedirect(id)} key={id}>
                  {name}
                </MenuItem>
              )
            }, categoriesData)}
          </MenuItems>
        </MenuDropdown>
        <BGMask onClick={handleClose} open={isOpen} />
      </Portal>
    </>
  )
}

export default MenuHamburger

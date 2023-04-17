import styled, { keyframes } from 'styled-components'
import MenuItem from 'components/menu/item'
import { useState } from 'react'
import MenuDropdownCategory from 'components/menu/dropdownCategory'
import { find, isEmpty, map, prop, propEq, propOr } from 'ramda'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import Masonry from 'react-masonry-css'
import * as ROUTES from 'constants/routes'
import { createSlugsPath } from 'tools/url'
import { getFullTreeForItem } from 'tools/find'

// Animations
const animation = keyframes`
  0% {
    display: none;
    opacity: 0;
    pointer-events: none;
  }
  70% {
    display: none;
    opacity: 0;
    pointer-events: none;
  }
  100% {
    display: block;
    opacity: 1;
    pointer-events: unset;
  }
`

// Styles
const Wrap = styled('nav')`
  position: fixed;
  left: 0;
  right: 0;
  top: ${({ theme }) => `calc(${theme.height.headerInfo.desktop} + ${theme.height.headerNav.desktop})`};
  height: ${({ theme }) => theme.height.headerMenu.desktop};
  background: ${({ theme }) => theme.background.headerMenu};
  border-bottom: ${({ theme }) => `1px solid ${theme.background.primary}`};
`
const Inner = styled('div')`
  position: relative;
  width: ${({ theme }) => theme.width.wrap};
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 15px;
`
const MenuItems = styled(Inner)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const DropdownPosition = styled('div')`
  position: fixed;
  top: ${({ theme }) =>
    `calc(${theme.height.headerInfo.desktop} + ${theme.height.headerNav.desktop} + ${theme.height.headerMenu.desktop})`};
  left: 0;
  right: 0;
  animation: ${animation} 0.3s linear;
`
const MenuDropdown = styled(DropdownPosition)`
  height: ${({ theme }) => theme.height.menuDropdown};
  background: ${({ theme }) => theme.palette.white};
  z-index: 1000;
  transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
`
const BGMask = styled(DropdownPosition)`
  bottom: 0;
  background: ${({ theme }) => theme.background.mask};
  z-index: 100;
  transition: ${({ theme }) => `opacity ${theme.transition.long}`};
`
const MenuDropdownInner = styled(Masonry)`
  position: relative;
  width: ${({ theme }) => theme.width.wrap};
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 15px 15px 7px;
  overflow: hidden;
`

// Component
const Menu = props => {
  const { alwaysClose = false } = props

  const [openId, setOpenId] = useState(null)

  const categories = useSelector(prop(STATES.CATEGORIES))
  const categoriesData = propOr([], 'data', categories)

  const selectedCategory = find(propEq('id', openId), categoriesData)
  const selectedCategoryChildren = propOr([], 'children', selectedCategory)
  const hasChildren = !isEmpty(selectedCategoryChildren)

  const isOpen = !alwaysClose && openId && hasChildren

  const handleOpen = id => setOpenId(id)
  const handleClose = () => setOpenId(null)

  const menuItems = map(
    ({ name, id }) => (
      <MenuItem
        path={sprintf(ROUTES.PRODUCTS_SLUG_URL, createSlugsPath(getFullTreeForItem(categoriesData, id)))}
        key={id}
        name={name}
        isActive={id === openId}
        onMouseEnter={() => handleOpen(id)}
      />
    ),
    categoriesData
  )

  const menuDropdown = (
    <MenuDropdown>
      <MenuDropdownInner breakpointCols={5}>
        {map(
          ({ name, id, children }) => (
            <MenuDropdownCategory key={id} head={name} id={id} categories={children} />
          ),
          selectedCategoryChildren
        )}
      </MenuDropdownInner>
    </MenuDropdown>
  )

  return (
    <Wrap onClick={handleClose} onMouseLeave={handleClose}>
      {isOpen ? <BGMask onMouseEnter={handleClose} /> : null}
      <MenuItems>
        {menuItems}
        {isOpen ? menuDropdown : null}
      </MenuItems>
    </Wrap>
  )
}

export default Menu

import styled from 'styled-components'
import CartIcon from 'media/icons/CartIcon'
import Link from 'next/link'
import * as ROUTES from 'constants/routes'
import { prop, propOr } from 'ramda'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import * as BREAKPOINTS from 'constants/breakpoints'

// Styles
const Inner = styled('a')`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin-left: auto;
  user-select: none;
  transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  & > svg {
    margin-right: 8px;
    font-size: 20px;
  }
  &:active {
    opacity: ${({ theme }) => theme.opacity.linkActive};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    padding: 0 10px;
    & > svg {
      margin-right: 0;
    }
    & > span {
      display: none;
      margin: 0;
    }
  }
`
const Count = styled('b')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
  border-radius: 100%;
  background: ${({ theme }) => theme.palette.white};
  color: ${({ theme }) => theme.palette.black};
  margin-left: 8px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.1;
  padding: 2px;
  user-select: none;
  transition: ${({ theme }) => `all ${theme.transition.fast}`};
  @media only screen and (${BREAKPOINTS.TABLET}) {
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    right: 0;
    margin: 0;
    min-width: 16px;
    height: 16px;
    font-size: 8px;
  }
`

// Component
const Cart = () => {
  const cart = useSelector(prop(STATES.CART))
  const count = propOr(0, 'count', cart)

  return (
    <Link href={ROUTES.CART_URL} passHref>
      <Inner>
        <CartIcon />
        <span>Корзина</span>
        <Count>{count}</Count>
      </Inner>
    </Link>
  )
}

export default Cart

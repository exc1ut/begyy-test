import styled from 'styled-components'
import numberFormat from 'tools/numberFormat'
import { useRouter } from 'next/router'
import TrashIcon from 'media/icons/TrashIcon'
import MinusIcon from 'media/icons/MinusIcon'
import PlusIcon from 'media/icons/PlusIcon'
import { useDispatch, useSelector } from 'react-redux'
import { path, prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import noImage from 'media/images/no-image.png'
import * as CONST from 'constants/constants'
import { getCartId, getCartProductByCartId, hasInCart } from 'tools/cart'
import {
  addCartProductAction,
  removeCartProductByCartIdAction,
  setMinusCountCartProduct,
  setPlusCountCartProduct
} from 'redux/actions/cartActions'
import * as BREAKPOINTS from 'constants/breakpoints'
import Link from 'next/link'
import { getDetailUrlByItem } from 'tools/find'

// Styles
const Wrap = styled('a')`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  cursor: pointer;
  width: 100%;
  height: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  background: ${({ theme }) => theme.background.primary};
`
const Img = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  background: ${({ theme }) => theme.background.skeleton};
  overflow: hidden;
  margin-bottom: 8px;
  border: ${({ theme }) => theme.border.card};
  height: 0;
  padding-bottom: 100%;
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const Caption = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 56px;
  flex-grow: 1;
  width: 100%;
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
`
const CaptionItem = styled('div')`
  font-size: ${({ theme }) => theme.fontSize.body};
  text-shadow: ${({ theme }) => theme.textShadow.primary};
`
const Brand = styled(CaptionItem)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.secondary};
  margin-top: auto;
  font-size: ${({ theme }) => theme.fontSize.caption};
`
const Name = styled(CaptionItem)`
  font-weight: 500;
  margin-bottom: 5px;
`
const Price = styled(CaptionItem)`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.primary};
  margin-right: 5px;
`
const Prices = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    & > *:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`
const ToCart = styled(CaptionItem)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: stretch;
  user-select: none;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    width: 100%;
  }
`
const Button = styled('button')`
  padding: 5px 8px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.button};
  font-size: ${({ theme }) => theme.fontSize.caption};
  border: ${({ theme }) => `1px solid ${theme.background.primary}`};
  background: ${({ theme }) => theme.background.button};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  white-space: nowrap;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    padding: 8px 10px;
    font-weight: 500;
    letter-spacing: 0.5px;
    width: 100%;
  }
`
const CartControls = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    width: 100%;
    justify-content: space-between;
    & > * {
      padding: 8px;
      font-weight: 500;
    }
  }
`
const CartControl = styled('button')`
  border: ${({ theme, primary, isDelete }) =>
    primary
      ? `1px solid ${theme.background.primary}`
      : isDelete
      ? `1px solid ${theme.palette.redLight}`
      : theme.border.button};
  background: ${({ theme, primary }) => (primary ? theme.background.button : 'transparent')};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  & > svg {
    font-size: 14px;
    stroke-width: ${({ isDelete }) => (isDelete ? '2px' : '3px')};
    color: ${({ theme, primary, isDelete }) =>
      primary ? theme.palette.white : isDelete ? theme.palette.red : theme.color.primary};
  }
`
const CartCount = styled(CaptionItem)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 500;
  margin: 0 5px;
`

// Component
const ProductsItem = props => {
  const { item } = props

  const router = useRouter()

  const dispatch = useDispatch()

  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const currency = propOr('сум', 'CURRENCY', configsData)

  const basicPrice = prop('basicPrice', item)
  const name = prop('name', item)
  const id = prop('id', item)
  const isInstallmentPlan = prop('isInstallmentPlan', item)
  const brandName = path(['brand', 'name'], item)
  const imageSrc = propOr(noImage, 'image', item)
  const hasAddedPrice = prop('hasAddPrice', item)
  const hasOptions = prop('hasOptions', item)
  const status = propOr({}, 'status', item)
  const statusIsAvailable = propOr(true, 'isAvailable', status)

  const detailUrl = getDetailUrlByItem(item)

  const cartId = getCartId(id)

  const formattedPrice = numberFormat(basicPrice, currency)
  const priceText = hasAddedPrice ? `от ${formattedPrice}` : formattedPrice
  const count = propOr(0, 'count', getCartProductByCartId(cartId))
  const isDelete = count <= 1

  const handleRedirectToDetail = ev => {
    ev.preventDefault()
    router.push(detailUrl).then(() => window.scrollTo(0, 0))
  }

  const cartProduct = {
    cartId,
    name,
    id,
    isInstallmentPlan,
    brandName,
    count: 1,
    price: basicPrice,
    imageSrc,
    options: [],
    url: detailUrl
  }

  const handleAddToCart = ev => {
    ev.preventDefault()
    if (statusIsAvailable) {
      dispatch(addCartProductAction(cartProduct))
    } else {
      alert(CONST.PRODUCTS_UNAVAILABLE)
    }
  }
  const handleRemoveFromCart = ev => {
    ev.preventDefault()
    dispatch(removeCartProductByCartIdAction(cartId))
  }
  const handlePlus = ev => {
    ev.preventDefault()
    dispatch(setPlusCountCartProduct(cartId))
  }
  const handleMinus = ev => {
    ev.preventDefault()
    dispatch(setMinusCountCartProduct(cartId))
  }

  const caption = (
    <Caption>
      <Name>{name}</Name>
      <Brand>{brandName}</Brand>
      <Prices>
        <Price>{priceText}</Price>
        <ToCart>
          {hasOptions || !statusIsAvailable ? (
            <Button onClick={handleRedirectToDetail} title={CONST.BUTTON_DETAIL_PROMPT}>
              Подробнее
            </Button>
          ) : hasInCart(cartId) ? (
            <CartControls>
              <CartControl onClick={isDelete ? handleRemoveFromCart : handleMinus} isDelete={isDelete}>
                {isDelete ? <TrashIcon fill={'red'} /> : <MinusIcon />}
              </CartControl>
              <CartCount>{count}</CartCount>
              <CartControl primary onClick={handlePlus}>
                <PlusIcon />
              </CartControl>
            </CartControls>
          ) : (
            <Button onClick={handleAddToCart}>В корзину</Button>
          )}
        </ToCart>
      </Prices>
    </Caption>
  )

  return (
    <Link href={detailUrl} passHref>
      <Wrap>
        <Img>
          <img src={imageSrc} alt={name} title={name} loading={'lazy'} />
        </Img>
        {caption}
      </Wrap>
    </Link>
  )
}

export default ProductsItem

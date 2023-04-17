import styled from 'styled-components'
import numberFormat from 'tools/numberFormat'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import TrashIcon from 'media/icons/TrashIcon'
import MinusIcon from 'media/icons/MinusIcon'
import PlusIcon from 'media/icons/PlusIcon'
import { useDispatch, useSelector } from 'react-redux'
import { find, isEmpty, map, prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import {
  removeCartProductByCartIdAction,
  setMinusCountCartProduct,
  setPlusCountCartProduct
} from 'redux/actions/cartActions'
import noImage from 'media/images/no-image.png'
import { parseCartId } from 'tools/cart'
import * as BREAKPOINTS from 'constants/breakpoints'
import { ZOODPAY } from '../../../constants/constants'

// Styles
const Caption = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  flex-grow: 1;
`
const CartControl = styled('button')`
  width: 28px;
  height: 28px;
  min-height: 28px;
  min-width: 28px;
  max-width: 28px;
  max-height: 28px;
  border: ${({ theme, primary, isDelete }) =>
    primary
      ? `1px solid ${theme.background.primary}`
      : isDelete
      ? `1px solid ${theme.palette.redLight}`
      : theme.border.button};
  background: ${({ theme, primary }) => (primary ? theme.background.button : 'transparent')};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  margin-right: ${({ isDelete }) => isDelete && '10px'};
  &:disabled {
    cursor: not-allowed;
  }
  & > svg {
    font-size: 14px;
    stroke-width: ${({ isDelete }) => (isDelete ? '2px' : '3px')};
    color: ${({ theme, primary, isDelete }) =>
      primary ? theme.palette.white : isDelete ? theme.palette.red : theme.color.primary};
  }
`

const Wrap = styled('div')`
  position: relative;
  width: 100%;
  & .switch {
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  }
  display: flex;
  flex-flow: row nowrap;
  cursor: pointer;
  background: ${({ theme }) => theme.background.primary};
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    flex-flow: column nowrap;
  }
`
const Img = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  background: ${({ theme }) => theme.background.skeleton};
  overflow: hidden;
  border: ${({ theme }) => theme.border.card};
  margin-right: 20px;
  height: 100px;
  min-width: 100px;
  width: 100px;
  & > img {
    max-width: 100%;
    max-height: 100%;
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    height: 90px;
    min-width: 90px;
    width: 90px;
    margin-right: 10px;
  }
`
const CaptionItem = styled('div')`
  font-size: ${({ theme }) => theme.fontSize.body};
  text-shadow: ${({ theme }) => theme.textShadow.primary};
`
const Brand = styled(CaptionItem)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.caption};
  margin-bottom: 5px;
`
const Name = styled(CaptionItem)`
  font-weight: 500;
  margin-bottom: 5px;
`
const Options = styled('div')`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`
const OptionsItem = styled(CaptionItem)`
  margin: 0 5px 5px 0;
  & > b {
    font-weight: 500;
    text-transform: uppercase;
    font-style: italic;
    color: ${({ theme }) => theme.palette.primary};
  }
  &:not(:last-child):after {
    content: ',';
  }
`
const Price = styled(CaptionItem)`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.primary};
  margin-right: 10px;
`
const Prices = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const ToCart = styled(CaptionItem)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: stretch;
  margin-left: auto;
  user-select: none;
`
const CartControls = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
`
const CartCount = styled(CaptionItem)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 500;
  margin: 0 5px;
`

const DisText = styled.p`
  font-weight: 600;
  font-size: 16px;
`

// Component
const ProductsTile = props => {
  const { item, paymentType } = props
  const { url, brandName, name, price, count = 0, isInstallmentPlan, cartId, options } = item

  const isZoodPay = paymentType === ZOODPAY
  const disabled = isZoodPay && !isInstallmentPlan
  const itemRef = useRef(null)
  const toCartRef = useRef(null)

  const router = useRouter()

  const dispatch = useDispatch()

  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const currency = propOr('сум', 'CURRENCY', configsData)

  const parsedCartId = parseCartId(cartId)
  const selectedOptions = propOr([], 'options', parsedCartId)

  useEffect(() => {
    const listener = event => {
      if (itemRef?.current?.contains(event.target) && !toCartRef?.current?.contains(event.target)) {
        router.push(url).then(() => window.scrollTo(0, 0))
      }
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [])

  const imgSrc = propOr(noImage, 'imageSrc', item)

  const priceText = numberFormat(price, currency)
  const totalPriceText = numberFormat(price * count, currency)
  const isLast = count <= 1
  const moreOne = `${priceText} x ${count} ед. = ${totalPriceText}`

  const handleRemove = () => dispatch(removeCartProductByCartIdAction(cartId))
  const handlePlus = () => dispatch(setPlusCountCartProduct(cartId))
  const handleMinus = () => dispatch(setMinusCountCartProduct(cartId))

  const controls = (
    <ToCart ref={toCartRef}>
      <CartControls>
        <CartControl type={'button'} onClick={handleRemove} isDelete>
          <TrashIcon fill={'red'} />
        </CartControl>
        {disabled ? (
          <DisText>Недоступно в рассрочку</DisText>
        ) : (
          <>
            <CartControl type={'button'} disabled={isLast} onClick={handleMinus}>
              <MinusIcon />
            </CartControl>
            <CartCount>{count}</CartCount>
            <CartControl type={'button'} primary onClick={handlePlus}>
              <PlusIcon />
            </CartControl>
          </>
        )}
      </CartControls>
    </ToCart>
  )

  const optionsEl = (
    <Options className={'switch'}>
      {map(item => {
        const title = propOr('Опция', 'title', item)
        const id = propOr(0, 'id', item)
        const fields = propOr([], 'fields', item)

        return map(fieldItem => {
          const selectedField = find(x => +x === +prop('id', fieldItem), selectedOptions)
          const isSelectedField = +prop('id', fieldItem) === +selectedField
          const fieldLabel = propOr('', 'label', fieldItem)

          if (isSelectedField) {
            return (
              <OptionsItem key={id}>
                {title}: <b>{fieldLabel}</b>
              </OptionsItem>
            )
          } else {
            return null
          }
        }, fields)
      }, options)}
    </Options>
  )

  const caption = (
    <Caption>
      <Name>{name}</Name>
      <Brand className={'switch'}>{brandName}</Brand>
      {!isEmpty(options) ? optionsEl : null}
      <Prices>
        <Price className={'switch'}>{count > 1 ? moreOne : priceText}</Price>
        {controls}
      </Prices>
    </Caption>
  )

  return (
    <Wrap ref={itemRef} disabled={disabled}>
      <Img className={'switch'}>
        <img src={imgSrc} alt={name} title={name} loading={'lazy'} />
      </Img>
      {caption}
    </Wrap>
  )
}

export default ProductsTile

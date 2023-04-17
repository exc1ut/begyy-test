import OptionsFields from 'components/fields/options'
import MinusIcon from 'media/icons/MinusIcon'
import PlusIcon from 'media/icons/PlusIcon'
import styled from 'styled-components'
import { find, isNil, map, pipe, prop, propEq, propOr, sum, values } from 'ramda'
import React, { useEffect, useState } from 'react'
import numberFormat from 'tools/numberFormat'
import { useDispatch, useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import { getCartId, getCartProductByCartId, hasInCart } from 'tools/cart'
import TrashIcon from 'media/icons/TrashIcon'
import { removeCartProductByCartIdAction } from 'redux/actions/cartActions'
import { textTrim } from 'tools/text'
import { useMediaQuery } from 'react-responsive'
import * as BREAKPOINTS from 'constants/breakpoints'
import useCompareEffect from 'hooks/useCompareEffect'
import ChevronRight from '../../../../media/icons/ChevronRight'
import { useRouter } from 'next/router'
import * as ROUTES from '../../../../constants/routes'

// Styles
const OptionsWrap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  margin-bottom: 15px;
`
const Line = styled('hr')`
  margin-top: auto;
  width: 100%;
  border: ${({ theme }) => theme.border.hr};
`
const Mark = styled.mark`
  font-weight: 600;
  padding: 6px;
  color: #1f1f26;
  border-radius: 8px;
  background-color: #ff0;
`
const PriceWithCartWrap = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;
    margin: 0;
    & > *:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`
const Price = styled('div')`
  padding-top: 4px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.primary};
`
const Count = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  font-size: ${({ theme }) => theme.fontSize.title};
  line-height: 1.2;
  font-weight: 700;
  color: ${({ theme }) => theme.color.secondary};
  margin: 0 5px;
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    flex-grow: 1;
  }
`
const CartWrap = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
  & > *:not(:last-child) {
    margin-right: 20px;
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;
    & > *:not(:last-child) {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
`
const CartControls = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
`
const CartAddButton = styled('button')`
  padding: 0 20px;
  height: 40px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.white};
  font-size: ${({ theme }) => theme.fontSize.caption};
  border: ${({ theme }) => `1px solid ${theme.background.primary}`};
  background: ${({ theme }) => theme.background.button};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-size: ${({ theme }) => theme.fontSize.headline};
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    width: 100%;
  }
`

const InstallmentsAddButton = styled('button')`
  padding: 12px 20px;
  line-height: 1.6;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.black};
  font-size: ${({ theme }) => theme.fontSize.caption};
  border: ${({ theme }) => `1px solid ${theme.background.primary}`};
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-size: ${({ theme }) => theme.fontSize.headline};
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    width: 100%;
  }
`
const CartControlButton = styled('button')`
  width: 40px;
  height: 40px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme, isDelete }) => (isDelete ? `1px solid ${theme.palette.redLight}` : theme.border.button)};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  margin-right: ${({ isDelete }) => isDelete && '10px'};
  & > svg {
    font-size: 16px;
    stroke-width: 2px;
    stroke: ${({ theme, isDelete }) => isDelete && theme.palette.red};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
const Description = styled('div')`
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
    margin: 5px 0;
  }
  & ul {
    list-style: disc;
    padding-left: 30px;
    margin: 10px 0;
  }
  & ol {
    list-style: decimal;
    padding-left: 30px;
    margin: 10px 0;
  }
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`
const DescriptionButton = styled('button')`
  border: ${({ theme }) => theme.border.button};
  padding: 10px;
  text-transform: uppercase;
  color: inherit;
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  width: 100%;
  margin-top: 5px;
`
const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
`

// Component
const ProductDetailFields = props => {
  const {
    id,
    options,
    isInstallmentPlan,
    handleSubmit,
    price,
    count,
    basicPrice,
    handleCountPlus,
    handleCountMinus,
    setPrice,
    setCount,
    description,
    images,
    setSelectedImgId,
    values: formValues
  } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const isTablet = useMediaQuery({ query: `(${BREAKPOINTS.TABLET})` })

  const [isFullDescription, setIsFullDescription] = useState(false)

  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const currency = propOr('сум', 'CURRENCY', configsData)
  const formattedPrice = price * count
  const formattedPriceMonth = formattedPrice / 4

  const cartId = getCartId(id, values(formValues))

  const currentCartProduct = getCartProductByCartId(cartId)
  const currentCartCount = propOr(0, 'count', currentCartProduct)

  const handleRemoveFromCart = () => dispatch(removeCartProductByCartIdAction(cartId))

  useEffect(() => {
    const currentCount = currentCartCount !== 0 ? currentCartCount : 1
    setCount(currentCount)
  }, [currentCartCount])

  useCompareEffect(() => {
    const selectedOptions = map(({ fields, name }) => {
      const currentValue = prop(name, formValues)
      return find(propEq('id', currentValue), fields)
    }, options)

    const summedAddPrices = pipe(map(propOr(0, 'addPrice')), sum)(selectedOptions)
    const finalPrice = (basicPrice + summedAddPrices) * count
    setPrice(finalPrice)
  }, [formValues])

  const optionsFields = map(({ name, title, fields, type, id }) => {
    const handleSetPrimaryImg = anchor => {
      if (!isNil(anchor)) {
        const newPrimaryImage = find(propEq('anchor', anchor), images)
        const newPrimaryImageId = propOr(null, 'id', newPrimaryImage)
        if (!isNil(newPrimaryImageId)) {
          setSelectedImgId(prop('id', newPrimaryImage))
        }
      }
    }

    return (
      <OptionsFields
        onChangeOption={handleSetPrimaryImg}
        key={id}
        labelType={type}
        title={title}
        name={name}
        options={fields}
      />
    )
  }, options)

  const controls = (
    <CartControls>
      {hasInCart(cartId) && (
        <CartControlButton isDelete onClick={handleRemoveFromCart} type={'button'}>
          <TrashIcon />
        </CartControlButton>
      )}
      <CartControlButton disabled={count <= 1} onClick={handleCountMinus} type={'button'}>
        <MinusIcon />
      </CartControlButton>
      <Count>{count}</Count>
      <CartControlButton onClick={handleCountPlus} type={'button'}>
        <PlusIcon />
      </CartControlButton>
    </CartControls>
  )

  const descriptionButton = (
    <DescriptionButton type={'button'} onClick={() => setIsFullDescription(!isFullDescription)}>
      {isFullDescription ? 'Сократить описание' : 'Полное описание'}
    </DescriptionButton>
  )

  const descriptionEl = (
    <Description>
      <Title>Описание</Title>
      <p dangerouslySetInnerHTML={{ __html: isFullDescription ? description : textTrim(description) }} />
      {description.length > 300 ? descriptionButton : null}
    </Description>
  )

  return (
    <>
      <OptionsWrap>{optionsFields}</OptionsWrap>
      {description && !isTablet ? descriptionEl : null}
      <Line />
      {isInstallmentPlan && (
        <InstallmentsAddButton
          type={'button'}
          onClick={() => {
            handleSubmit(formValues)
            return router.push(ROUTES.CART_URL).then(() => window.scrollTo(0, 0))
          }}
        >
          <span>
            <Mark>{numberFormat(formattedPriceMonth, `${currency}/мес`)}</Mark> в рассрочку
          </span>
          <ChevronRight />
        </InstallmentsAddButton>
      )}
      <PriceWithCartWrap>
        <Price>{numberFormat(formattedPrice, currency)}</Price>
        <CartWrap>
          {controls}
          <CartAddButton type={'submit'}>В корзину</CartAddButton>
        </CartWrap>
      </PriceWithCartWrap>
    </>
  )
}

export default ProductDetailFields

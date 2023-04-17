import { filter, isEmpty, map, pipe, prop, propOr, sum } from 'ramda'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import ProductsTile from 'components/products/tile'
import numberFormat from 'tools/numberFormat'
import * as BREAKPOINTS from 'constants/breakpoints'
import { ZOODPAY } from 'constants/constants'

// Styles
const Wrap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`
const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
`
const NoData = styled('div')`
  margin: 10px 0 !important;
`
const List = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 400px;
  padding-right: 20px;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    max-height: 300px;
    padding: 10px 10px 20px 0;
    mask-image: linear-gradient(to bottom, transparent, #000 20px, #000 90%, transparent);
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    max-height: 260px;
    padding-right: 0;
  }
`
const TotalPrice = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: 500;
  padding-top: 20px;
  margin-top: auto;
  border-top: ${({ theme }) => `1px solid ${theme.background.line}`};
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  & > b {
    color: ${({ theme }) => theme.palette.primary};
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    padding-top: 0;
    border: none;
    font-size: ${({ theme }) => theme.fontSize.headline};
  }
`

// Component
const CartProducts = ({ paymentType }) => {
  const cart = useSelector(prop(STATES.CART))
  const cartData = propOr([], 'data', cart)

  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const currency = propOr('сум', 'CURRENCY', configsData)

  const isZoodpay = paymentType === ZOODPAY
  const totalPrice = pipe(
    filter(item => (isZoodpay ? item?.isInstallmentPlan === true : true)),
    map(item => prop('price', item) * prop('count', item)),
    sum
  )(cartData)
  const list = map(item => {
    const { cartId } = item

    return <ProductsTile item={item} key={cartId} paymentType={paymentType} />
  }, cartData)

  return (
    <Wrap>
      <Title>Товары в корзине</Title>
      <List>{!isEmpty(cartData) ? list : <NoData>Добавьте товары в корзину</NoData>}</List>
      <TotalPrice>
        <span>Стоимость товаров:</span>
        <b>{numberFormat(totalPrice, currency)}</b>
      </TotalPrice>
    </Wrap>
  )
}

export default CartProducts

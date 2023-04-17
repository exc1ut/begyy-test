import Container from 'components/container'
import styled from 'styled-components'
import Form from 'components/form'
import CartContactsFields from './components/fields/CartContactsFields'
import { getCartProductsToOrder } from 'tools/cart'
import { orderAction } from 'redux/actions/orderActions'
import { useDispatch } from 'react-redux'
import { isEmpty, filter, mergeRight, prop, map, omit } from 'ramda'
import toSnakeCase from 'tools/toSnakeCase'
import * as BREAKPOINTS from 'constants/breakpoints'
import { ZOODPAY } from 'constants/constants'
import { mapResponseToFormError } from 'tools/form'
import { useRouter } from 'next/router'
import * as ROUTES from 'constants/routes'
import { clearCartProductsAction } from '../../../redux/actions/cartActions'

// Styles
const Wrap = styled(Container)`
  padding-top: 30px;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    padding-top: 15px;
  }
`
const Content = styled('div')`
  form {
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    & > * {
      flex-grow: 1;
      &:not(:last-child) {
        margin: 0 30px 0 0;
      }
      &:last-child {
        max-width: 500px;
      }
    }
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    form {
      flex-flow: column nowrap;
      & > *:last-child {
        margin: 0;
        width: auto;
        min-width: auto;
      }
      & > * {
        flex-grow: 1;
        &:not(:last-child) {
          margin: 0;
        }
        &:last-child {
          max-width: unset;
        }
      }
    }
  }
`
// Component
const CartGrid = ({ zoodpayConfig }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleSubmit = valuesForm => {
    const fullName = prop('fullName', valuesForm)
    const address = prop('address', valuesForm)
    const comment = prop('comment', valuesForm)
    const phoneNumber = prop('phoneNumber', valuesForm)
    const paymentType = prop('paymentType', valuesForm)
    const hasProducts = !isEmpty(getCartProductsToOrder())
    const currentProducts =
      paymentType === ZOODPAY
        ? filter(({ isInstallmentPlan }) => {
            return isInstallmentPlan
          })(getCartProductsToOrder() || [])
        : getCartProductsToOrder()

    const data = toSnakeCase(
      mergeRight(paymentType ? { paymentType } : { paymentType: 'cash' }, {
        fullName,
        address,
        phoneNumber,
        comment,
        products: hasProducts ? map(omit(['isInstallmentPlan']), currentProducts) : null
      })
    )

    return dispatch(orderAction(data))
      .then(res => {
        if (res.payment_url) {
          window.location.replace(res.payment_url)
        } else {
          dispatch(clearCartProductsAction())
          router.push(ROUTES.SUCCESS_URL).then(() => window.scrollTo(0, 0))
        }
      })
      .catch(mapResponseToFormError)
  }

  return (
    <Wrap>
      <Content>
        <Form onSubmit={handleSubmit} initialValues={{ paymentType: 'cash' }}>
          <CartContactsFields zoodpayConfig={zoodpayConfig} />
        </Form>
      </Content>
    </Wrap>
  )
}

export default CartGrid

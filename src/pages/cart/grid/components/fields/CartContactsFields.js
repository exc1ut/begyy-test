import styled from 'styled-components'
import { Field } from 'react-final-form'
import TextField from 'components/fields/text'
import TextareaField from 'components/fields/textarea'
import { useSelector } from 'react-redux'
import { isEmpty, prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import { getCartProducts } from 'tools/cart'
import InputMask from 'react-input-mask'
import { useMediaQuery } from 'react-responsive'
import * as BREAKPOINTS from 'constants/breakpoints'
import CartProducts from 'pages/cart/grid/components/products/CartProducts'
import PaymentTypes from './PaymentTypes'

// Styles
const Wrap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`
const Button = styled('button')`
  background: ${({ theme }) => theme.background.button};
  color: ${({ theme }) => theme.color.button};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  min-height: ${({ theme }) => theme.height.field};
  padding: 10px 20px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.white};
  font-size: ${({ theme }) => theme.fontSize.body};
  border: ${({ theme }) => `1px solid ${theme.background.primary}`};
  background: ${({ theme }) => theme.background.button};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  user-select: none;
  &:disabled {
    cursor: not-allowed;
  }
`
const DoubleFields = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  & > * {
    width: calc(50% - 10px);
    &:not(:last-child) {
      margin: 0 20px 0 0;
    }
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    flex-flow: column nowrap;
    & > * {
      width: 100%;
      &:not(:last-child) {
        margin: 0 20px 20px 0;
      }
    }
  }
`
const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
`
const Info = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.caption};
  line-height: 1.4;
  & > *:after {
    content: ' *';
    color: ${({ theme }) => theme.palette.primary};
    font-weight: 700;
  }
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`

// Component
const CartContactsFields = ({ values, zoodpayConfig }) => {
  const isTablet = useMediaQuery({ query: `(${BREAKPOINTS.TABLET})` })
  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const paymentInfo = propOr('', 'ORDER_PAYMENT', configsData)
  const deliveryInfo = propOr('', 'ORDER_DELIVERY', configsData)
  const hasInfo = paymentInfo && deliveryInfo
  const hasProducts = !isEmpty(getCartProducts())

  const paymentType = values?.paymentType
  return (
    <>
      {!isTablet ? <CartProducts paymentType={paymentType} /> : null}
      <Wrap>
        <PaymentTypes name={'paymentType'} zoodpayConfig={zoodpayConfig} />
        <Title>Контактная информация</Title>
        <DoubleFields>
          <Field name={'fullName'} component={TextField} label={'Фамилия Имя'} required />
          <Field
            name={'phoneNumber'}
            parse={value => value.replace(/\)/g, '').replace(/\(/g, '').replace(/-/g, '').replace(/ /g, '')}
            render={({ input }) => (
              <div>
                <InputMask required mask="+\9\98 (99) 999-99-99" {...input}>
                  {InputProps => <TextField inputMode={'tel'} label={'Номер телефона'} {...InputProps} />}
                </InputMask>
              </div>
            )}
            required
          />
        </DoubleFields>
        <Field name={'address'} component={TextareaField} label={'Адрес'} required />
        <Field name={'comment'} component={TextareaField} label={'Комментарий'} />
        {isTablet ? <CartProducts paymentType={paymentType} /> : null}
        {hasInfo && (
          <Info>
            {paymentInfo && <div>{paymentInfo}</div>}
            {deliveryInfo && <div>{deliveryInfo}</div>}
          </Info>
        )}
        <Button type={'submit'} disabled={!hasProducts}>
          {hasProducts ? 'Оформить заказ' : 'Добавьте товары'}
        </Button>
      </Wrap>
    </>
  )
}

export default CartContactsFields

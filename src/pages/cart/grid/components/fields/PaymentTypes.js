import React from 'react'
import styled from 'styled-components'
import { find, map, pipe, prop, propEq, propOr, sum, filter, pathOr } from 'ramda'
import { Field } from 'react-final-form'
import RadioPaymentField from 'components/fields/radio/RadioPaymentField'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import numberFormat from 'tools/numberFormat'
import { CASH, INSTALLMENT, MAX_PRICE, MIN_PRICE, ZOODPAY } from 'constants/constants'

const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
`

const Choose = styled.div`
  background: #fff;
  font-weight: 500;
  font-size: 14px;
  padding: 13px 16px;
  border-radius: 12px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1f1f26;
`

const PaymentTypes = ({ name, zoodpayConfig }) => {
  const cart = useSelector(prop(STATES.CART))
  const cartData = propOr([], 'data', cart)
  const configuations = pathOr({}, ['data', 'configuration', '0'], zoodpayConfig)
  const minPrice = propOr(MIN_PRICE, 'minLimit', configuations)
  const maxPrice = propOr(MAX_PRICE, 'maxLimit', configuations)
  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const currency = propOr('сум', 'CURRENCY', configsData)
  const totalPrice = pipe(
    filter(propEq('isInstallmentPlan', true)),
    map(item => prop('price', item) * prop('count', item)),
    sum
  )(cartData)
  const totalPriceMonth = totalPrice / INSTALLMENT
  const hasIsInstallmentPlan = find(propEq('isInstallmentPlan', true), cartData)
  const options = [
    {
      text: 'При получении',
      subText: 'Наличные, PayME и Click',
      id: CASH
    },
    {
      text: 'Рассрочка ZoodPay',
      disabled: !hasIsInstallmentPlan || totalPrice < minPrice || totalPrice > maxPrice,
      subText: (
        <>
          {!hasIsInstallmentPlan ? (
            <Choose>
              <span>Выбранные товары не доступны в рассрочку</span>
            </Choose>
          ) : totalPrice < minPrice ? (
            <Choose>
              <span>Необходимо более {numberFormat(minPrice)} сум</span>
            </Choose>
          ) : totalPrice > maxPrice ? (
            <Choose>
              <span>Привышен лимит в {numberFormat(maxPrice)} сум</span>
            </Choose>
          ) : (
            <Choose>
              <span>4 месяца</span>
              <span>{numberFormat(totalPriceMonth, `${currency}/мес`)}</span>
            </Choose>
          )}
        </>
      ),
      image: '/images/zoodpay.webp',
      id: ZOODPAY
    }
  ]
  return (
    <>
      <Title>Тип оплаты</Title>
      {map(
        ({ id, disabled, ...item }) => (
          <Field
            key={id}
            component={RadioPaymentField}
            valueType={'text'}
            disabledOption={disabled}
            value={id}
            {...item}
            type={'radio'}
            name={name}
          />
        ),
        options.filter(Boolean)
      )}
    </>
  )
}

export default PaymentTypes

import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { is } from 'ramda'

const Label = styled('label')`
  position: relative;
  display: flex;
  flex-direction: column;
  input {
    display: none;
    &:checked + div {
      border: ${({ theme }) => `1px solid ${theme.palette.primary}`};
    }
  }
`

const Image = styled.div`
  width: 60px;
  height: 30px;
  position: absolute;
  right: 12px;
  top: 12px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const Text = styled.p`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 500;
  font-size: 16px;
`

const SubText = styled.p`
  color: ${({ theme }) => theme.color.secondary};
  margin-top: 12px;
  font-size: 13px;
`

const Payment = styled.div`
  overflow: hidden;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.background.secondary};
  display: flex;
  flex-direction: column;
  border: ${() => `1px solid transparent`};
  text-align: left;
  border-radius: 7px;
  padding: 16px;
  vertical-align: top;
`

const RadioPaymentField = props => {
  const { input, labelType, image, text, disabledOption, subText, valueType = 'number', ...rest } = props
  const [id, setId] = useState()
  useEffect(() => {
    setId(Math.random())
  }, [])

  const isImageType = labelType === 'image'

  const handleOnChange = ev => {
    return valueType === 'number' ? input.onChange(+ev.target.value) : input.onChange(ev.target.value)
  }
  const disabled = disabledOption
  useEffect(() => {
    if (disabled) {
      input.onChange(false)
    }
  }, [disabled])
  return (
    <Label isImageType={isImageType} htmlFor={id}>
      <input
        {...input}
        onClick={disabled ? null : handleOnChange}
        {...rest}
        disabled={disabled ? 'disabled' : null}
        id={id}
      />
      <Payment disabled={disabled}>
        <Text>{text}</Text>
        {is(String, subText) ? <SubText>{subText}</SubText> : subText ? subText : null}
        {image && (
          <Image>
            <img src={image} alt={'zoodpay'} title={'`zoodpay`'} loading={'lazy'} />
          </Image>
        )}
      </Payment>
    </Label>
  )
}

export default RadioPaymentField

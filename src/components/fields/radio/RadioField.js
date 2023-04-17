import styled from 'styled-components'
import { useState, useEffect } from 'react'
import CheckIcon from 'media/icons/CheckIcon'

const Label = styled('label')`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  height: 30px;
  min-width: 60px;
  font-size: ${({ theme }) => theme.fontSize.caption};
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.primary};
  background: transparent;
  font-weight: 500;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  cursor: pointer;
  input {
    display: none;
    &:checked + span {
      color: ${({ isImageType, theme }) => !isImageType && theme.palette.white};
      background: ${({ theme, isImageType }) => !isImageType && theme.background.button};
      border-color: ${({ isImageType }) => !isImageType && 'transparent'};
      transition: ${({ theme }) => `background ${theme.transition.fast}`};
      & > em {
        display: flex;
      }
    }
  }
`
const View = styled('span')`
  width: 100%;
  height: 100%;
  padding: ${({ isImageType }) => (isImageType ? '5px 10px 5px 45px' : '5px 10px')};
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border-radius: inherit;
  border: ${({ theme }) => theme.border.button};
  background: transparent;
  background-size: cover;
`
const ImgView = styled('b')`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40px;
  background: ${({ imgSrc }) => `#eee url(${imgSrc}) repeat center`};
  border: ${({ theme }) => theme.border.button};
  border-radius: ${({ theme }) => theme.borderRadius.primary};
`
const CheckWrap = styled('em')`
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  display: none;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.background.button};
  border-radius: 100%;
  padding: 3px;
  z-index: 100;
  & > svg {
    color: ${({ theme }) => theme.palette.white};
    font-size: 12px;
    stroke-width: 3px;
  }
`

const RadioField = props => {
  const { label, input, image, labelType, valueType = 'number', ...rest } = props

  const [id, setId] = useState()

  useEffect(() => {
    setId(Math.random())
  }, [])

  const isImageType = labelType === 'image'

  return (
    <Label isImageType={isImageType} htmlFor={id}>
      <input
        {...input}
        onChange={ev => (valueType === 'number' ? input.onChange(+ev.target.value) : input.onChange(ev.target.value))}
        {...rest}
        id={id}
      />
      <View isImageType={isImageType} imgSrc={image}>
        {label}
        {isImageType && (
          <CheckWrap>
            <CheckIcon />
          </CheckWrap>
        )}
      </View>
      {isImageType && <ImgView imgSrc={image} />}
    </Label>
  )
}

export default RadioField

// Styles
import styled from 'styled-components'

const Input = styled('textarea')`
  flex-grow: 1;
  min-height: ${({ theme }) => theme.height.textarea};
  background: transparent;
  color: ${({ theme }) => theme.color.field};
  padding: ${({ theme }) => theme.padding.field};
  border-radius: ${({ theme }) => theme.borderRadius.field};
  border: ${({ theme }) => theme.border.field};
  transition: ${({ theme }) => `background ${theme.transition.fast}`};
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.color.secondary};
    transition: ${({ theme }) => `color ${theme.transition.fast}`};
  }
`
const LabelText = styled('p')`
  text-transform: uppercase;
  margin-bottom: 10px;
  width: 100%;
  font-weight: 500;
  color: ${({ theme }) => theme.color.label};
`

// Component
const TextareaField = props => {
  const { type = 'text', placeholder = 'Введите данные', input, onChange, label, ...rest } = props

  const inputEl = (
    <Input
      type={type}
      placeholder={placeholder}
      {...input}
      {...rest}
      onChange={ev => {
        input?.onChange(ev)
        onChange ? onChange(ev) : () => {}
      }}
    />
  )

  if (label) {
    return (
      <label>
        <LabelText>{label}</LabelText>
        {inputEl}
      </label>
    )
  }
  return inputEl
}

export default TextareaField

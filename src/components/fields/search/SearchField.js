// Styles
import styled from 'styled-components'

const Input = styled('input')`
  flex-grow: 1;
  height: 35px;
  background: #36393c;
  color: ${({ theme }) => theme.palette.white};
  padding: ${({ theme }) => theme.padding.field};
  transition: ${({ theme }) => `background ${theme.transition.fast}`};
  &::placeholder {
    color: #b9b9b9;
    transition: ${({ theme }) => `color ${theme.transition.fast}`};
  }
  &:focus {
    background: #43464a;
    transition: ${({ theme }) => `background ${theme.transition.fast}`};
  }
`

// Component
const SearchField = props => {
  const { type = 'text', placeholder = 'Введите данные', input, ...rest } = props

  return <Input type={type} placeholder={placeholder} {...input} {...rest} />
}

export default SearchField

import { Field } from 'react-final-form'
import SearchField from 'components/fields/search'
import styled from 'styled-components'
import * as BREAKPOINTS from 'constants/breakpoints'

// Styles
const Wrap = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  min-width: 500px;
  border-radius: ${({ theme }) => theme.borderRadius.field};
  overflow: hidden;
  @media only screen and (${BREAKPOINTS.TABLET}) {
    min-width: 100%;
    width: 100%;
    max-width: 100%;
  }
`
const Button = styled('button')`
  height: 35px;
  min-width: 90px;
  background: #2d3133;
  user-select: none;
  transition: ${({ theme }) => `all ${theme.transition.fast}`};
  &:hover {
    background: ${({ theme }) => theme.background.buttonHover};
    transition: ${({ theme }) => `background ${theme.transition.fast}`};
  }
  &:active {
    opacity: ${({ theme }) => theme.opacity.linkActive};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
`

// Component
const SearchBar = () => {
  return (
    <Wrap>
      <Field component={SearchField} name={'search'} placeholder={'Название или артикул товара'} />
      <Button type={'submit'}>Поиск</Button>
    </Wrap>
  )
}

export default SearchBar

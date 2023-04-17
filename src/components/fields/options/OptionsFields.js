import { Field } from 'react-final-form'
import RadioField from '../radio'
import styled from 'styled-components'
import { map } from 'ramda'

const OptionsWrap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
`
const Options = styled('div')`
  display: flex;
  flex-flow: row wrap;
  & > * {
    &:not(:last-child) {
      margin-right: 10px;
    }
    margin-bottom: 10px;
  }
  // @media only screen and ({BREAKPOINTS.MOBILE}) {
  //   flex-flow: row-reverse wrap;
  //   & > * {
  //     &:not(:last-child) {
  //       margin-left: 10px;
  //       margin-right: 0;
  //     }
  //   }
  // }
`
const Title = styled('h2')`
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
`

const OptionsFields = props => {
  const { name, title, options = [], labelType = 'string', onChangeOption } = props

  return (
    <OptionsWrap>
      {title && <Title>{title}</Title>}
      <Options>
        {map(
          ({ label, id, image, anchor = '' }) => (
            <Field
              key={id}
              component={RadioField}
              value={id}
              label={label}
              image={image}
              type={'radio'}
              labelType={labelType}
              name={name}
              onClick={() => onChangeOption(anchor)}
            />
          ),
          options
        )}
      </Options>
    </OptionsWrap>
  )
}

export default OptionsFields

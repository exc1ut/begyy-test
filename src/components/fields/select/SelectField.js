import ReactSelect from 'react-select'
import { filter, find, map, propEq, propOr } from 'ramda'
import selectStyles from './selectStyles'
import styled from 'styled-components'

// Styles
const Select = styled(ReactSelect)`
  & .css-16onlpu-multiValue {
    cursor: default;
  }
`

// Const
export const SELECT_ACTIONS = ['select-option']
export const REMOVE_ACTIONS = ['remove-value', 'pop-value']

// Component
const SelectField = props => {
  const {
    name,
    options = [],
    onChange,
    maxMenuHeight = 200,
    placeholder = 'Выберите опции',
    isClearable = false,
    isMulti = true,
    isSearchable = true,
    defaultValue = []
  } = props

  const mappedValues = map(value => {
    const currentItem = find(({ value: findValue }) => +findValue === +value, options)
    if (currentItem) {
      return { value, label: propOr('Опция', 'label', currentItem) }
    } else {
      return null
    }
  }, defaultValue)
  const defaultValueProp = Array.isArray(defaultValue)
    ? filter(item => !!item, mappedValues)
    : find(propEq('value', defaultValue), options)

  const noOptionsMessage = ({ inputValue }) => {
    if (inputValue) {
      return `Не найдено "${inputValue}"`
    }
    return 'Не найдено'
  }

  return (
    <Select
      defaultValue={defaultValueProp}
      name={name}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      isMulti={isMulti}
      isClearable={isClearable}
      isSearchable={isSearchable}
      noOptionsMessage={noOptionsMessage}
      styles={selectStyles}
      maxMenuHeight={maxMenuHeight}
      menuPlacement={'auto'}
      // menuPosition={'fixed'}
      menuPosition={'absolute'}
    />
  )
}

export default SelectField

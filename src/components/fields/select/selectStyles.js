import theme from 'constants/themes'

const textStyles = {
  fontSize: theme.fontSize.body,
  lineHeight: '1.2',
  color: theme.color.primary
}

// Styles
const selectStyles = () => ({
  container: base => ({
    ...base,
    ...textStyles,
    background: 'transparent',
    minWidth: '180px',
    width: '180xpx',
    maxWidth: '100%',
    minHeight: theme.height.field
  }),
  control: base => ({
    ...base,
    outline: 'none',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    border: theme.border.field,
    borderRadius: theme.borderRadius.field,
    boxShadow: 'none',
    '&:hover, &:active, &:focus': {
      border: theme.border.field,
      boxShadow: 'none',
      cursor: 'text'
    }
  }),
  placeholder: base => ({
    ...base,
    ...textStyles,
    color: theme.color.minor,
    lineHeight: 'inherit',
    height: 'inherit'
  }),
  indicatorsContainer: base => ({
    ...base,
    cursor: 'pointer'
  }),
  valueContainer: base => ({
    ...base,
    height: 'inherit',
    width: 'inherit'
  }),
  // dropdownIndicator: () => ({
  //   height: valueHeight,
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center'
  // }),
  // input: base => ({
  //   ...base,
  //   height: '10px',
  //   width: valueWidth,
  //   ...textStyles
  // }),
  value: base => ({
    ...base,
    ...textStyles,
    textTransform: 'uppercase',
    width: 'inherit'
  }),
  singleValue: base => ({
    ...base,
    ...textStyles,
    textTransform: 'uppercase',
    width: 'inherit',
    height: 'inherit'
  }),
  multiValue: base => ({
    ...base,
    ...textStyles,
    textTransform: 'uppercase',
    width: 'inherit',
    height: 'inherit'
  }),
  menu: base => ({
    ...base,
    marginTop: '3px'
  }),
  menuList: base => ({
    ...base,
    ...textStyles,
    background: '#fff',
    overflowX: 'hidden',
    padding: '0',
    textTransform: 'uppercase',
    borderRadius: theme.borderRadius.field
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? theme.palette.primary : 'transparent',
    color: state.isSelected ? theme.palette.white : textStyles.color,
    padding: '5px 12px',
    minHeight: theme.height.field,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&:hover, &:active, &:focus': {
      cursor: 'pointer',
      background: theme.palette.primaryOpacity,
      color: textStyles.color
    }
  })
})

export default selectStyles()

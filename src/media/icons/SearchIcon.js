import React from 'react'
import SvgIcon from 'components/svgIcon/SvgIcon'

const SearchIcon = props => {
  return (
    <SvgIcon
      viewBox={'0 0 24 24'}
      fill={'none'}
      stroke={'currentColor'}
      strokeWidth={'1'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </SvgIcon>
  )
}

export default SearchIcon

import React from 'react'
import SvgIcon from 'components/svgIcon/SvgIcon'

const MenuIcon = props => {
  return (
    <SvgIcon
      viewBox={'0 0 24 24'}
      fill={'none'}
      stroke={'currentColor'}
      strokeWidth={'2'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      {...props}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </SvgIcon>
  )
}

export default MenuIcon

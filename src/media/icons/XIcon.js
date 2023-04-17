import React from 'react'
import SvgIcon from 'components/svgIcon/SvgIcon'

const XIcon = props => {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </SvgIcon>
  )
}

export default XIcon

import React from 'react'
import SvgIcon from 'components/svgIcon/SvgIcon'

const ChevronRight = props => {
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
      <polyline points="9 18 15 12 9 6" />
    </SvgIcon>
  )
}

export default ChevronRight

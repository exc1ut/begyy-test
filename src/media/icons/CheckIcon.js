import React from 'react'
import SvgIcon from 'components/svgIcon/SvgIcon'

const CheckIcon = props => {
  return (
    <SvgIcon viewBox={'0 0 24 24'} fill={'none'} stroke={'currentColor'} strokeWidth={'2'} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </SvgIcon>
  )
}

export default CheckIcon

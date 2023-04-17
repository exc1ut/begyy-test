import React from 'react'
import SvgIcon from 'components/svgIcon/SvgIcon'

const CartIcon = props => {
  return (
    <SvgIcon
      viewBox={'0 0 24 24'}
      fill={'none'}
      stroke={'currentColor'}
      strokeWidth={'1.5'}
      stroke-linecap={'round'}
      stroke-linejoin={'round'}
      {...props}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </SvgIcon>
  )
}

export default CartIcon

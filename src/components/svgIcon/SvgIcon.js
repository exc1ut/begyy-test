import React from 'react'
import styled from 'styled-components'

// Styles
const Icon = styled('svg')`
  min-width: 1em;
`

// Component
const SvgIcon = props => {
  const {
    children,
    fontSize = '24px',
    viewBox = '0 0 24 24',
    height = '1em',
    width = '1em',
    strokeLinejoin = 'round',
    strokeLinecap = 'round',
    xmlns = 'http://www.w3.org/2000/svg',
    fill = 'currentColor',
    ...rest
  } = props

  return (
    <Icon
      fontSize={fontSize}
      viewBox={viewBox}
      height={height}
      width={width}
      fill={fill}
      xmlns={xmlns}
      strokeLinejoin={strokeLinejoin}
      strokeLinecap={strokeLinecap}
      {...rest}
    >
      {children}
    </Icon>
  )
}

export default SvgIcon

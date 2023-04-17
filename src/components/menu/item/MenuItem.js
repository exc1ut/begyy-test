import styled from 'styled-components'
import Link from 'next/link'

// Styles
const Inner = styled('a')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSize.subhead};
  text-transform: uppercase;
  user-select: none;
  padding: 20px 10px;
  background: ${({ isActive }) => isActive && '#ddd'};
  &:hover {
    background: #ddd;
  }
`

// Component
const MenuItem = props => {
  const { name, path = '#', isActive, ...rest } = props

  return (
    <Link href={path} passHref>
      <Inner isActive={isActive} {...rest}>
        {name}
      </Inner>
    </Link>
  )
}

export default MenuItem

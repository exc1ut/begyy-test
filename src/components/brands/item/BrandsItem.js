import styled from 'styled-components'
import Link from 'next/link'
import * as ROUTES from 'constants/routes'
import { sprintf } from 'sprintf-js'

// Styles
const Inner = styled('a')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 5px 15px;
  background: transparent;
  user-select: none;
  filter: brightness(0);
  flex-grow: 1;
  opacity: 0.8;
  transition: ${({ theme }) => `filter ${theme.transition.fast}`};
  & > img {
    max-width: 100%;
    max-height: 100%;
  }
  &:active,
  &:hover {
    transition: ${({ theme }) => `background ${theme.transition.fast}`};
  }
  &:hover {
    opacity: 1;
    background: #fbfbfb;
    filter: unset;
  }
  &:active {
    opacity: ${({ theme }) => theme.opacity.linkActive};
  }
`

// Component
const BrandsItem = props => {
  const { imgSrc, alias, title } = props

  return (
    <Link href={sprintf(ROUTES.BRANDS_ITEM_URL, alias)} passHref>
      <Inner title={title}>
        <img src={imgSrc} alt={title} loading={'lazy'} />
      </Inner>
    </Link>
  )
}

export default BrandsItem

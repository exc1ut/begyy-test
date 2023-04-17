import BrandsItem from 'components/brands/item'
import { isEmpty, map, slice } from 'ramda'
import styled from 'styled-components'
import Link from 'next/link'
import * as ROUTES from 'constants/routes'
import * as BREAKPOINTS from 'constants/breakpoints'
import { useMediaQuery } from 'react-responsive'

// Styles
const Wrap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
`
const List = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  overflow: hidden;
  & > * {
    height: 80px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    & > * {
      height: 65px;
    }
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    & > * {
      height: 55px;
    }
  }
`
const LinkToAll = styled('div')`
  font-size: 12px;
  color: ${({ theme }) => theme.color.primary};
  transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  user-select: none;
  & > a {
    display: block;
    padding: 10px 0;
  }
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.palette.primary};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
`

// Component
const Brands = props => {
  const { brands } = props

  const isTablet = useMediaQuery({ query: `(${BREAKPOINTS.TABLET})` })
  const isMobile = useMediaQuery({ query: `(${BREAKPOINTS.MOBILE})` })
  const isMobileS = useMediaQuery({ query: `(${BREAKPOINTS.MOBILE_S})` })

  const brandsCount = isMobileS ? 3 : isMobile ? 5 : isTablet ? 7 : 8

  const brandsArr = slice(0, brandsCount, brands)

  const list = (
    <List>
      {map(item => {
        const { alias, name, photo } = item

        if (photo) {
          return <BrandsItem alias={alias} title={name} imgSrc={photo} key={alias} />
        } else {
          return null
        }
      }, brandsArr)}
    </List>
  )

  const linkToAll = (
    <LinkToAll>
      <Link href={ROUTES.BRANDS_URL} passHref>
        <a>Посмотреть все бренды</a>
      </Link>
    </LinkToAll>
  )

  if (brands && !isEmpty(brands)) {
    return (
      <Wrap>
        {list}
        {linkToAll}
      </Wrap>
    )
  } else {
    return null
  }
}

export default Brands

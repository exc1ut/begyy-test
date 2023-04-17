import Link from 'next/link'
import styled from 'styled-components'
import { isEmpty, prop, propOr } from 'ramda'
import * as ROUTES from 'constants/routes'
import { sprintf } from 'sprintf-js'
import { createSlugsPath } from '../../../tools/url'
import { getFullTreeForItem } from '../../../tools/find'
import { useSelector } from 'react-redux'
import * as STATES from '../../../constants/states'

// Styles
const Wrap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  page-break-inside: avoid;
  vertical-align: top;
`
const HeadLink = styled('a')`
  width: 100%;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.subhead};
  line-height: 1.1;
  margin: 0 0 10px 3px;
  text-transform: uppercase;
  transition: ${({ theme }) => `all ${theme.transition.fast}`};
  user-select: none;
  &:hover {
    color: ${({ theme }) => theme.palette.primary};
    text-decoration: underline;
    transition: ${({ theme }) => `all ${theme.transition.fast}`};
  }
`
const ListCategories = styled('ul')`
  margin-bottom: 15px;
  padding-right: 10px;
  width: 100%;
  & > li:not(:last-child) {
    margin-bottom: 8px;
  }
`
const SubLink = styled('a')`
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.subhead};
  color: ${({ theme }) => theme.color.secondary};
  padding: 3px 5px;
  line-height: 1.4;
  text-transform: uppercase;
  transition: ${({ theme }) => `background ${theme.transition.fast}`};
  user-select: none;
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  &:hover {
    background: #f5f5f5;
    color: ${({ theme }) => theme.color.primary};
    transition: ${({ theme }) => `background ${theme.transition.fast}`};
  }
`

// Component
const MenuDropdownCategory = props => {
  const { head = 'Категория', id = 0, categories = [] } = props

  const categoriesData = useSelector(prop(STATES.CATEGORIES))
  const categoriesList = propOr([], 'data', categoriesData)

  const hasCategories = !isEmpty(categories)

  const getCategoryUrl = id => {
    return sprintf(ROUTES.PRODUCTS_SLUG_URL, createSlugsPath(getFullTreeForItem(categoriesList, id)))
  }

  const listCategories = categories.map(({ id: childId, name: childName }) => {
    return (
      <li key={childId}>
        <Link href={getCategoryUrl(childId)} passHref>
          <SubLink>{childName}</SubLink>
        </Link>
      </li>
    )
  })

  return (
    <Wrap>
      <Link href={getCategoryUrl(id)} passHref>
        <HeadLink>{head}</HeadLink>
      </Link>
      {hasCategories ? <ListCategories>{listCategories}</ListCategories> : null}
    </Wrap>
  )
}

export default MenuDropdownCategory

import Container from 'components/container'
import TextField from 'components/fields/text'
import styled from 'styled-components'
import { isEmpty, map } from 'ramda'
import { Fragment, useState } from 'react'
import { findAndSpreadByFirstLetter, spreadBy } from 'tools/spreadBy'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'
import * as ROUTES from 'constants/routes'

// Styles
const Wrap = styled(Container)`
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`
const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
`
const BrandTitle = styled('h2')`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.title};
  min-height: 40px;
  padding: 10px;
  background: ${({ theme }) => theme.background.headerMenu};
  margin-bottom: 5px;
  text-transform: uppercase;
`
const BrandTile = styled('div')`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.headline};
  min-height: 40px;
  padding: 10px;
  background: transparent;
  margin-bottom: 5px;
  cursor: pointer;
  transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  &:hover {
    background: ${({ theme }) => theme.background.headerMenu};
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
  }
`

// Component
const BrandsGrid = props => {
  const { brands } = props

  const router = useRouter()

  const [searchResults, setSearchResults] = useState(spreadBy(brands))

  const handleSearch = ev => {
    setSearchResults(findAndSpreadByFirstLetter({ arr: brands, value: ev.target.value }))
  }
  const handleRedirectToBrand = alias =>
    router.push(sprintf(ROUTES.BRANDS_ITEM_URL, alias)).then(() => window.scrollTo(0, 0))

  const searchBar = <TextField placeholder={'Название'} name={'search'} onChange={handleSearch} />

  const results = (
    <div>
      {map(item => {
        return (
          <Fragment key={item}>
            <BrandTitle>{item[0]}</BrandTitle>
            {map(
              ({ name, id, alias, description = null }) => (
                <BrandTile title={description} onClick={() => handleRedirectToBrand(alias)} key={id}>
                  {name}
                </BrandTile>
              ),
              item[1]
            )}
          </Fragment>
        )
      }, searchResults)}
    </div>
  )

  const noResults = <div>По вашему запросу ничего не найдено</div>

  return (
    <Wrap>
      <Title>Бренды</Title>
      {searchBar}
      {!isEmpty(searchResults) ? results : noResults}
    </Wrap>
  )
}

export default BrandsGrid

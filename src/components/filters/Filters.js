import styled from 'styled-components'
import { find, isEmpty, map, prop, propOr, reject, uniq } from 'ramda'
import { useRouter } from 'next/router'
import * as ROUTES from 'constants/routes'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import * as COLLECTIONS from 'constants/collections'
import SelectField from 'components/fields/select'
import { createSlugsPath } from 'tools/url'
import * as ORDERING from 'constants/ordering'
import * as BREAKPOINTS from 'constants/breakpoints'
import { useMediaQuery } from 'react-responsive'
import XIcon from 'media/icons/XIcon'
import BasicBreadcrumbs from 'components/breadcrumbs'
import { deepFindChildrenByAlias, deepFindChildrenById, getFullTreeForItem } from 'tools/find'
import { getLastAliasFromSpread } from 'tools/router'

// Styles
const Wrap = styled('div')`
  @media only screen and (${BREAKPOINTS.TABLET}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    background: ${({ theme }) => theme.background.primary};
    z-index: 10000;
    padding: 100px 15px 20px;
  }
`
const List = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  width: 180px;
  overflow: hidden;
  & > *:not(:last-child) {
    position: relative;
    padding-bottom: 40px;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 20px;
      right: 0;
      height: 1px;
      background: ${({ theme }) => theme.background.line};
    }
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    background: ${({ theme }) => theme.background.primary};
    z-index: 1000;
    padding: 100px 15px 150px;
  }
`
const Filter = styled('div')`
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`
const FiltersList = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`
const FiltersHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  background: ${({ theme }) => theme.background.secondary};
  padding: 15px;
  z-index: 10000;
`
const FiltersHeaderTop = styled.div`
  width: 100%;
`
const ResetFilter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  color: #777;
  &:hover {
    color: ${({ theme }) => theme.palette.primary};
    text-decoration: underline;
    cursor: pointer;
  }
`
const TitleMain = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.title};
  text-transform: uppercase;
  line-height: 1.5;
`
const ExitButton = styled.div`
  position: absolute;
  top: 35px;
  transform: translateY(-50%);
  right: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Title = styled('h3')`
  font-size: ${({ theme }) => theme.fontSize.body};
  text-transform: uppercase;
`
const Button = styled('button')`
  padding: 10px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.button};
  font-size: ${({ theme }) => theme.fontSize.caption};
  font-weight: 500;
  border: ${({ theme }) => `1px solid ${theme.background.primary}`};
  background: ${({ theme }) => theme.background.button};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  width: 100%;
`
const Option = styled('div')`
  position: relative;
  cursor: pointer;
  padding-left: 25px;
  color: ${({ theme, isActive }) => (isActive ? theme.palette.primary : theme.color.primary)};
  &:hover {
    color: ${({ theme }) => theme.palette.primary};
    transition: ${({ theme }) => `color ${theme.transition.fast}`};
    text-decoration: underline;
  }
  &:before {
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    content: '';
    background: ${({ theme, isActive }) => isActive && theme.palette.primary};
    border: ${({ theme, isActive }) => `1px solid ${isActive ? theme.palette.primary : theme.palette.grey}`};
    border-radius: 100%;
  }
  &:after {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13px;
    height: 13px;
    content: '';
    background: transparent;
    border: ${({ theme }) => `4px solid ${theme.palette.white}`};
    border-radius: 100%;
  }
`
const Breadcrumbs = styled(BasicBreadcrumbs)`
  min-height: auto;
  padding-bottom: 32px !important;
`
const ExitTile = styled('div')`
  position: fixed !important;
  left: 0;
  right: 0;
  bottom: 0;
  height: 65px;
  display: flex;
  background: ${({ theme }) => theme.background.secondary};
  padding: 15px;
  z-index: 10000;
`

// Переписать ProductsFilters?!
// Component
const Filters = props => {
  const { brandsData, setIsOpenFilters, breadcrumbsWay, title, isBrandPage } = props

  const isTablet = useMediaQuery({ query: `(${BREAKPOINTS.TABLET})` })

  const router = useRouter()
  const queries = propOr({}, 'query', router)
  const categoryQuery = isBrandPage
    ? propOr('', ROUTES.CATEGORY_QUERY, queries)
    : getLastAliasFromSpread(router, ['query', ROUTES.SPREAD_QUERY])
  const collectionQuery = propOr('', ROUTES.COLLECTION_QUERY, queries)
  const brandsQuery = propOr('', ROUTES.BRANDS_QUERY, queries)
  const optionsQuery = propOr('', ROUTES.OPTIONS_QUERY, queries)
  const orderingQuery = propOr(`-${ORDERING.DATE}`, ROUTES.ORDERING_QUERY, queries)
  const hasCategories = !!categoryQuery

  const productsOptions = useSelector(prop(STATES.PRODUCTS_OPTIONS))
  const productsOptionsData = propOr({}, 'data', productsOptions)
  const productsOptionsLoading = propOr({}, 'loading', productsOptions)
  const productsOptionsSuccess = propOr({}, 'success', productsOptions)

  const categories = useSelector(prop(STATES.CATEGORIES))
  const categoriesData = propOr([], 'data', categories)
  const categoriesByQuery = isBrandPage
    ? deepFindChildrenById(+categoryQuery, categoriesData)
    : deepFindChildrenByAlias(categoryQuery, categoriesData)

  const categoriesDataByQuery = categoryQuery ? categoriesByQuery : categoriesData
  const productsOptionsBrands = propOr([], 'brands', productsOptionsData)
  const productsOptionsOptions = propOr([], 'options', productsOptionsData)

  const handleSetQuery = ({ query, value }) => {
    const orderingQueries = orderingQuery ? { [ROUTES.ORDERING_QUERY]: orderingQuery } : {}
    const collectionsQueries = collectionQuery ? { [ROUTES.COLLECTION_QUERY]: collectionQuery } : {}
    const currentValue = propOr('', query, queries)
    const isCurrentValue = currentValue === value

    const newSearchObj =
      query === ROUTES.CATEGORY_QUERY && !isBrandPage
        ? {
            ...orderingQueries,
            ...collectionsQueries,
            [query]: value
          }
        : {
            ...queries,
            ...orderingQueries,
            ...collectionsQueries,
            [query]: value
          }

    if (!isCurrentValue) {
      router
        .push({
          query: newSearchObj
        })
        .then(() => window.scrollTo(0, 0))
    }
  }

  const getCategoryUrl = id => {
    const newPathname = createSlugsPath(getFullTreeForItem(categoriesData, id))
    return router.push({ pathname: newPathname })
  }

  // const handleSetSlug = alias => {
  //   return router.push({ pathname: sprintf(BRANDS_ITEM_URL, alias) })
  // }

  const handleResetFilters = () => {
    router
      .push({
        pathname: ROUTES.PRODUCTS_URL
      })
      .then(() => {
        window.scrollTo(0, 0)
        setIsOpenFilters(false)
      })
  }

  const handleSelectChange = (name, { ev, action }) => {
    const currentQuery = propOr('', name, queries)
    const targetIdEvArr = map(item => `${prop('value', item)}`, ev)
    const currentQueryArr = currentQuery ? currentQuery.split('-') : ''
    const removedValue = propOr({}, 'removedValue', action)
    const removedValues = propOr([], 'removedValues', action)
    const isRemove = !isEmpty(removedValues) || !isEmpty(removedValue)
    const rejectRemovedValues = !isEmpty(removedValue)
      ? reject(item => +item === +prop('value', removedValue), currentQueryArr)
      : !isEmpty(removedValues)
      ? reject(item => find(({ value }) => +item === +value, removedValues), currentQueryArr)
      : []
    const oldQueryValues = isRemove ? rejectRemovedValues : currentQueryArr
    const arrIDs = [...oldQueryValues, ...targetIdEvArr]
    const uniqIDs = uniq(arrIDs).join('-')

    const newSearchObj = {
      ...queries,
      [name]: uniqIDs
    }

    router
      .push({
        query: newSearchObj
      })
      .then(() => window.scrollTo(0, 0))
  }

  const resetButtons = (
    <Filter>
      <Button type={'button'} onClick={handleResetFilters}>
        Сбросить фильтры
      </Button>
    </Filter>
  )

  const categoriesItems = map(item => {
    const { id, alias, name } = item

    return (
      <Option
        isActive={isBrandPage ? +categoryQuery === id : categoryQuery === alias}
        onClick={() => {
          isBrandPage ? handleSetQuery({ query: ROUTES.CATEGORY_QUERY, value: id }) : getCategoryUrl(id)
        }}
        key={id}
      >
        {name}
      </Option>
    )
  }, categoriesDataByQuery)

  const mainCollections = map(({ alias, title }) => {
    if (alias !== COLLECTIONS.NEW) {
      return (
        <Option
          isActive={collectionQuery === alias}
          onClick={() => handleSetQuery({ query: ROUTES.COLLECTION_QUERY, value: alias })}
          key={alias}
        >
          {title}
        </Option>
      )
    }
    return null
  }, COLLECTIONS.FILTER_OPTIONS)

  const ordering = map(
    ({ alias, title }) => (
      <Option
        isActive={orderingQuery === alias}
        onClick={() => handleSetQuery({ query: ROUTES.ORDERING_QUERY, value: alias })}
        key={alias}
      >
        {title}
      </Option>
    ),
    ORDERING.OPTIONS
  )

  const orderingList = (
    <Filter>
      <Title>Сортировка</Title>
      <FiltersList>{ordering}</FiltersList>
    </Filter>
  )

  const collectionsList = (
    <Filter>
      <Title>Подборки</Title>
      <FiltersList>
        <Option
          isActive={!collectionQuery}
          onClick={() => handleSetQuery({ query: ROUTES.COLLECTION_QUERY, value: '' })}
        >
          Все подборки
        </Option>
        {mainCollections}
      </FiltersList>
    </Filter>
  )

  const handleBrandsMapper = arr => {
    if (Array.isArray(arr)) {
      return map(
        ({ id, name }) => ({
          value: id,
          label: name
        }),
        arr
      )
    } else {
      return []
    }
  }

  const optionsBrandsAll = handleBrandsMapper(brandsData)
  const optionsBrands = handleBrandsMapper(productsOptionsBrands)

  const defaultBrandsOptions = map(item => +item, brandsQuery.split('-'))

  // const currentBrandValue = pipe(find(propEq('alias', brandsQuery)), prop('id'))(brandsData)
  // const defaultBrandsOptions = isBrandPage ? currentBrandValue : map(item => +item, brandsQuery.split('-'))

  const brandsList = (
    <Filter>
      <Title>Бренды</Title>
      <FiltersList>
        <SelectField
          name={'brand'}
          onChange={(ev, action) => handleSelectChange(ROUTES.BRANDS_QUERY, { ev, action })}
          // onChange={(ev, action) => {
          //   const currentBrand = find(propEq('id', ev.value))(brandsData)
          //   const aliasBrand = prop('alias', currentBrand)
          //   return isBrandPage ? handleSetSlug(aliasBrand) : handleSelectChange(ROUTES.BRANDS_QUERY, { ev, action })
          // }}
          options={hasCategories ? optionsBrands : optionsBrandsAll}
          isMulti
          defaultValue={defaultBrandsOptions}
          isClearable
        />
      </FiltersList>
    </Filter>
  )

  const optionsList = map(({ id, title, name, fields }) => {
    const fieldsOptions = map(
      ({ id: fieldId, label: fieldLabel }) => ({
        value: fieldId,
        label: fieldLabel
      }),
      fields
    )

    const optionsDefaultValue = map(item => +item, optionsQuery.split('-'))

    return (
      <Filter key={id}>
        <Title>{title}</Title>
        <FiltersList>
          <SelectField
            onChange={(ev, action) => handleSelectChange(ROUTES.OPTIONS_QUERY, { ev, action })}
            name={name}
            options={fieldsOptions}
            isMulti
            isClearable
            defaultValue={optionsDefaultValue}
          />
        </FiltersList>
      </Filter>
    )
  }, productsOptionsOptions)

  const categoriesList = (
    <Filter>
      <Title>Категории</Title>
      <FiltersList>{categoriesItems}</FiltersList>
    </Filter>
  )

  const header = (
    <FiltersHeader>
      <FiltersHeaderTop>
        <TitleMain>Фильтры</TitleMain>
        <ExitButton onClick={() => setIsOpenFilters(false)}>
          <XIcon />
        </ExitButton>
      </FiltersHeaderTop>
      <ResetFilter onClick={handleResetFilters}>Сбросить фильтры</ResetFilter>
    </FiltersHeader>
  )

  const breadcrumbs = <Breadcrumbs way={breadcrumbsWay} currentWay={title} />

  const exitTile = (
    <ExitTile>
      <Button type={'button'} onClick={() => setIsOpenFilters(false)}>
        Показать результаты
      </Button>
    </ExitTile>
  )

  const filters = (
    <>
      {isTablet ? breadcrumbs : null}
      {!isEmpty(categoriesDataByQuery) ? categoriesList : null}
      {!isEmpty(productsOptionsBrands) || !hasCategories ? !isBrandPage && brandsList : null}
      {!isEmpty(optionsList) && !isBrandPage ? optionsList : null}
      {!isBrandPage && collectionsList}
      {orderingList}
      {!isTablet ? resetButtons : null}
    </>
  )

  return (
    <Wrap>
      {isTablet ? header : null}
      {!productsOptionsSuccess && productsOptionsLoading ? 'Подготовка фильтров . . .' : <List>{filters}</List>}
      {isTablet ? exitTile : null}
    </Wrap>
  )
}

export default Filters

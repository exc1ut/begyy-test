import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as BREAKPOINTS from 'constants/breakpoints'
import { useMediaQuery } from 'react-responsive'
import Filters from 'components/filters'
import { prop, propOr } from 'ramda'
import * as STATES from 'constants/states'
import { useSelector } from 'react-redux'

// Styles
const Button = styled('button').attrs({ type: 'button' })`
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

function ListFilters(props) {
  const { title, breadcrumbsWay, isSuccess, isBrandPage = false } = props

  const isTablet = useMediaQuery({ query: `(${BREAKPOINTS.TABLET})` })

  const [isOpen, setIsOpen] = useState(false)

  const brands = useSelector(prop(STATES.BRANDS))
  const brandsData = propOr([], 'data', brands)

  const handleToggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'hidden scroll'
    }
    return () => {
      document.body.style.overflow = 'hidden scroll'
    }
  }, [isOpen])

  const buttonEl = isTablet ? <Button onClick={handleToggle}>Категории и фильтры</Button> : null

  const listEl =
    !isTablet || isOpen ? (
      <Filters
        isBrandPage={isBrandPage}
        breadcrumbsWay={breadcrumbsWay}
        title={title}
        setIsOpenFilters={setIsOpen}
        brandsData={brandsData}
      />
    ) : null

  if (isSuccess || isBrandPage) {
    return (
      <>
        {buttonEl}
        {listEl}
      </>
    )
  }
  return null
}

export default ListFilters

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { isEmpty, isNil, propOr } from 'ramda'
import mapIndexed from 'tools/mapIndexed'
import Link from 'next/link'
import ChevronRight from 'media/icons/ChevronRight'

const BreadcrumbsWrap = styled('div')`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-end;
  font-size: ${({ theme }) => theme.fontSize.body};
  line-height: 1.4;
  color: ${({ theme }) => theme.color.primary};
  margin-bottom: 10px;
  min-height: 25px;
  height: auto;
  & > *:not(:last-child) {
    margin: 0 10px 8px 0;
    transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.palette.primary};
      transition: ${({ theme }) => `opacity ${theme.transition.fast}`};
    }
    svg {
      margin-left: 10px;
      font-size: 14px;
      position: relative;
      top: 2px;
      stroke: ${({ theme }) => theme.color.primary};
    }
  }
  & > em {
    font-style: normal;
    cursor: default;
    color: ${({ theme }) => theme.color.minor};
    margin: 0 10px 8px 0;
  }
`

const Breadcrumbs = props => {
  const { way = [], currentWay = '...', className } = props

  const list = mapIndexed((item, index) => {
    if (item) {
      return (
        <Link href={propOr('#', 'path', item)} key={index} passHref>
          <a>
            <span>{propOr('...', 'title', item)}</span>
            <ChevronRight />
          </a>
        </Link>
      )
    }
    return null
  }, way)

  return (
    <BreadcrumbsWrap className={className}>
      {!isNil(way) && !isEmpty(way) ? list : null}
      <em>{currentWay}</em>
    </BreadcrumbsWrap>
  )
}

Breadcrumbs.propTypes = {
  way: PropTypes.array,
  currentWay: PropTypes.string
}

export default Breadcrumbs

import React from 'react'
import styled from 'styled-components'
import Container from 'components/container'
import * as BREAKPOINTS from 'constants/breakpoints'
import Breadcrumbs from 'components/breadcrumbs'

// Styles
const Wrap = styled(Container)`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    & > *:first-child {
      margin-bottom: 10px;
    }
  }
`
const Content = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  flex-grow: 1;
  & > *:not(:last-child) {
    margin-right: 30px;
  }
  @media only screen and (${BREAKPOINTS.TABLET}) {
    position: relative;
    flex-flow: column nowrap;
    & > *:not(:last-child) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
`

function ListContainer(props) {
  const { title, breadcrumbsWay, children } = props

  return (
    <Wrap>
      <Breadcrumbs way={breadcrumbsWay} currentWay={title} />
      <Content>{children}</Content>
    </Wrap>
  )
}

export default ListContainer

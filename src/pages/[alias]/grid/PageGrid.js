import Container from 'components/container'
import styled from 'styled-components'
import { propOr } from 'ramda'
import Loader from 'components/loader'

// Styles
const Wrap = styled(Container)`
  padding-bottom: 60px;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`
const HTML = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  color: ${({ theme }) => theme.color.secondary};
  font-size: ${({ theme }) => theme.fontSize.title};
  text-shadow: ${({ theme }) => theme.textShadow.headline};
  font-weight: 300;
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
  & h1,
  & h2 {
    font-size: ${({ theme }) => theme.fontSize.titleLarge};
  }
  & b {
    font-weight: 500;
  }
  & em {
    font-style: italic;
  }
  & ul {
    list-style: disc;
    padding-left: 30px;
  }
  & ol {
    list-style: decimal;
    padding-left: 30px;
  }
  & a {
    color: ${({ theme }) => theme.palette.primary};
    &:hover {
      text-decoration: underline;
    }
  }
  & hr {
    width: 100%;
    background: none;
    height: 0;
    border: 1px solid ${({ theme }) => theme.palette.grey};
  }
  & table {
    font-size: ${({ theme }) => theme.fontSize.headline};
    color: inherit;
    border-radius: ${({ theme }) => theme.borderRadius.button};
    width: 100%;
    max-width: 100%;
    border-collapse: collapse;
    & * {
      overflow-wrap: break-word;
      border: ${({ theme }) => theme.border.button};
    }
    & th,
    & tr,
    & td {
      padding: 8px 10px;
      text-align: left;
      font-weight: 300;
    }
    & tr > th {
      font-weight: 500;
    }
    & tr > td:first-child {
      font-weight: 400;
    }
  }
  & .pages__table {
    max-width: 100%;
    width: 100%;
    overflow-x: auto;
  }
`

// Component
const PageGrid = props => {
  const { pagesDetail } = props

  const pagesDetailData = propOr({}, 'data', pagesDetail)
  const pagesDetailLoading = propOr(false, 'loading', pagesDetail)
  const pagesDetailFailed = propOr(false, 'failed', pagesDetail)

  const { html } = pagesDetailData

  if (pagesDetailLoading) {
    return (
      <Wrap>
        <Loader />
      </Wrap>
    )
  } else if (pagesDetailFailed) {
    return (
      <Wrap>
        <HTML>Что-то пошло не так</HTML>
      </Wrap>
    )
  }

  return (
    <Wrap>
      <HTML dangerouslySetInnerHTML={{ __html: html }} />
    </Wrap>
  )
}

export default PageGrid

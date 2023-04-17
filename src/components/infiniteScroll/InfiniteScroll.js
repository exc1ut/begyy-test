import React from 'react'
import axios, { getPayloadFromError } from 'tools/axios'
import axiosCore from 'axios'
import InfiniteScroller from 'react-infinite-scroller'
import toSnakeCase from 'tools/toSnakeCase'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { length, path, pathOr, prop, propOr } from 'ramda'
import Loader from 'components/loader'
import { getParams } from 'tools/get'
import useCompareEffect from 'hooks/useCompareEffect'
import { useRouter } from 'next/router'
import { DEFAULT_PICK_PARAMS } from 'constants/params'
import queryString from 'query-string'

// Styles
const LoadWrap = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  grid-column: 1 / -1;
`
const NoData = styled('div')`
  grid-column: 1 / -1;
`
const defaultStyles = {
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '20px',
  padding: 0
}

// Constants
export const AXIOS_CANCEL_TOKEN_ANCHOR_MESSAGE = 'AXIOS_REQUEST_WAS_FORCIBLY_STOPPED'

const fetchAction = props => {
  const { cancelTokenSource, params, api, actionType, stateName, offset = 0, isExtra = false } = props

  const fetchParams = {
    ...params,
    offset
  }

  return (dispatch, getState) => {
    const payload = axios({ getState })
      .get(api, { params: fetchParams, cancelToken: cancelTokenSource.token })
      .then(response => {
        const store = getState()
        const currState = prop(stateName, store)

        const currResults = path(['data', 'results'], currState)
        const countResponse = pathOr(0, ['data', 'count'], response)
        const resultsResponse = pathOr([], ['data', 'results'], response)

        if (isExtra) {
          return {
            count: countResponse,
            results: [...currResults, ...resultsResponse]
          }
        }
        return {
          count: countResponse,
          results: resultsResponse
        }
      })
      .catch(er => getPayloadFromError(er, dispatch))

    return dispatch({
      type: `${actionType}`,
      payload
    })
  }
}
const clearAction = ({ actionType }) => ({
  type: `${actionType}_CLEAR`
})

export const InfiniteLoader = () => (
  <LoadWrap>
    <Loader />
  </LoadWrap>
)
// Component
const InfiniteScroll = props => {
  const {
    list = [],
    threshold = 200,
    useWindow = true,
    api,
    actionType,
    stateName,
    element = 'div',
    serializer = toSnakeCase,
    emptyData = <NoData>По вашему запросу ничего не найдено</NoData>,
    styles,
    params,
    limit = 12,
    pickParams = DEFAULT_PICK_PARAMS
  } = props

  const cancelTokenSource = axiosCore.CancelToken.source()

  const router = useRouter()
  const asPath = propOr('', 'asPath', router)
  const search = `${asPath}`.split('?')[1] || ''
  const searchQueries = queryString.parse(search)
  const queries = getParams(searchQueries, pickParams)

  const dispatch = useDispatch()

  const state = useSelector(prop(stateName))
  const stateDataCount = pathOr(0, ['data', 'count'], state)
  const stateLoading = propOr(false, 'loading', state)
  const stateFailed = propOr(false, 'failed', state)

  const listCount = Array.isArray(list) ? length(list) : 0
  const hasMore = listCount < stateDataCount && !stateLoading
  const isEmptyData = (listCount === 0 && !stateLoading) || stateFailed
  const isInitialLoad = listCount === 0 && stateLoading
  const isExtraLoad = listCount !== 0 && stateLoading

  const clearAll = () => dispatch(clearAction({ actionType }))
  const fetchCatch = () => {}

  useCompareEffect(() => {
    clearAll()

    const actionParams = {
      limit,
      ...params,
      ...queries
    }
    const actionProps = {
      cancelTokenSource,
      params: serializer(actionParams),
      api,
      actionType,
      stateName,
      offset: 0,
      isExtra: false
    }

    dispatch(fetchAction(actionProps)).catch(fetchCatch)

    return () => {
      cancelTokenSource.cancel(AXIOS_CANCEL_TOKEN_ANCHOR_MESSAGE)
    }
  }, [queries, params, api])

  const loadMore = () => {
    const actionParams = {
      limit,
      offset: listCount,
      ...params,
      ...queries
    }
    const actionProps = {
      cancelTokenSource,
      params: serializer(actionParams),
      api,
      actionType,
      stateName,
      offset: listCount,
      isExtra: true
    }

    if (listCount !== 0) {
      dispatch(fetchAction(actionProps)).catch(fetchCatch)
    }
  }

  const extraLoader = (
    <LoadWrap>
      <Loader size={0.7} />
    </LoadWrap>
  )

  const scrollContent = isInitialLoad ? <InfiniteLoader /> : isEmptyData ? emptyData : list

  return (
    <InfiniteScroller
      threshold={threshold}
      useWindow={useWindow}
      hasMore={hasMore}
      loadMore={loadMore}
      element={element}
      style={{ ...defaultStyles, ...styles }}
    >
      {scrollContent}
      {isExtraLoad && extraLoader}
    </InfiniteScroller>
  )
}

InfiniteScroll.propTypes = {
  list: PropTypes.array.isRequired,
  api: PropTypes.string.isRequired,
  actionType: PropTypes.string.isRequired,
  stateName: PropTypes.string.isRequired,
  serializer: PropTypes.func,
  element: PropTypes.string,
  useWindow: PropTypes.bool,
  styles: PropTypes.object,
  params: PropTypes.object,
  emptyData: PropTypes.any,
  pickParams: PropTypes.array,
  threshold: PropTypes.number
}

export default InfiniteScroll

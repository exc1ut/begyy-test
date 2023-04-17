import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { categoriesAction, configsAction } from 'redux/actions/mainActions'
import { prop } from 'ramda'
import * as STATES from 'constants/states'
import Loader from 'components/loader'
import styled from 'styled-components'
import { initCartProductsAction } from 'redux/actions/cartActions'
import { getCartProducts } from 'tools/cart'

// Styles
const Preloader = styled(Loader)`
  margin: 0 auto !important;
  transform: translateY(calc(50vh - 50%));
`
const Error = styled('div')`
  padding: 30px 10px;
  text-align: center;
`

// Component
const LayoutProvider = props => {
  const { children } = props

  const dispatch = useDispatch()

  const configs = useSelector(prop(STATES.CONFIGS))
  const configsLoading = prop('loading', configs)
  const configsFailed = prop('failed', configs)
  const configsSuccess = prop('success', configs)

  const categories = useSelector(prop(STATES.CATEGORIES))
  const categoriesLoading = prop('loading', categories)
  const categoriesFailed = prop('failed', categories)
  const categoriesSuccess = prop('success', categories)

  const loading = configsLoading || categoriesLoading
  const error = configsFailed || categoriesFailed
  const success = configsSuccess || categoriesSuccess

  const initCartProducts = () => dispatch(initCartProductsAction(getCartProducts()))

  useEffect(() => {
    dispatch(configsAction())
    dispatch(configsAction())
    dispatch(categoriesAction())
    initCartProducts()

    const storageListener = () => initCartProducts()

    window.addEventListener('storage', storageListener)
    return () => window.removeEventListener('storage', storageListener)
  }, [])

  if (error) {
    return <Error>Ошибка при загрузке конфигураций, проверьте соединение с интернетом и попробуйте позже.</Error>
  } else if (loading || !success) {
    return <Preloader />
  } else {
    return <div>{children}</div>
  }
}

export default LayoutProvider

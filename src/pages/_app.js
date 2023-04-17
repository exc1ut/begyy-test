import React from 'react'
import ThemeProvider from 'providers/theme'
import { Provider as StoreProvider } from 'react-redux'
import { momentConfig } from 'tools/moment'
import withRedux from 'next-redux-wrapper'
import { compose } from 'redux'
import { initialStore } from 'redux/store/store'
import LayoutProvider from 'providers/layout'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/lazy/lazy.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

// Enhance
const enhance = compose(withRedux(initialStore))

// Moment
momentConfig()

// Component
const App = props => {
  const { Component, pageProps, store } = props

  return (
    <>
      <StoreProvider store={store}>
        <ThemeProvider>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </ThemeProvider>
      </StoreProvider>
      <ToastContainer />
    </>
  )
}

export default enhance(App)

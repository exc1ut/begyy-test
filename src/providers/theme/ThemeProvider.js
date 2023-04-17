import React from 'react'
import { ThemeProvider as Provider } from 'styled-components'
import theme from 'constants/themes'
import NormalizeCSS from 'themes/NormalizeCSS'
import MainCSS from 'themes/MainCSS'

// Component
export const ThemeProvider = props => {
  const { children } = props

  return (
    <Provider theme={theme}>
      <NormalizeCSS />
      <MainCSS />
      {children}
    </Provider>
  )
}

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import portals from 'portals'
import { handleTitle } from 'constants/handlers'

// Component
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  renderHead = () => {
    return (
      <Head>
        <meta charSet={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width,initial-scale=1'} />
        <meta name={'theme-color'} content={'#fff'} />
        <meta name={'apple-mobile-web-app-capable'} content={'yes'} />
        <meta name={'apple-mobile-web-app-status-bar-style'} content={'black-translucent'} />
        <link rel={'icon'} href={'/favicon.ico'} />
        <link rel={'apple-touch-icon'} href={'/images/icon-192x192.png'} />
        <link rel={'apple-touch-icon'} href={'/images/icon-512x512.png'} />
        <link rel={'manifest'} href={'/manifest.json'} />
        <title>{handleTitle()}</title>
      </Head>
    )
  }

  renderPortals = () => {
    return portals.map(item => {
      return <div key={item} id={item} />
    })
  }

  renderBody = () => {
    return (
      <body>
        <Main />
        {this.renderPortals()}
        <NextScript />
      </body>
    )
  }

  render() {
    return (
      <Html lang={'ru'}>
        {this.renderHead()}
        {this.renderBody()}
      </Html>
    )
  }
}

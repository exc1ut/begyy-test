import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { handleTitle } from 'constants/handlers'
import { loading } from 'tools/loading'
import NavBar from 'components/navBar'
import Footer from 'components/footer'
import * as CONST from 'constants/constants'
import * as BREAKPOINTS from 'constants/breakpoints'
import { useMediaQuery } from 'react-responsive'
import { prop, propOr } from 'ramda'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'

// Styles
const Wrap = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  background: ${({ theme }) => theme.background.primary};
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.height.header.desktop} 0 0`};
  @media only screen and (${BREAKPOINTS.TABLET}) {
    padding: ${({ theme }) => `${theme.height.header.tablet} 0 0`};
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    padding: ${({ theme }) => `${theme.height.header.mobile} 0 ${theme.height.fixedButtons}`};
  }
`
const Inner = styled('main')`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  width: ${({ theme }) => theme.width.wrap};
  max-width: 100%;
  margin: 0 auto;
`
const FixedButtons = styled('div')`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  padding: 8px 10px;
  height: ${({ theme }) => theme.height.fixedButtons};
  background: ${({ theme }) => theme.background.fixedButtons};
  z-index: 1000;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`
const FixedButton = styled('a')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.primary};
  color: ${({ theme }) => theme.color.fixedButtons};
  background: ${({ theme, background }) => background || theme.palette.main};
  box-shadow: 0 0 5px #a0a0a0;
  cursor: pointer;
  & svg {
    font-size: 22px;
  }
`

// Component
const Layout = props => {
  const {
    children,
    title,
    defaultMetaDescription = true,
    defaultMetaTitle = true,
    metaDescription = '',
    metaKeywords = ''
  } = props
  const isMobile = useMediaQuery({ query: `(${BREAKPOINTS.MOBILE})` })

  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const phoneNumber = propOr('', 'PHONE_NUMBER', configsData)
  const phoneText = propOr('', 'PHONE_TEXT', configsData)
  const telegramLink = propOr('#', 'TELEGRAM_LINK', configsData)

  const fixedButtons = isMobile ? (
    <FixedButtons>
      <FixedButton target={'_blank'} rel={'noreferrer noopener'} href={telegramLink}>
        Telegram
      </FixedButton>
      <FixedButton href={`tel:${phoneNumber}`}>{phoneText}</FixedButton>
    </FixedButtons>
  ) : null

  return (
    <>
      <Head>
        <title>{handleTitle(title, defaultMetaTitle)}</title>
        <meta
          name={'description'}
          content={`${metaDescription ? `${metaDescription}. ` : ''}${
            defaultMetaDescription ? CONST.META_DESCRIPTION : ''
          }`}
        />
        <meta name={'keywords'} content={`${metaKeywords ? `${metaKeywords}, ` : ''}${CONST.META_KEYWORDS}`} />
        <meta name="robots" content="index" />
        <meta name="googlebot" content="index" />
      </Head>
      <Wrap>
        <NavBar loading={loading()} />
        <Inner>{children}</Inner>
        <Footer />
        {fixedButtons}
      </Wrap>
    </>
  )
}

export default Layout

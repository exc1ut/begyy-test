import styled from 'styled-components'
import * as CONST from 'constants/constants'
import TelegramIcon from 'media/icons/TelegramIcon'
import InstagramIcon from 'media/icons/InstagramIcon'
import FacebookIcon from 'media/icons/FacebookIcon'
import CallIcon from 'media/icons/CallIcon'
import MainIcon from 'media/icons/MainIcon'
import SettingsIcon from 'media/icons/SettingsIcon'
import { prop, propOr } from 'ramda'
import { useSelector } from 'react-redux'
import * as STATES from 'constants/states'
import * as BREAKPOINTS from 'constants/breakpoints'
import Link from 'next/link'
import * as ROUTES from 'constants/routes'
import { sprintf } from 'sprintf-js'

// Styles
const Wrap = styled('footer')`
  background: ${({ theme }) => theme.background.footer};
  color: ${({ theme }) => theme.color.footer};
  margin-top: auto;
`
const Inner = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  width: ${({ theme }) => theme.width.wrap};
  max-width: 100%;
  margin: 0 auto;
  padding: 5px 15px;
  @media only screen and (${BREAKPOINTS.TABLET}) {
    padding: 30px 15px;
  }
`
const Top = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 80px;
  padding: 30px 0;
  @media only screen and (${BREAKPOINTS.TABLET}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 40px;
    text-align: center;
    padding: 0;
  }
  @media only screen and (${BREAKPOINTS.MOBILE}) {
    grid-template-columns: repeat(1, 1fr);
    text-align: center;
  }
`
const Bottom = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  @media only screen and (${BREAKPOINTS.TABLET}) {
    flex-flow: column-reverse nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px 0 0;
    & > *:not(:first-child) {
      margin-bottom: 10px;
    }
  }
`
const PagesList = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  & > *:not(:last-child) {
    margin-bottom: 15px;
  }
`
const PageListTitle = styled('div')`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.white};
`
const PageLink = styled('a')`
  position: relative;
  color: ${({ theme }) => theme.color.footerDark};
  transition: ${({ theme }) => `color ${theme.transition.fast}`};
  &:hover {
    color: ${({ theme }) => theme.palette.primaryLight};
    text-decoration: underline;
    transition: ${({ theme }) => `color ${theme.transition.fast}`};
  }
`
const Copyright = styled('div')`
  color: ${({ theme }) => theme.color.footer};
`
const SocialLink = styled('a')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 10px;
  color: ${({ theme }) => theme.color.footer};
  transition: ${({ theme }) => `color ${theme.transition.fast}`};
  & > svg {
    font-size: 16px;
  }
  &:hover {
    color: ${({ theme }) => theme.palette.primaryLight};
    transition: ${({ theme }) => `color ${theme.transition.fast}`};
  }
`
const Contacts = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 7px;
  }
`

// Component
const Footer = () => {
  const configs = useSelector(prop(STATES.CONFIGS))
  const configsData = propOr({}, 'data', configs)

  const phoneNumber = propOr('', 'PHONE_NUMBER', configsData)
  const email = propOr('', 'EMAIL', configsData)
  const emailText = propOr('', 'EMAIL_TEXT', configsData)
  const phoneText = propOr('', 'PHONE_TEXT', configsData)
  const telegramLink = propOr('#', 'TELEGRAM_LINK', configsData)
  const telegramText = propOr('', 'TELEGRAM_TEXT', configsData)
  const facebookLink = propOr('#', 'FACEBOOK_LINK', configsData)
  const instagramLink = propOr('#', 'INSTAGRAM_LINK', configsData)

  const copyright = <Copyright>{CONST.COPYRIGHT}</Copyright>

  const contacts = (
    <Contacts>
      <SocialLink href={`tel:${phoneNumber}`}>
        <CallIcon />
      </SocialLink>
      <SocialLink href={`mailto:${email}`}>
        <MainIcon />
      </SocialLink>
      <SocialLink href={telegramLink} target={'_blank'} rel={'noreferrer noopener'}>
        <TelegramIcon />
      </SocialLink>
      <SocialLink href={facebookLink} target={'_blank'} rel={'noreferrer noopener'}>
        <FacebookIcon />
      </SocialLink>
      <SocialLink href={instagramLink} target={'_blank'} rel={'noreferrer noopener'}>
        <InstagramIcon />
      </SocialLink>
      <Link href={ROUTES.DEVELOPMENT_URL} passHref>
        <SocialLink>
          <SettingsIcon />
        </SocialLink>
      </Link>
    </Contacts>
  )

  return (
    <Wrap>
      <Inner>
        <Top>
          <PagesList>
            <PageListTitle>О компании</PageListTitle>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.ABOUT_US_ALIAS)} passHref>
              <PageLink>О нас</PageLink>
            </Link>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.CONTACTS_ALIAS)} passHref>
              <PageLink>Контакты</PageLink>
            </Link>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.SOCIAL_MEDIA_ALIAS)} passHref>
              <PageLink>Социальные сети</PageLink>
            </Link>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.TERMS_OF_USE_ALIAS)} passHref>
              <PageLink>Условия использования</PageLink>
            </Link>
          </PagesList>
          <PagesList>
            <PageListTitle>Партнёрам</PageListTitle>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.COOPERATION_ALIAS)} passHref>
              <PageLink>Для сотрудничества</PageLink>
            </Link>
            <Link href={ROUTES.DEVELOPMENT_URL} passHref>
              <PageLink>Разработка</PageLink>
            </Link>
          </PagesList>
          <PagesList>
            <PageListTitle>Покупателям</PageListTitle>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.DELIVERY_ALIAS)} passHref>
              <PageLink>Доставка</PageLink>
            </Link>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.PAYMENT_ALIAS)} passHref>
              <PageLink>Оплата</PageLink>
            </Link>
            <Link href={sprintf(ROUTES.PAGES_DETAIL, ROUTES.RETURNS_ALIAS)} passHref>
              <PageLink>Возврат и обмен</PageLink>
            </Link>
          </PagesList>
          <PagesList>
            <PageListTitle>Контакты</PageListTitle>
            <PageLink href={`tel:${phoneNumber}`}>{phoneText}</PageLink>
            <PageLink target={'_blank'} rel={'noreferrer noopener'} href={telegramLink}>
              {telegramText}
            </PageLink>
            <PageLink target={'_blank'} rel={'noreferrer noopener'} href={`mailto:${email}`}>
              {emailText}
            </PageLink>
          </PagesList>
        </Top>
        <Bottom>
          {copyright}
          {contacts}
        </Bottom>
      </Inner>
    </Wrap>
  )
}

export default Footer

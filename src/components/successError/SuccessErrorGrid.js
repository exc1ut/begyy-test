import React from 'react'
import styled from 'styled-components'
import * as ROUTES from '../../constants/routes'
import { useRouter } from 'next/router'

const Styles = styled.div`
  .wrapper-1 {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .wrapper-2 {
    padding: 30px;
    text-align: center;
  }
  h1 {
    font-size: 35px;
    letter-spacing: 3px;
    margin: 0;
    margin-bottom: 20px;
  }
  .wrapper-2 p {
    margin: 0;
    font-size: 1.3em;
    color: #aaa;
    letter-spacing: 1px;
  }
  .go-home {
    color: #fff;
    background: ${({ theme }) => theme.background.button};
    border: none;
    padding: 10px 50px;
    margin: 30px 0;
    border-radius: 30px;
  }
  .footer-like {
    margin-top: auto;
    background: ${({ error }) => (error ? '#fb6565' : '#d7e6fe')};
    padding: 6px;
    text-align: center;
  }
  .footer-like p {
    margin: 0;
    padding: 4px;
    color: ${({ error }) => (error ? '#fff' : '#5892ff')};
    letter-spacing: 1px;
  }
  .footer-like p a {
    text-decoration: none;
    color: #5892ff;
    font-weight: 600;
  }

  @media (min-width: 360px) {
    .go-home {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 600px) {
    max-width: 1000px;
    margin: 0 auto;
    h1 {
      font-size: 48px;
    }
    .wrapper-1 {
      max-width: 620px;
      margin: 0 auto;
      margin-top: 50px;
      box-shadow: 4px 8px 40px 8px rgba(63, 63, 63, 0.1);
    }
  }
`
const SuccessErrorGrid = ({ error }) => {
  const router = useRouter()
  const redirectHandle = () => {
    router.push(ROUTES.ROOT_URL).then(() => window.scrollTo(0, 0))
  }
  return (
    <Styles error={error}>
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1>{error ? 'Ошибка' : 'Ваш заказ оформлен'}</h1>
          <p>
            {error
              ? 'При оформлении рассрочки возникла ошибка'
              : 'Менеджер свяжется с вами в ближайшее время , для подтверждения заказа'}
          </p>
          {!error && (
            <p>
              так же вы можете связаться с менеджером по телефону/Telegram - <b>+990970010974</b>
            </p>
          )}
          <button className="go-home" type={'button'} onClick={redirectHandle}>
            Вернуться на главную
          </button>
        </div>
        <div className="footer-like">
          <p>{error ? 'Свяжитесь с оператором' : 'Спасибо за покупку'}</p>
        </div>
      </div>
    </Styles>
  )
}

export default SuccessErrorGrid

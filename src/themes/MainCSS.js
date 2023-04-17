import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *{
    ::-webkit-scrollbar{
      width: ${({ theme }) => theme.width.thumb};
      height: ${({ theme }) => theme.height.thumb};
      overflow: visible;
    }
    ::-webkit-scrollbar-thumb{
      background: ${({ theme }) => theme.background.thumb};
    }
  }
  body{
    font-family: ${({ theme }) => theme.fontFamily.primary};
    background: ${({ theme }) => theme.palette.white};
    color: ${({ theme }) => theme.color.primary};
    font-size: ${({ theme }) => theme.fontSize.body};
    line-height: 1.2;
    overflow-x: hidden;
    overflow-y: scroll;
    min-width: 320px;
  }
`

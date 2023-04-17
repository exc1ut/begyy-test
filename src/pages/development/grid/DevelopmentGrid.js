import Container from 'components/container'
import styled from 'styled-components'

// Styles
const Wrap = styled(Container)`
  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`
const Title = styled('h2')`
  font-size: ${({ theme }) => theme.fontSize.titleLarge};
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
  & h1 {
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
`
const SourceLink = styled('a')`
  display: block;
  margin-top: 5px;
`

// Component
const DevelopmentGrid = () => {
  const devLink = 'https://rousiq.github.io'
  const mailLink = 'mrousia@gmail.com'
  const linkedInLink = 'https://www.linkedin.com/in/rousiq'

  return (
    <Wrap>
      <Title>{decodeURI('%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0')}</Title>
      <HTML>
        <div>
          {decodeURI(
            '%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%20%D1%81%D0%B0%D0%B9%D1%82%D0%BE%D0%B2%20%D0%B8%20%D0%B2%D0%B5%D0%B1-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9%20%D1%80%D0%B0%D0%B7%D0%BD%D0%BE%D0%B9%20%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8.%20%D0%94%D0%BE%D1%80%D0%BE%D0%B3%D0%BE,%20%D0%BD%D0%BE%20%D0%BA%D0%B0%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE.'
          )}
        </div>
        <div>
          <h2>{decodeURI('%D0%9F%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE:')}</h2>
          <SourceLink target={'_blank'} rel={'noreferrer noopener'} href={devLink}>
            {devLink}
          </SourceLink>
        </div>
        <div>
          <h2>{decodeURI('%D0%9F%D0%BE%D1%87%D1%82%D0%B0:')}</h2>
          <SourceLink href={`mailto:${mailLink}`}>{mailLink}</SourceLink>
        </div>
        <div>
          <h2>LinkedIn:</h2>
          <SourceLink target={'_blank'} rel={'noreferrer noopener'} href={linkedInLink}>
            {linkedInLink}
          </SourceLink>
        </div>
      </HTML>
    </Wrap>
  )
}

export default DevelopmentGrid

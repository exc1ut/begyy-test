// Colors
const primaryColor = '#6b56f1'
const primaryDarkColor = '#523fcd'
const primaryLightColor = '#816dff'
const primaryOpacityColor = '#6b56f12e'
const mainColor = '#24292d'
const mainLightColor = '#24292dc7'
const redLightColor = '#ef41416e'
const whiteColor = '#fff'
const blackColor = '#000'
const secondaryColor = '#f5f5f5'

// FontColors
const primaryFontColor = '#24292d'

// FontSizes
const titleLargeSize = '26px'
const titleSize = '20px'
const headlineSize = '16px'
const bodySize = '14px'
const subheadSize = '12px'
const captionSize = '12px'

// Heights
const headerInfoHeightDesktop = '40px'
const headerInfoHeightTablet = '30px'
const headerInfoHeightMobile = '30px'

const headerNavHeightDesktop = '80px'
const headerNavHeightTablet = '70px'
const headerNavHeightMobile = '60px'

const headerMenuHeight = '50px'

const headerHeightDesktop = `calc(${headerInfoHeightDesktop} + ${headerNavHeightDesktop} + ${headerMenuHeight})`
const headerHeightTablet = `calc(${headerInfoHeightTablet} + ${headerNavHeightTablet})`

// Theme
const theme = {
  palette: {
    primary: primaryColor,
    primaryDark: primaryDarkColor,
    primaryLight: primaryLightColor,
    primaryOpacity: primaryOpacityColor,
    main: mainColor,
    mainLight: mainLightColor,
    black: blackColor,
    white: whiteColor,
    grey: '#ccc',
    red: '#ef4141',
    green: '#44c549',
    redLight: redLightColor
  },
  color: {
    primary: primaryFontColor,
    secondary: '#555',
    label: '#555',
    button: whiteColor,
    minor: '#b8b8b8',
    field: primaryFontColor,
    headerNav: whiteColor,
    headerMenuMobile: whiteColor,
    fixedButtons: whiteColor,
    footer: '#999',
    footerDark: '#9a9a9a'
  },
  background: {
    primary: whiteColor,
    secondary: secondaryColor,
    secondaryOpacity: '#eeeeee4d',
    headerInfo: whiteColor,
    headerNav: mainColor,
    headerMenu: secondaryColor,
    headerMenuMobile: mainColor,
    button: mainLightColor,
    buttonSecondary: '#f5f5f5',
    buttonHover: '#474d50',
    mask: '#00000099',
    footer: mainColor,
    skeleton: '#f5f5f5',
    field: '#fff',
    line: '#eaeaea',
    pagination: '#d0d0ce',
    thumb: mainColor,
    fixedButtons: secondaryColor
  },
  padding: {
    field: '6px 12px'
  },
  border: {
    primary: `1px solid ${primaryColor}`,
    card: `1px solid ${secondaryColor}`,
    field: '1px solid #dedede',
    hr: `1px solid ${secondaryColor}`,
    button: '1px solid #dcdcdc'
  },
  borderRadius: {
    primary: '5px',
    field: '5px',
    button: '5px'
  },
  width: {
    wrap: '1200px',
    field: '300px',
    thumb: '3px'
  },
  height: {
    header: {
      desktop: headerHeightDesktop,
      tablet: headerHeightTablet,
      mobile: headerNavHeightMobile
    },
    headerInfo: {
      desktop: headerInfoHeightDesktop,
      tablet: headerInfoHeightTablet,
      mobile: headerInfoHeightMobile
    },
    headerNav: {
      desktop: headerNavHeightDesktop,
      tablet: headerNavHeightTablet,
      mobile: headerNavHeightMobile
    },
    headerMenu: {
      desktop: headerMenuHeight
    },
    menuDropdown: 'auto',
    field: '35px',
    textarea: '70px',
    fixedButtons: '50px',
    thumb: '3px'
  },
  transition: {
    fast: '.1s ease-in-out',
    medium: '.2s ease-in-out',
    long: '.3s ease-in-out'
  },
  fontSize: {
    titleLarge: titleLargeSize,
    title: titleSize,
    headline: headlineSize,
    body: bodySize,
    subhead: subheadSize,
    caption: captionSize
  },
  fontFamily: {
    primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`
  },
  boxShadow: {
    menuDropdown: '0 30px 30px #00000017'
  },
  textShadow: {
    primary: `1px 1px 1px ${whiteColor}`
  },
  opacity: {
    linkActive: 0.7
  },
  blur: {
    primary: '2px'
  }
}

export default theme

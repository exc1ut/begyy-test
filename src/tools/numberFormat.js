import toNumber from 'tools/toNumber'

const numberFormat = (value, suffix, precision = 2) => {
  const numberValue = toNumber(value, precision)
  const formatter = new Intl.NumberFormat('ru-RU')
  const formattedValue = formatter.format(numberValue)

  if ((value || value === 0) && suffix) {
    return `${formattedValue}\u00A0${suffix}`
  } else if (value) {
    return formattedValue
  }
  return 0
}

export default numberFormat

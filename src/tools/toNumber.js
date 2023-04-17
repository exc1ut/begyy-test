const toNumber = (value, precision = 2) => {
  const number = Number(value)
  return isNaN(number) ? 0 : precision ? +number.toFixed(precision) : number
}

export default toNumber

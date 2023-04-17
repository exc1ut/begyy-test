import moment from 'moment'

// Meta
export const META_DESCRIPTION = 'El\u0027cos. Интернет-магазин косметики и парфюмерии в Ташкенте.'
export const META_KEYWORDS =
  'El\u0027cos, Elcos, Элькос, Интернет-магазин, Косметика, Парфюмерия, Ташкент, Узбекистан, Доставка'

// Title
export const STATIC_TITLE = 'Интернет-магазин косметики и парфюмерии в Ташкенте | Elcos'

// Copyright
export const CURRENT_YEAR = moment().format('YYYY')
const START_YEAR = '2017'
export const FOUNDATION_PERIOD = CURRENT_YEAR === START_YEAR ? START_YEAR : `${START_YEAR} - ${CURRENT_YEAR}`
export const COPYRIGHT = `\u00A9 ${FOUNDATION_PERIOD} ${STATIC_TITLE}`

// Products
export const BUTTON_DETAIL_PROMPT = 'У товара есть опции, нажмите "Подробнее", чтобы добавить товар в корзину'
export const PRODUCTS_UNAVAILABLE =
  'В настоящее время выбранного товара нет в наличии, уточните сроки поставки по указанным контактам'

export const INSTALLMENT = 4
export const ZOODPAY = 'zoodpay'
export const CASH = 'cash'

export const MIN_PRICE = 150000
export const MAX_PRICE = 6000000

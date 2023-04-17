import * as CONST from 'constants/constants'

// Title
export const handleTitle = (title, defaultMetaTitle) =>
  title ? `${title}${defaultMetaTitle ? ` - ${CONST.STATIC_TITLE}` : ''}` : CONST.STATIC_TITLE

// Order
export const successOrder = id => `Заказ оформлен, ваш номер ${id}. Ожидайте звонка оператора`

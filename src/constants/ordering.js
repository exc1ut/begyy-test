export const NAME = 'name'
export const PRICE = 'basic_price'
export const DATE = 'created_date'

export const OPTIONS = [
  {
    alias: `-${DATE}`,
    title: 'Сначала новые'
  },
  {
    alias: DATE,
    title: 'Сначала старые'
  },
  {
    alias: PRICE,
    title: 'Сначала дешёвые'
  },
  {
    alias: `-${PRICE}`,
    title: 'Сначала дорогие'
  },
  {
    alias: NAME,
    title: 'По названию от "А"'
  },
  {
    alias: `-${NAME}`,
    title: 'По названию от "Я"'
  }
]

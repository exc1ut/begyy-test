import moment from 'moment'

export const momentConfig = () => {
  moment.locale('ru')
  moment.updateLocale('ru', {
    monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
  })
}

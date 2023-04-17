import { pick, pipe } from 'ramda'

export const getParams = (params = {}, keys) => pipe(pick(keys))(params)

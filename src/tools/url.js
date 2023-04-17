import { join, map, pipe, pluck, reverse, toPairs } from 'ramda'

export const paramsToSearch = pipe(toPairs, map(join('=')), join('&'))

export const createSlugsPath = (arr, name = 'alias') => pipe(reverse, pluck(name), join('/'))(arr)

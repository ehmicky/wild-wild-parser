import { ARRAY_SEPARATOR, TOKEN_SEPARATOR } from './tokens/escape.js'
import { getObjectTokenType } from './tokens/main.js'
import { normalizeQueryArrays } from './validate/arrays.js'
import { validatePath } from './validate/path.js'

// Inverse of `parseQuery()`
export const serializeQuery = (queryArrays) => {
  const queryArraysA = normalizeQueryArrays(queryArrays, queryArrays)
  return queryArraysA.map(serializeQueryArray).join(ARRAY_SEPARATOR)
}

// Inverse of `parsePath()`
export const serializePath = (path) => {
  validatePath(path, path)
  return serializeQueryArray(path)
}

const serializeQueryArray = (queryArray) =>
  queryArray.every(isEmptyToken)
    ? TOKEN_SEPARATOR.repeat(queryArray.length + 1)
    : queryArray.map(serializeToken).join(TOKEN_SEPARATOR)

const isEmptyToken = (token) => token === EMPTY_TOKEN

const EMPTY_TOKEN = ''

export const serializeToken = (token, index) => {
  const tokenType = getObjectTokenType(token)
  return tokenType.serialize(token, index)
}

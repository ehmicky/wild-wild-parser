import { TOKEN_SEPARATOR, ARRAY_SEPARATOR } from './tokens/escape.js'
import { getObjectTokenType } from './tokens/main.js'
import { normalizeQueryArrays } from './validate/arrays.js'
import { normalizeArrayPath } from './validate/path.js'

// Inverse of `parseQuery()`
export const serializeQuery = function (queryArrays) {
  const queryArraysA = normalizeQueryArrays(queryArrays, queryArrays)
  return queryArraysA.map(serializeQueryArray).join(ARRAY_SEPARATOR)
}

// Inverse of `parsePath()`
export const serializePath = function (path) {
  const pathA = normalizeArrayPath(path, path)
  return serializeQueryArray(pathA)
}

const serializeQueryArray = function (queryArray) {
  return queryArray.every(isEmptyToken)
    ? TOKEN_SEPARATOR.repeat(queryArray.length + 1)
    : queryArray.map(serializeToken).join(TOKEN_SEPARATOR)
}

const isEmptyToken = function (token) {
  return token === EMPTY_TOKEN
}

const EMPTY_TOKEN = ''

const serializeToken = function (token, index) {
  const tokenType = getObjectTokenType(token)
  return tokenType.serialize(token, index)
}

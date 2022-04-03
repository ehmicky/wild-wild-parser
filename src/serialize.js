import moize from 'moize'

import { TOKEN_SEPARATOR, ARRAY_SEPARATOR } from './tokens/escape.js'
import { getObjectTokenType } from './tokens/main.js'
import { normalizeQueryArrays } from './validate/arrays.js'
import { normalizeArrayPath } from './validate/path.js'

// Inverse of `parseQuery()`
const mSerializeQuery = function (queryArrays) {
  const queryArraysA = normalizeQueryArrays(queryArrays, queryArrays)
  return queryArraysA.map(serializeQueryArray).join(ARRAY_SEPARATOR)
}

export const serializeQuery = moize(mSerializeQuery, { maxSize: 1e3 })

// Inverse of `parsePath()`
const mSerializePath = function (path) {
  const pathA = normalizeArrayPath(path, path)
  return serializeQueryArray(pathA)
}

export const serializePath = moize(mSerializePath, { maxSize: 1e3 })

const serializeQueryArray = function (queryArray) {
  return queryArray.every(isEmptyToken)
    ? TOKEN_SEPARATOR.repeat(queryArray.length + 1)
    : queryArray.map(serializeToken).join(TOKEN_SEPARATOR)
}

const isEmptyToken = function (token) {
  return token === EMPTY_TOKEN
}

const EMPTY_TOKEN = ''

const mSerializeToken = function (token, index) {
  const tokenType = getObjectTokenType(token)
  return tokenType.serialize(token, index)
}

const serializeToken = moize(mSerializeToken, { maxSize: 1e3 })

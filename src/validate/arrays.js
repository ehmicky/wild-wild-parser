import { getObjectTokenType } from '../tokens/main.js'

import { throwQueryError, throwTokenError } from './throw.js'

// Normalize query arrays
export const normalizeQueryArrays = function (queryArrays, query) {
  validateQueryArrays(queryArrays, query)
  const queryArraysA =
    queryArrays.every(Array.isArray) && queryArrays.length !== 0
      ? queryArrays
      : [queryArrays]
  return queryArraysA.map((queryArray) =>
    normalizeQueryArray(queryArray, query),
  )
}

const validateQueryArrays = function (queryArrays, query) {
  if (!Array.isArray(queryArrays)) {
    throwQueryError(query, 'It must be an array.')
  }
}

const normalizeQueryArray = function (queryArray, query) {
  return queryArray.map((token) => normalizeToken(token, query))
}

const normalizeToken = function (token, query) {
  const tokenType = getObjectTokenType(token)
  validateToken(tokenType, token, query)
  return tokenType.normalize(token)
}

const validateToken = function (tokenType, token, query) {
  if (tokenType === undefined) {
    throwTokenError(
      query,
      token,
      `It must be one of the following:
 - a property name string
 - an array index integer, positive or negative
 - a property name regular expression
 - { type: "any" }
 - { type: "slice", from: integer, to: integer }`,
    )
  }
}

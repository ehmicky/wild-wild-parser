import { throwQueryError } from './throw.js'
import { normalizeToken } from './token.js'

// Normalize query arrays
export const normalizeQueryArrays = (queryArrays, query) => {
  validateQueryArrays(queryArrays, query)
  const queryArraysA =
    queryArrays.every(Array.isArray) && queryArrays.length !== 0
      ? queryArrays
      : [queryArrays]
  return queryArraysA.map((queryArray) =>
    normalizeQueryArray(queryArray, query),
  )
}

const validateQueryArrays = (queryArrays, query) => {
  if (!Array.isArray(queryArrays)) {
    throwQueryError(query, 'It must be an array.')
  }
}

const normalizeQueryArray = (queryArray, query) =>
  queryArray.map((token) => normalizeToken(token, query))

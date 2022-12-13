import { normalizeArraysPath } from '../validate/path.js'
import { validateEmptyQuery, validateQueryString } from '../validate/string.js'

import { parseQueryString } from './query.js'

// Parse a query string into an array of tokens.
// Also validate and normalize it.
export const parsePath = (pathString) => {
  const queryArrays = parseQuery(pathString)
  return normalizeArraysPath(queryArrays, pathString)
}

// Same as `parsePath()` but for any query
export const parseQuery = (queryString) => {
  validateQueryString(queryString)
  const queryArrays = parseQueryString(queryString)
  validateEmptyQuery(queryArrays, queryString)
  return queryArrays
}

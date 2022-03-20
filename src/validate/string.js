import { throwQueryError } from './throw.js'

// Validate query string is a string
export const validateQueryString = function (queryString) {
  if (!isQueryString(queryString)) {
    throwQueryError(queryString, 'It must be a string.')
  }
}

// Most methods accept both query and array syntaxes.
// This checks which one is used.
export const isQueryString = function (query) {
  return typeof query === 'string'
}

// Empty query strings are ambiguous and not allowed
export const validateEmptyQuery = function (queryArrays, queryString) {
  if (queryArrays.length === 0) {
    throwQueryError(queryString, 'It must not be an empty string.')
  }
}

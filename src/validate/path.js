import { isPathToken } from '../tokens/main.js'

import { throwQueryError, throwTokenError } from './throw.js'

// Transform a queryArrays into a path, if possible
// Paths are a subset of query strings|arrays which use:
//  - No unions
//  - Only prop and index tokens (positive only)
// Those are the ones exposed in output, as opposed to query arrays which are
// exposed in input.
export const normalizeArraysPath = function (queryArrays, query) {
  if (queryArrays.length !== 1) {
    throwQueryError(query, 'It must not be a union.')
  }

  const [path] = queryArrays
  return normalizeArrayPath(path, query)
}

// Ensure a queryArray is a path
export const normalizeArrayPath = function (path, query) {
  if (!Array.isArray(path)) {
    throwQueryError(query, 'It must be an array.')
  }

  if (path.some(Array.isArray)) {
    throwQueryError(query, 'It must not be a union.')
  }

  path.forEach((prop) => {
    validatePathToken(prop, query)
  })
  return path
}

const validatePathToken = function (prop, query) {
  if (!isPathToken(prop)) {
    throwTokenError(
      query,
      prop,
      'It must be a property name or a positive array index.',
    )
  }
}

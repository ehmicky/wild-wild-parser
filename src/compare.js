import { normalizeQuery, normalizePath } from './normalize.js'
import { getValidTokenType } from './validate/token.js'

// Check if two queries are equal.
// Works with:
//  - Normalization, e.g. `:` === `0:`
//  - Unions, e.g. `a b` === `b a`
//  - Duplicates, e.g. `a a` === `a`
export const isSameQuery = (queryA, queryB) => {
  const queryArraysA = normalizeQuery(queryA)
  const queryArraysB = normalizeQuery(queryB)
  return (
    queryArraysA.every((queryArrayA) =>
      hasSameQueryArray(queryArraysB, queryArrayA),
    ) &&
    queryArraysB.every((queryArrayB) =>
      hasSameQueryArray(queryArraysA, queryArrayB),
    )
  )
}

const hasSameQueryArray = (queryArrays, queryArrayA) =>
  queryArrays.some((queryArrayB) => isSameQueryArray(queryArrayA, queryArrayB))

// Check if two paths are equal
export const isSamePath = (pathA, pathB) => {
  const pathC = normalizePath(pathA)
  const pathD = normalizePath(pathB)
  return isSameQueryArray(pathC, pathD)
}

const isSameQueryArray = (queryArrayA, queryArrayB) =>
  queryArrayA.length === queryArrayB.length &&
  queryArrayA.every((tokenA, index) => isSameToken(tokenA, queryArrayB[index]))

// Check if a path is a parent to another
export const isParentPath = (parentPath, childPath) => {
  const parentPathA = normalizePath(parentPath)
  const childPathA = normalizePath(childPath)
  return (
    childPathA.length > parentPathA.length &&
    childPathA.every(
      (childToken, index) =>
        index >= parentPathA.length ||
        isSameToken(childToken, parentPathA[index]),
    )
  )
}

// Check if two tokens are equal
export const isSameToken = (tokenA, tokenB) => {
  if (Object.is(tokenA, tokenB)) {
    return true
  }

  const tokenTypeA = getValidTokenType(tokenA)
  const tokenTypeB = getValidTokenType(tokenB)
  return tokenTypeA === tokenTypeB && tokenTypeA.equals(tokenA, tokenB)
}

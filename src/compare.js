import { normalizeQuery, normalizePath } from './normalize.js'
import { getObjectTokenType } from './tokens/main.js'

// Check if two queries are equal.
// Works with:
//  - Normalization, e.g. `:` === `0:`
//  - Unions, e.g. `a b` === `b a`
//  - Duplicates, e.g. `a a` === `a`
export const isSameQuery = function (queryA, queryB) {
  const queryArraysA = normalizeQuery(queryA)
  const queryArraysB = normalizeQuery(queryB)
  return (
    queryArraysA.length === queryArraysB.length &&
    queryArraysA.every((queryArrayA) =>
      hasSameQueryArray(queryArraysB, queryArrayA),
    ) &&
    queryArraysB.every((queryArrayB) =>
      hasSameQueryArray(queryArraysA, queryArrayB),
    )
  )
}

const hasSameQueryArray = function (queryArrays, queryArrayA) {
  return queryArrays.some((queryArrayB) =>
    isSameQueryArray(queryArrayA, queryArrayB),
  )
}

const isSameQueryArray = function (queryArrayA, queryArrayB) {
  return (
    queryArrayA.length === queryArrayB.length &&
    queryArrayA.every((tokenA, index) =>
      isSameToken(tokenA, queryArrayB[index]),
    )
  )
}

// Check if two paths are equal
export const isSamePath = function (pathA, pathB) {
  const pathC = normalizePath(pathA)
  const pathD = normalizePath(pathB)
  return (
    pathC.length === pathD.length &&
    pathC.every((prop, index) => isSameToken(pathD[index], prop))
  )
}

// Check if a path is a parent to another
export const isParentPath = function (parentPath, childPath) {
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
export const isSameToken = function (tokenA, tokenB) {
  if (tokenA === tokenB) {
    return true
  }

  const tokenTypeA = getObjectTokenType(tokenA)
  const tokenTypeB = getObjectTokenType(tokenB)
  return tokenTypeA === tokenTypeB && tokenTypeA.equals(tokenA, tokenB)
}

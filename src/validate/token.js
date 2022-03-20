import { getObjectTokenType } from '../tokens/main.js'

import { throwTokenError } from './throw.js'

// Normalize a token
export const normalizeToken = function (token, query) {
  const tokenType = getObjectTokenType(token)
  validateToken(tokenType, token, query)
  return tokenType.normalize(token)
}

// Validate a token has an existing type
export const validateToken = function (tokenType, token, query) {
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

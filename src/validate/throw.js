import { inspect } from 'util'

// Throw an error when a token is invalid
export const throwTokenError = function (queryArray, token, message) {
  throwQueryError(queryArray, `Invalid token: ${inspect(token)}\n${message}`)
}

// Throw an error when a query is invalid
export const throwQueryError = function (query, message) {
  throw new Error(`Invalid query: ${inspect(query)}\n${message}`)
}

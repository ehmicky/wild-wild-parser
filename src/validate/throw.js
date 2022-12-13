// Throw an error when a token is invalid
export const throwTokenError = (queryArray, token, message) => {
  throwQueryError(queryArray, `Invalid token: ${token}\n${message}`)
}

// Throw an error when a query is invalid
export const throwQueryError = (query, message) => {
  throw new Error(`Invalid query: ${query}\n${message}`)
}

// Check whether a token is an object of a given `type`
export const isTokenObject = (token, type) =>
  typeof token === 'object' && token !== null && token.type === type

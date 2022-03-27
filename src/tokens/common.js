// Check whether a token is an object of a given `type`
export const isTokenObject = function (token, type) {
  return typeof token === 'object' && token !== null && token.type === type
}

// Check the type of a parsed token.
// Integers specified as string tokens are assumed to be property names, not
// array indices.
export const testObject = (token) => Number.isInteger(token)

// Serialize a token to a string
const serialize = (token) => (Object.is(token, -0) ? '-0' : String(token))

// Check the type of a serialized token
const testString = (chars) => INTEGER_REGEXP.test(chars)

const INTEGER_REGEXP = /^-?\d+$/u

// Parse a string into a token
const parse = Number

// Normalize value after parsing or serializing
const normalize = (token) => token

// Check if two tokens are the same
const equals = (tokenA, tokenB) => Object.is(tokenA, tokenB)

export const INDEX_TOKEN = {
  name: 'index',
  testObject,
  serialize,
  testString,
  parse,
  normalize,
  equals,
}

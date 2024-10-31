import { ESCAPE, escapeSpecialChars, TOKEN_SEPARATOR } from './escape.js'
import { getOtherStringTokenType } from './other.js'

// Check the type of a parsed token
const testObject = (token) => typeof token === 'string'

// Serialize a token to a string
const serialize = (token, index) => {
  if (token === '' && index === 0) {
    return TOKEN_SEPARATOR
  }

  const chars = escapeSpecialChars(token)
  return getOtherStringTokenType(chars) === undefined
    ? chars
    : `${ESCAPE}${chars}`
}

// Check the type of a serialized token
const testString = () => true

// Parse a string into a token
const parse = (chars) => chars

// Normalize value after parsing or serializing
const normalize = (token) => token

// Check if two tokens are the same
const equals = (tokenA, tokenB) => tokenA === tokenB

export const PROP_TOKEN = {
  name: 'prop',
  testObject,
  serialize,
  testString,
  parse,
  normalize,
  equals,
}

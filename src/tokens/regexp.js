import { escapeSpecialChars } from './escape.js'

// Check the type of a parsed token
const testObject = function (token) {
  return token instanceof RegExp
}

// Serialize a token to a string
const serialize = function (token) {
  const source = escapeSpecialChars(token.source)
  return `${REGEXP_DELIM}${source}${REGEXP_DELIM}${token.flags}`
}

// Check the type of a serialized token
const testString = function (chars) {
  return chars[0] === REGEXP_DELIM && chars.lastIndexOf(REGEXP_DELIM) > 1
}

// Parse a string into a token
// This might throw if the RegExp is invalid.
const parse = function (chars) {
  const endIndex = chars.lastIndexOf(REGEXP_DELIM)
  const regExpString = chars.slice(1, endIndex)
  const regExpFlags = chars.slice(endIndex + 1)
  return new RegExp(regExpString, regExpFlags)
}

const REGEXP_DELIM = '/'

// Normalize value after parsing or serializing
const normalize = function (token) {
  return token
}

// Check if two tokens are the same
const equals = function (tokenA, tokenB) {
  return (
    tokenA.source === tokenB.source &&
    tokenA.flags === tokenB.flags &&
    tokenA.lastIndex === tokenB.lastIndex
  )
}

export const REGEXP_TOKEN = {
  name: 'regExp',
  testObject,
  serialize,
  testString,
  parse,
  normalize,
  equals,
}

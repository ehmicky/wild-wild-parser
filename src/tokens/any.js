import isPlainObj from 'is-plain-obj'

// Create a token type with:
//  - The string format being a specific string
//  - The array format being a plain object with a single `type` property
const createSimpleTokenType = function (name, tokenString) {
  return {
    name,
    testObject: testObject.bind(undefined, name),
    serialize: serialize.bind(undefined, tokenString),
    testString: testString.bind(undefined, tokenString),
    parse: parse.bind(undefined, name),
    normalize,
    equals,
  }
}

// Check the type of a parsed token
const testObject = function (type, token) {
  return isPlainObj(token) && token.type === type
}

// Serialize a token to a string
const serialize = function (tokenString) {
  return tokenString
}

// Check the type of a serialized token
const testString = function (tokenString, chars) {
  return chars === tokenString
}

// Parse a string into a token
const parse = function (type) {
  return { type }
}

// Normalize value after parsing or serializing
const normalize = function ({ type }) {
  return { type }
}

// Check if two tokens are the same
const equals = function () {
  return true
}

export const ANY_TOKEN = createSimpleTokenType('any', '*')
export const ANY_DEEP_TOKEN = createSimpleTokenType('anyDeep', '**')

import { isTokenObject } from './common.js'

// Create a token type with:
//  - The string format being a specific string
//  - The array format being a plain object with a single `type` property
const createSimpleTokenType = (name, tokenString) => ({
  name,
  testObject: testObject.bind(undefined, name),
  serialize: serialize.bind(undefined, tokenString),
  testString: testString.bind(undefined, tokenString),
  parse: parse.bind(undefined, name),
  normalize,
  equals,
})

// Check the type of a parsed token
const testObject = (type, token) => isTokenObject(token, type)

// Serialize a token to a string
const serialize = (tokenString) => tokenString

// Check the type of a serialized token
const testString = (tokenString, chars) => chars === tokenString

// Parse a string into a token
const parse = (type) => ({ type })

// Normalize value after parsing or serializing
const normalize = ({ type }) => ({ type })

// Check if two tokens are the same
const equals = () => true

export const ANY_TOKEN = createSimpleTokenType('any', '*')
export const ANY_DEEP_TOKEN = createSimpleTokenType('anyDeep', '**')

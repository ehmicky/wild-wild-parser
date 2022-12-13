import { INDEX_TOKEN } from './indices.js'
import { OTHER_STRING_TOKEN_TYPES, OTHER_OBJECT_TOKEN_TYPES } from './other.js'
import { PROP_TOKEN } from './prop.js'

// Retrieve the type name of a given token parsed object
export const getTokenType = (token) => {
  const tokenType = getObjectTokenType(token)
  return tokenType === undefined ? UNKNOWN_TYPE : tokenType.name
}

const UNKNOWN_TYPE = 'unknown'

// Retrieve the type of a given token parsed object
export const getObjectTokenType = (token) =>
  OBJECT_TOKEN_TYPES.find((tokenType) => tokenType.testObject(token))

// Retrieve the type of a given token serialized string
export const getStringTokenType = (chars, isProp) =>
  isProp
    ? PROP_TOKEN
    : STRING_TOKEN_TYPES.find((tokenType) => tokenType.testString(chars))

// Order is significant as they are tested serially.
// It is optimized for common use cases and performance.
const STRING_TOKEN_TYPES = [...OTHER_STRING_TOKEN_TYPES, PROP_TOKEN]
const OBJECT_TOKEN_TYPES = [PROP_TOKEN, ...OTHER_OBJECT_TOKEN_TYPES]

// Check if a token is part of a path
export const isPathToken = (token) =>
  PROP_TOKEN.testObject(token) ||
  (INDEX_TOKEN.testObject(token) && token >= 0 && !Object.is(token, -0))

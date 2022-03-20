import { INDEX_TOKEN } from './array.js'
import { OTHER_TOKEN_TYPES } from './other.js'
import { PROP_TOKEN } from './prop.js'

// Retrieve the type name of a given token parsed object
export const getTokenType = function (token) {
  const tokenType = getObjectTokenType(token)
  return tokenType === undefined ? UNKNOWN_TYPE : tokenType.name
}

const UNKNOWN_TYPE = 'unknown'

// Retrieve the type of a given token parsed object
export const getObjectTokenType = function (token) {
  return TOKEN_TYPES.find((tokenType) => tokenType.testObject(token))
}

// Retrieve the type of a given token serialized string
export const getStringTokenType = function (chars, isProp) {
  return isProp
    ? PROP_TOKEN
    : TOKEN_TYPES.find((tokenType) => tokenType.testString(chars))
}

// Order is significant as they are tested serially
const TOKEN_TYPES = [...OTHER_TOKEN_TYPES, PROP_TOKEN]

// Like `getObjectTokenType()` but for paths
export const getPathObjectTokenType = function (token) {
  return PATH_TOKEN_TYPES.find((tokenType) => tokenType.testObject(token))
}

const PATH_TOKEN_TYPES = [INDEX_TOKEN, PROP_TOKEN]

import moize from 'moize'

import { INDEX_TOKEN } from './indices.js'
import { OTHER_STRING_TOKEN_TYPES, OTHER_OBJECT_TOKEN_TYPES } from './other.js'
import { PROP_TOKEN } from './prop.js'

// Retrieve the type name of a given token parsed object
export const getTokenType = function (token) {
  const tokenType = getObjectTokenType(token)
  return tokenType === undefined ? UNKNOWN_TYPE : tokenType.name
}

const UNKNOWN_TYPE = 'unknown'

// Retrieve the type of a given token parsed object
const mGetObjectTokenType = function (token) {
  return OBJECT_TOKEN_TYPES.find((tokenType) => tokenType.testObject(token))
}

export const getObjectTokenType = moize(mGetObjectTokenType, { maxSize: 1e3 })

// Retrieve the type of a given token serialized string
const mGetStringTokenType = function (chars, isProp) {
  return isProp
    ? PROP_TOKEN
    : STRING_TOKEN_TYPES.find((tokenType) => tokenType.testString(chars))
}

export const getStringTokenType = moize(mGetStringTokenType, { maxSize: 1e3 })

// Order is significant as they are tested serially.
// It is optimized for common use cases and performance.
const STRING_TOKEN_TYPES = [...OTHER_STRING_TOKEN_TYPES, PROP_TOKEN]
const OBJECT_TOKEN_TYPES = [PROP_TOKEN, ...OTHER_OBJECT_TOKEN_TYPES]

// Check if a token is part of a path
export const isPathToken = function (token) {
  return (
    PROP_TOKEN.testObject(token) ||
    (INDEX_TOKEN.testObject(token) && token >= 0 && !Object.is(token, -0))
  )
}

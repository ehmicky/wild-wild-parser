import { ANY_DEEP_TOKEN, ANY_TOKEN } from './any.js'
import { INDEX_TOKEN } from './indices.js'
import { REGEXP_TOKEN } from './regexp.js'
import { SLICE_TOKEN } from './slice.js'

// Retrieve the type of a given token serialized string, except the default
// one (property name string)
export const getOtherStringTokenType = (chars) =>
  OTHER_STRING_TOKEN_TYPES.find((tokenType) => tokenType.testString(chars))

// Order is significant as they are tested serially.
// It is optimized for common use cases and performance.
export const OTHER_STRING_TOKEN_TYPES = [
  ANY_TOKEN,
  ANY_DEEP_TOKEN,
  REGEXP_TOKEN,
  SLICE_TOKEN,
  INDEX_TOKEN,
]
export const OTHER_OBJECT_TOKEN_TYPES = [
  INDEX_TOKEN,
  ANY_TOKEN,
  ANY_DEEP_TOKEN,
  REGEXP_TOKEN,
  SLICE_TOKEN,
]

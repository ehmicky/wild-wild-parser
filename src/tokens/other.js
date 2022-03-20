import { ANY_TOKEN, ANY_DEEP_TOKEN } from './any.js'
import { INDEX_TOKEN } from './array.js'
import { REGEXP_TOKEN } from './regexp.js'
import { SLICE_TOKEN } from './slice.js'

// Retrieve the type of a given token serialized string, except the default
// one (property name string)
export const getOtherStringTokenType = function (chars) {
  return OTHER_TOKEN_TYPES.find((tokenType) => tokenType.testString(chars))
}

// Order is significant as they are tested serially
export const OTHER_TOKEN_TYPES = [
  ANY_DEEP_TOKEN,
  ANY_TOKEN,
  REGEXP_TOKEN,
  SLICE_TOKEN,
  INDEX_TOKEN,
]

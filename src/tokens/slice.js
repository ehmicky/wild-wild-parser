import { isTokenObject } from './common.js'
import { INDEX_TOKEN } from './indices.js'

// Check the type of a parsed token.
const testObject = (token) =>
  isTokenObject(token, SLICE_TYPE) && isEdge(token.from) && isEdge(token.to)

const isEdge = (edge) => edge === undefined || INDEX_TOKEN.testObject(edge)

// Serialize a token to a string
const serialize = ({ from, to }) =>
  `${serializeEdge(from)}${SLICE_DELIM}${serializeEdge(to)}`

const serializeEdge = (edge) =>
  edge === undefined ? DEFAULT_EDGE_STRING : INDEX_TOKEN.serialize(edge)

// Check the type of a serialized token
const testString = (chars) => SLICE_REGEXP.test(chars)

const SLICE_REGEXP = /^(-?\d+)?:(-?\d+)?$/u

// Parse a string into a token
const parse = (chars) => {
  const [from, to] = chars.split(SLICE_DELIM).map(parseEdge)
  return { type: SLICE_TYPE, from, to }
}

const parseEdge = (chars) =>
  chars === DEFAULT_EDGE_STRING ? undefined : INDEX_TOKEN.parse(chars)

const DEFAULT_EDGE_STRING = ''
const SLICE_DELIM = ':'
const SLICE_TYPE = 'slice'

// Normalize value after parsing or serializing
const normalize = ({ type, from = 0, to }) =>
  Object.is(to, -0) || to === undefined ? { type, from } : { type, from, to }

// Check if two tokens are the same
const equals = (tokenA, tokenB) => {
  const { from: fromA, to: toA } = normalize(tokenA)
  const { from: fromB, to: toB } = normalize(tokenB)
  return Object.is(fromA, fromB) && Object.is(toA, toB)
}

export const SLICE_TOKEN = {
  name: 'slice',
  testObject,
  serialize,
  testString,
  parse,
  normalize,
  equals,
}

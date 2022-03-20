import isPlainObj from 'is-plain-obj'

import { INDEX_TOKEN } from './array.js'

// Check the type of a parsed token.
const testObject = function (token) {
  return (
    isPlainObj(token) &&
    token.type === SLICE_TYPE &&
    isEdge(token.from) &&
    isEdge(token.to)
  )
}

const isEdge = function (edge) {
  return edge === undefined || INDEX_TOKEN.testObject(edge)
}

// Serialize a token to a string
const serialize = function ({ from, to }) {
  return `${serializeEdge(from)}${SLICE_DELIM}${serializeEdge(to)}`
}

const serializeEdge = function (edge) {
  return edge === undefined ? DEFAULT_EDGE_STRING : INDEX_TOKEN.serialize(edge)
}

// Check the type of a serialized token
const testString = function (chars) {
  return SLICE_REGEXP.test(chars)
}

const SLICE_REGEXP = /^(-?\d+)?:(-?\d+)?$/u

// Parse a string into a token
const parse = function (chars) {
  const [from, to] = chars.split(SLICE_DELIM).map(parseEdge)
  return { type: SLICE_TYPE, from, to }
}

const parseEdge = function (chars) {
  return chars === DEFAULT_EDGE_STRING ? undefined : INDEX_TOKEN.parse(chars)
}

const DEFAULT_EDGE_STRING = ''
const SLICE_DELIM = ':'
const SLICE_TYPE = 'slice'

// Normalize value after parsing or serializing
const normalize = function ({ type, from = 0, to }) {
  const toA = Object.is(to, -0) ? undefined : to
  return { type, from, to: toA }
}

// Check if two tokens are the same
const equals = function (tokenA, tokenB) {
  return Object.is(tokenA.from, tokenB.from) && Object.is(tokenA.to, tokenB.to)
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

import { expectType, expectError } from 'tsd'

import {
  getTokenType,
  isSameToken,
  isSamePath,
  isParentPath,
  isSameQuery,
  parsePath,
  parseQuery,
  serializePath,
  serializeQuery,
  normalizePath,
  normalizeQuery,
  QueryToken,
  PathToken,
  TokenType,
  PathString,
  QueryString,
  PathArray,
  QueryArray,
  Path,
  Query,
} from 'wild-wild-parser'

const pathToken: PathToken = 'prop'
const queryToken: QueryToken = { type: 'any' }
const pathArray: PathArray = ['prop']
const queryArray: QueryArray = [{ type: 'any' }]
const pathString: PathString = 'prop'
const queryString: QueryString = '*'
const tokenType: TokenType = 'index'
const pathA: Path = ['prop']
const pathB: Path = 'prop'
const queryA: Query = [{ type: 'any' }]
const queryB: Query = '*'

expectType<TokenType>(getTokenType('prop'))
expectError(getTokenType({ type: 'other' }))
expectError(getTokenType({ type: 'anyDeep', other: true }))
getTokenType({ type: 'anyDeep' })
expectError(getTokenType({ type: 'any', other: true }))
getTokenType({ type: 'any' })
getTokenType(/regexp/)
getTokenType('prop')
getTokenType(0)
getTokenType(-0)
getTokenType({ type: 'slice' })
getTokenType({ type: 'slice', from: undefined, to: undefined })
getTokenType({ type: 'slice', from: 0, to: 1 })
expectError(getTokenType({ type: 'slice', other: true }))

expectType<boolean>(isSameToken(0, '0'))
expectError(isSameToken(0, true))
expectType<boolean>(isSamePath([0], '0'))
expectError(isSamePath([0], true))
expectType<boolean>(isParentPath([0], '0'))
expectError(isParentPath([0], true))
expectType<boolean>(isSameQuery([{ type: 'any' }], '*'))
expectError(isSameQuery([{ type: 'any' }], true))

expectType<PathArray>(parsePath('prop'))
expectError(parsePath(true))
expectType<QueryArray>(parseQuery('*'))
expectError(parseQuery(true))
expectType<PathString>(serializePath(['prop']))
expectError(serializePath(true))
expectType<QueryString>(serializeQuery([{ type: 'any' }]))
expectError(serializeQuery(true))
expectType<PathArray>(normalizePath('prop'))
normalizePath(['prop'])
expectError(normalizePath(true))
expectType<QueryArray>(normalizeQuery('*'))
normalizeQuery([{ type: 'any' }])
expectError(normalizeQuery(true))

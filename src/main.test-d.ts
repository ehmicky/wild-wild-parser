import { expectType, expectAssignable } from 'tsd'
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
  type QueryToken,
  type PathToken,
  type TokenType,
  type PathString,
  type QueryString,
  type PathArray,
  type QueryArray,
  type Path,
  type Query,
} from 'wild-wild-parser'

expectAssignable<PathToken>('prop')
expectAssignable<QueryToken>({ type: 'any' })
expectAssignable<PathArray>(['prop'])
expectAssignable<QueryArray>([{ type: 'any' }])
expectAssignable<PathString>('prop')
expectAssignable<QueryString>('*')
expectAssignable<TokenType>('index')
expectAssignable<Path>(['prop'])
expectAssignable<Path>('prop')
expectAssignable<Query>([{ type: 'any' }])
expectAssignable<Query>('*')

expectType<TokenType>(getTokenType('prop'))
// @ts-expect-error
getTokenType({ type: 'other' })
// @ts-expect-error
getTokenType({ type: 'anyDeep', other: true })
getTokenType({ type: 'anyDeep' })
// @ts-expect-error
getTokenType({ type: 'any', other: true })
getTokenType({ type: 'any' })
getTokenType(/regexp/u)
getTokenType('prop')
getTokenType(0)
getTokenType(-0)
getTokenType({ type: 'slice' })
getTokenType({ type: 'slice', from: undefined, to: undefined })
getTokenType({ type: 'slice', from: 0, to: 1 })
// @ts-expect-error
getTokenType({ type: 'slice', other: true })

expectType<boolean>(isSameToken(0, '0'))
// @ts-expect-error
isSameToken(0, true)
expectType<boolean>(isSamePath([0], '0'))
// @ts-expect-error
isSamePath([0], true)
expectType<boolean>(isParentPath([0], '0'))
// @ts-expect-error
isParentPath([0], true)
expectType<boolean>(isSameQuery([{ type: 'any' }], '*'))
// @ts-expect-error
isSameQuery([{ type: 'any' }], true)

expectType<PathArray>(parsePath('prop'))
// @ts-expect-error
parsePath(true)
expectType<QueryArray>(parseQuery('*'))
// @ts-expect-error
parseQuery(true)
expectType<PathString>(serializePath(['prop']))
// @ts-expect-error
serializePath(true)
expectType<QueryString>(serializeQuery([{ type: 'any' }]))
// @ts-expect-error
serializeQuery(true)
expectType<PathArray>(normalizePath('prop'))
normalizePath(['prop'])
// @ts-expect-error
normalizePath(true)
expectType<QueryArray>(normalizeQuery('*'))
normalizeQuery([{ type: 'any' }])
// @ts-expect-error
normalizeQuery(true)

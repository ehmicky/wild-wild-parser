type RegExpToken = RegExp
type IndexToken = number
type PropToken = string
interface AnyDeepToken {
  type: 'anyDeep'
}
interface AnyToken {
  type: 'any'
}
interface SliceToken {
  type: 'slice'
  from?: IndexToken
  to?: IndexToken
}

export type QueryToken = Readonly<
  AnyDeepToken | AnyToken | RegExpToken | SliceToken | IndexToken | PropToken
>
export type PathToken = Readonly<IndexToken | PropToken>

export type TokenType =
  | 'unknown'
  | 'anyDeep'
  | 'any'
  | 'regExp'
  | 'slice'
  | 'index'
  | 'prop'

export type PathString = string
export type QueryString = string

export type PathArray = PathToken[]
export type QueryArray = QueryToken[]

export type Path = PathString | PathArray
export type Query = QueryString | QueryArray

/**
 * Retrieve the type of a query array individual token among: `"prop"`,
 * `"index"`, `"slice"`, `"regExp"`, `"any"` or `"anyDeep"`. `"unknown"` is
 * returned if the token is invalid.
 *
 * @example
 * ```js
 * getTokenType('user') // "prop"
 * getTokenType(0) // "index"
 * getTokenType(/Name/) // "regExp"
 * getTokenType({ type: 'slice', from: 0, to: 2 }) // "slice"
 * getTokenType({ type: 'any' }) // "any"
 * getTokenType({ type: 'anyDeep' }) // "anyDeep"
 * getTokenType(true) // "unknown"
 * ```
 */
export function getTokenType(token: QueryToken): TokenType

/**
 * Same as `isSameQuery()` but only for query array individual tokens.
 *
 * @example
 * ```js
 * isSameToken('user', 'user') // true
 * isSameToken('user', 'users') // false
 * isSameToken(2, 2) // true
 * isSameToken(0, -0) // false
 * isSameToken(/Name/, /Name/) // true
 * isSameToken(/Name/, /name/i) // false
 * isSameToken({ type: 'slice' }, { type: 'slice', from: 0 }) // true
 * isSameToken('user', true) // Throws: invalid token `true`
 * ```
 */
export function isSameToken(
  firstToken: QueryToken,
  secondToken: QueryToken,
): boolean

/**
 * Same as `isSameQuery()` but only for a path query.
 *
 * @example
 * ```js
 * isSamePath('user.name', 'user.name') // true
 * isSamePath('user.name', ['user', 'name']) // true
 * isSamePath(['user', 'name'], ['user', 'name']) // true
 * isSamePath('user.name', 'user.lastName') // false
 * isSamePath('*', 'user.name') // Throws: `*` is a valid query but not a path
 * isSamePath([true], 'user.name') // Throws: `true` is not a valid query
 * ```
 */
export function isSamePath(firstPath: Path, secondPath: Path): boolean

/**
 * Return `true` if the first argument is a parent path to the second.
 * Queries that are not paths cannot be used.
 *
 * @example
 * ```js
 * isParentPath('user', 'user.name') // true
 * isParentPath('user', 'user.settings.name') // true
 * isParentPath('user', ['user', 'settings', 'name']) // true
 * isParentPath(['user'], ['user', 'settings', 'name']) // true
 * isParentPath('user', 'user') // false
 * isParentPath('user.name', 'user') // false
 * isParentPath('user.name', 'user.settings') // false
 * isParentPath('*', 'user.name') // Throws: `*` is valid query but not a path
 * isParentPath([true], 'user.name') // Throws: `true` is not a valid query
 * ```
 */
export function isParentPath(parentPath: Path, childPath: Path): boolean

/**
 * Return `true` if both queries are the same, even if they use different
 * formats (string or array) or if they are syntactically different but
 * semantically identical.
 *
 * @example
 * ```js
 * isSameQuery('users.0.*', 'users.0.*') // true
 * isSameQuery('users.0.*', ['users', 0, { type: 'any' }]) // true
 * isSameQuery(['users', 0, { type: 'any' }], ['users', 0, { type: 'any' }]) // true
 * isSameQuery('users.0.*', 'users.1.*') // false
 * isSameQuery('0:2', ':2') // true
 * isSameQuery([['user']], ['user']) // true
 * isSameQuery([true], 'user') // Throws: `true` is not a valid query
 * ```
 */
export function isSameQuery(firstQuery: Query, secondQuery: Query): boolean

/**
 * Same as `parseQuery()` but only for a path query.
 *
 * @example
 * ```js
 * parsePath('users.0') // ['users', 0]
 * parsePath('*') // Throws: this is a valid query but not a path
 * parsePath('users./[/') // Throws: invalid RegExp
 * ```
 */
export function parsePath(pathString: PathString): PathArray

/**
 * Convert a query string into a query array.
 *
 * @example
 * ```js
 * parseQuery('users.0.*') // [['users', 0, { type: 'any' }]]
 * parseQuery('users admins') // [['users'], ['admins']]
 * parseQuery('users./[/') // Throws: invalid RegExp
 * ```
 */
export function parseQuery(queryString: QueryString): QueryArray

/**
 * Same as `serializeQuery()` but only for a path query.
 *
 * @example
 * ```js
 * serializePath(['users', 0]) // 'users.0'
 * serializePath([{ type: 'any' }]) // Throws: this is a valid query but not a path
 * serializePath([true]) // Throws: `true` is not a valid query
 * ```
 */
export function serializePath(pathArray: PathArray): PathString

/**
 * Convert a query array into a query string.
 *
 * @example
 * ```js
 * serializeQuery(['users', 0, { type: 'any' }]) // 'users.0.*'
 * serializeQuery([['users'], ['admins']]) // 'users admins'
 * serializeQuery([true]) // Throws: `true` is not a valid query
 * ```
 */
export function serializeQuery(queryArray: QueryArray): QueryString

/**
 * Same as `normalizeQuery()` but only for a path query.
 *
 * @example
 * ```js
 * normalizePath('users.0') // ['users', 0]
 * normalizePath(['users', 0]) // ['users', 0]
 * normalizePath('*') // Throws: `*` is a valid query but not a path
 * normalizePath([true]) // Throws: `true` is not a valid query
 * ```
 */
export function normalizePath(path: Path): PathArray

/**
 * If the query is a query string, convert it into a query array.
 * If it is already a query array, normalize it to a canonical form.
 *
 * @example
 * ```js
 * normalizeQuery('users.0.*') // [['users', 0, { type: 'any' }]]
 * normalizeQuery(['users']) // [['users']]
 * normalizeQuery([['users'], ['admins']]) // [['users'], ['admins']]
 * normalizeQuery([{ type: 'slice' }]) // [[{ type: 'slice', from: 0 }]]
 * normalizeQuery('users./[/') // Throws: invalid RegExp
 * normalizeQuery([true]) // Throws: `true` is not a valid query
 * ```
 */
export function normalizeQuery(query: Query): QueryArray

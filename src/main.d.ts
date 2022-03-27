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

export function getTokenType(token: QueryToken): TokenType

export function isSameToken(
  firstToken: QueryToken,
  secondToken: QueryToken,
): boolean
export function isSamePath(firstPath: Path, secondPath: Path): boolean
export function isParentPath(parentPath: Path, childPath: Path): boolean
export function isSameQuery(firstQuery: Query, secondQuery: Query): boolean

export function parsePath(pathString: PathString): PathArray
export function parseQuery(queryString: QueryString): QueryArray
export function serializePath(pathArray: PathArray): PathString
export function serializeQuery(queryArray: QueryArray): QueryString
export function normalizePath(path: Path): PathArray
export function normalizeQuery(query: Query): QueryArray

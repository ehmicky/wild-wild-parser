[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/wild-wild-parser.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/wild-wild-parser)
[![Build](https://github.com/ehmicky/wild-wild-parser/workflows/Build/badge.svg)](https://github.com/ehmicky/wild-wild-parser/actions)
[![Node](https://img.shields.io/node/v/wild-wild-parser.svg?logo=node.js)](https://www.npmjs.com/package/wild-wild-parser)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

🤠 Parser for object property paths with wildcards and regexps.

[`wild-wild-path`](https://github.com/ehmicky/wild-wild-path) is a library which
gets/sets object properties using dot-delimited paths, wildcards, regexps,
slices and unions. `wild-wild-parser` allows manipulating
[its query format](https://github.com/ehmicky/wild-wild-path#queries):

- [Parse](#parsequeryquerystring)/[serialize](#serializequeryqueryarray), i.e.
  convert between
  [query strings](https://github.com/ehmicky/wild-wild-path#query-strings) and
  [query arrays](https://github.com/ehmicky/wild-wild-path#query-arrays)
- [Normalize](#normalizequeryquery) queries
- [Compare](#issamequeryfirstquery-secondquery) queries

# Install

```bash
npm install wild-wild-parser
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## parseQuery(queryString)

`queryString`
[`QueryString`](https://github.com/ehmicky/wild-wild-path#query-strings)\
_Return value_: [`QueryArray`](https://github.com/ehmicky/wild-wild-path#query-arrays)

Convert a
[query string](https://github.com/ehmicky/wild-wild-path#query-strings) into a
[query array](https://github.com/ehmicky/wild-wild-path#query-arrays).

## serializeQuery(queryArray)

`queryArray`
[`QueryArray`](https://github.com/ehmicky/wild-wild-path#query-arrays)\
_Return value_: [`QueryString`](https://github.com/ehmicky/wild-wild-path#query-strings)

Convert a [query array](https://github.com/ehmicky/wild-wild-path#query-arrays)
into a [query string](https://github.com/ehmicky/wild-wild-path#query-strings).

## normalizeQuery(query)

`query` [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
_Return value_: [`QueryArray`](https://github.com/ehmicky/wild-wild-path#query-arrays)

If the query is a
[query string](https://github.com/ehmicky/wild-wild-path#query-strings), convert
it into a [query array](https://github.com/ehmicky/wild-wild-path#query-arrays).
If it is already a query array, normalize it to a canonical form.

## parsePath(pathString)

`pathString` [`PathString`](https://github.com/ehmicky/wild-wild-path#paths)\
_Return value_: [`PathArray`](https://github.com/ehmicky/wild-wild-path#paths)

Same as [`parseQuery()`](#parsequeryquerystring) but only for a
[path query](https://github.com/ehmicky/wild-wild-path#paths).

## serializePath(pathArray)

`pathArray` [`PathArray`](https://github.com/ehmicky/wild-wild-path#paths)\
_Return value_: [`PathString`](https://github.com/ehmicky/wild-wild-path#paths)

Same as [`serializeQuery()`](#serializequeryqueryarray) but only for a
[path query](https://github.com/ehmicky/wild-wild-path#paths).

## normalizePath(path)

`path` [`Path`](https://github.com/ehmicky/wild-wild-path#paths)\
_Return value_: [`PathArray`](https://github.com/ehmicky/wild-wild-path#paths)

Same as [`normalizeQuery()`](#normalizequeryquery) but only for a
[path query](https://github.com/ehmicky/wild-wild-path#paths).

## isSameQuery(firstQuery, secondQuery)

`firstQuery` [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
`secondQuery` [`Query`](https://github.com/ehmicky/wild-wild-path#queries)\
_Return value_: `boolean`

Return `true` if both queries are the same, even if they use different formats
([string](https://github.com/ehmicky/wild-wild-path#query-strings) or
[array](https://github.com/ehmicky/wild-wild-path#query-arrays)) or if they are
syntactically different but semantically identical.

## isSamePath(firstPath, secondPath)

`firstPath` [`Path`](https://github.com/ehmicky/wild-wild-path#paths)\
`secondPath` [`Path`](https://github.com/ehmicky/wild-wild-path#paths)\
_Return value_: `boolean`

Same as [`isSameQuery()`](#issamepathfirstpath-secondpath) but only for a
[path query](https://github.com/ehmicky/wild-wild-path#paths).

## isParentPath(parentPath, childPath)

`parentPath` [`Path`](https://github.com/ehmicky/wild-wild-path#paths)\
`childPath` [`Path`](https://github.com/ehmicky/wild-wild-path#paths)\
_Return value_: `boolean`

Return `true` if the first argument is a parent path to the second. Queries that
are not [paths](https://github.com/ehmicky/wild-wild-path#paths) cannot be used.

## isSameToken(firstToken, secondToken)

`firstToken` [`Token`](https://github.com/ehmicky/wild-wild-path#query-arrays)\
`secondToken` [`Token`](https://github.com/ehmicky/wild-wild-path#query-arrays)\
_Return value_: `boolean`

Same as [`isSameQuery()`](#issamepathfirstpath-secondpath) but only for
[query array](https://github.com/ehmicky/wild-wild-path#query-arrays) individual
tokens.

## getTokenType(token)

`token` [`Token`](https://github.com/ehmicky/wild-wild-path#query-arrays)\
_Return value_: `string`

Retrieve the type of a
[query array](https://github.com/ehmicky/wild-wild-path#query-arrays) individual
token among: `"prop"`, `"index"`, `"slice"`, `"regExp"`, `"any"` or `"anyDeep"`.
`"unknown"` is returned if the token is invalid.

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/wild-wild-parser/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/wild-wild-parser/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

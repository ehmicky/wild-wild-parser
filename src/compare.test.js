import test from 'ava'
import { each } from 'test-each'

import {
  isSamePath,
  isSameQuery,
  isSameToken,
  isParentPath,
} from 'wild-wild-parser'

each(
  [
    { queryA: [], queryB: ['a'], output: false },
    { queryA: [], queryB: [], output: true },
    { queryA: ['a'], queryB: [['a']], output: true },
    { queryA: [['a'], ['b']], queryB: 'a b', output: true },
    { queryA: ':', queryB: '0:', output: true },
    { queryA: 'a', queryB: 'a.b', output: false },
    { queryA: 'a b', queryB: 'b a', output: true },
    { queryA: 'a a', queryB: 'a', output: true },
    { queryA: 'a a b', queryB: 'b a', output: true },
  ],
  ({ title }, { queryA, queryB, output }) => {
    test(`isSameQuery() output | ${title}`, (t) => {
      t.is(isSameQuery(queryA, queryB), output)
    })
  },
)

each([{ queryA: true, queryB: [] }], ({ title }, { queryA, queryB }) => {
  test(`isSameQuery() validates input | ${title}`, (t) => {
    t.throws(isSameQuery.bind(undefined, queryA, queryB))
  })
})

each(
  [
    { queryA: [], queryB: [], output: true },
    { queryA: [], queryB: ['a'], output: false },
    { queryA: ['a'], queryB: 'a', output: true },
    { queryA: 'a', queryB: 'a.b', output: false },
  ],
  ({ title }, { queryA, queryB, output }) => {
    test(`isSamePath() output | ${title}`, (t) => {
      t.is(isSamePath(queryA, queryB), output)
    })
  },
)

each(
  [
    { queryA: true, queryB: [] },
    { queryA: 'a b', queryB: 'a' },
    { queryA: '0:', queryB: 'a' },
    { queryA: -0, queryB: 0 },
  ],
  ({ title }, { queryA, queryB }) => {
    test(`isSamePath() validates input | ${title}`, (t) => {
      t.throws(isSamePath.bind(undefined, queryA, queryB))
    })
  },
)

const setLastIndex = function (regExp, string) {
  regExp.test(string)
  return regExp
}

each(
  [
    // Prop tokens
    { tokenA: 'a', tokenB: 'a', output: true },
    { tokenA: 'a ', tokenB: 'a', output: false },

    // Index tokens
    { tokenA: '1', tokenB: 1, output: false },
    { tokenA: 1, tokenB: 1, output: true },
    { tokenA: 0, tokenB: -0, output: false },
    { tokenA: -0, tokenB: -0, output: true },

    // Slice tokens
    { tokenA: { type: 'slice' }, tokenB: { type: 'slice' }, output: true },
    {
      tokenA: { type: 'slice' },
      tokenB: { type: 'slice', other: true },
      output: true,
    },
    {
      tokenA: { type: 'slice', from: 1, to: 1 },
      tokenB: { type: 'slice', from: 1, to: 1 },
      output: true,
    },
    {
      tokenA: { type: 'slice', from: 1 },
      tokenB: { type: 'slice', from: 1, to: undefined },
      output: true,
    },
    {
      tokenA: { type: 'slice', from: 1 },
      tokenB: { type: 'slice', from: 1, to: -0 },
      output: true,
    },
    {
      tokenA: { type: 'slice' },
      tokenB: { type: 'slice', from: 0 },
      output: true,
    },

    // RegExp tokens
    { tokenA: /a/u, tokenB: /a/u, output: true },
    { tokenA: /a/u, tokenB: /a/gu, output: false },
    { tokenA: /a/u, tokenB: /ab/u, output: false },
    { tokenA: /./gu, tokenB: setLastIndex(/./gu, 'aa'), output: false },

    // any tokens
    { tokenA: { type: 'any' }, tokenB: { type: 'any' }, output: true },
    {
      tokenA: { type: 'any' },
      tokenB: { type: 'any', other: true },
      output: true,
    },

    // anyDeep tokens
    { tokenA: { type: 'anyDeep' }, tokenB: { type: 'anyDeep' }, output: true },
    {
      tokenA: { type: 'anyDeep' },
      tokenB: { type: 'anyDeep', other: true },
      output: true,
    },
  ],
  ({ title }, { tokenA, tokenB, output }) => {
    test(`isSameToken() output | ${title}`, (t) => {
      t.is(isSameToken(tokenA, tokenB), output)
    })
  },
)

each(
  [
    { tokenA: true, tokenB: 'a' },
    { tokenA: 'a', tokenB: true },
  ],
  ({ title }, { tokenA, tokenB }) => {
    test(`isSameToken() validates input | ${title}`, (t) => {
      t.throws(isSameToken.bind(undefined, tokenA, tokenB))
    })
  },
)

each(
  [
    { parentPath: ['a'], childPath: 'a.b', output: true },
    { parentPath: 'a', childPath: 'a.b', output: true },
    { parentPath: 'a', childPath: 'a', output: false },
    { parentPath: '.', childPath: '.', output: false },
    { parentPath: 'a.b', childPath: 'a', output: false },
    { parentPath: 'a', childPath: 'a.b.c', output: true },
    { parentPath: 'a.b', childPath: 'a.b.c', output: true },
    { parentPath: 'c', childPath: 'a.b', output: false },
    { parentPath: '.', childPath: 'a', output: true },
  ],
  ({ title }, { parentPath, childPath, output }) => {
    test(`isParentPath() output | ${title}`, (t) => {
      t.is(isParentPath(parentPath, childPath), output)
    })
  },
)

each(
  [
    { parentPath: true, childPath: [] },
    { parentPath: 'a b', childPath: 'a b.c' },
    { parentPath: '*', childPath: '*.a' },
  ],
  ({ title }, { parentPath, childPath }) => {
    test(`isParentPath() validates input | ${title}`, (t) => {
      t.throws(isParentPath.bind(undefined, parentPath, childPath))
    })
  },
)

import test from 'ava'
import { each } from 'test-each'
import { isSameToken } from 'wild-wild-parser'

const setLastIndex = function (regExp, string) {
  regExp.test(string)
  return regExp
}

each(
  [
    { tokenA: 'a', tokenB: 'a', output: true },
    { tokenA: 'a ', tokenB: 'a', output: false },
    { tokenA: '1', tokenB: 1, output: false },
    { tokenA: 1, tokenB: 1, output: true },
    { tokenA: 0, tokenB: -0, output: false },
    { tokenA: -0, tokenB: -0, output: true },
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
    { tokenA: /a/u, tokenB: /a/u, output: true },
    { tokenA: /a/u, tokenB: /a/gu, output: false },
    { tokenA: /a/u, tokenB: /ab/u, output: false },
    { tokenA: /./gu, tokenB: setLastIndex(/./gu, 'aa'), output: false },
    { tokenA: { type: 'any' }, tokenB: { type: 'any' }, output: true },
    {
      tokenA: { type: 'any' },
      tokenB: { type: 'any', other: true },
      output: true,
    },
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

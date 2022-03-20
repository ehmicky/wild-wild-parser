import test from 'ava'
import { each } from 'test-each'
import { isSameToken } from 'wild-wild-parser'

each(
  [
    { tokenA: 'a', tokenB: 'a', output: true },
    { tokenA: 'a ', tokenB: 'a', output: false },
    { tokenA: '1', tokenB: 1, output: false },
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

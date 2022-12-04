import test from 'ava'
import { each } from 'test-each'

import { normalizePath, normalizeQuery } from 'wild-wild-parser'

each(
  [
    { query: 'a.b', output: [['a', 'b']] },
    { query: '.', output: [[]] },
    { query: ['a'], output: [['a']] },
    { query: [], output: [[]] },
    { query: [[-0]], output: [[-0]] },
    {
      query: [[{ type: 'slice', to: -0 }]],
      output: [[{ type: 'slice', from: 0 }]],
    },
    { query: [[{ type: 'any', other: true }]], output: [[{ type: 'any' }]] },
    {
      query: [[{ type: 'anyDeep', other: true }]],
      output: [[{ type: 'anyDeep' }]],
    },
  ],
  ({ title }, { query, output }) => {
    test(`normalizeQuery() output | ${title}`, (t) => {
      t.deepEqual(normalizeQuery(query), output)
    })
  },
)

each(['', [true]], ({ title }, arg) => {
  test(`normalizeQuery() validates input | ${title}`, (t) => {
    t.throws(normalizeQuery.bind(undefined, arg))
  })
})

each(
  [
    { query: ['a', 'b'], output: ['a', 'b'] },
    { query: 'a.b', output: ['a', 'b'] },
  ],
  ({ title }, { query, output }) => {
    test(`normalizePath() output | ${title}`, (t) => {
      t.deepEqual(normalizePath(query), output)
    })
  },
)

each([[-1], '-1'], ({ title }, arg) => {
  test(`normalizePath() validates input | ${title}`, (t) => {
    t.throws(normalizePath.bind(undefined, arg))
  })
})

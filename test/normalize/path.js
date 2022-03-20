import test from 'ava'
import { each } from 'test-each'
import { normalizePath } from 'wild-wild-parser'

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

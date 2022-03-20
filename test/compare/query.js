import test from 'ava'
import { each } from 'test-each'
import { isSameQuery } from 'wild-wild-parser'

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

import test from 'ava'
import { each } from 'test-each'
import { isSameQuery } from 'wild-wild-parser'

each(
  [{ queryA: [], queryB: [], output: true }],
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

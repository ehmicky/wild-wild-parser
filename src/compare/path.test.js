import test from 'ava'
import { each } from 'test-each'
import { isSamePath } from 'wild-wild-parser'

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

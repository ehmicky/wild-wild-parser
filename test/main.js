import test from 'ava'
import { normalizeQuery } from 'wild-wild-parser'

test('Dummy test', (t) => {
  t.is(typeof normalizeQuery, 'function')
  const queryArrays = normalizeQuery('*')
  t.deepEqual(queryArrays, [[{ type: 'any' }]])
})

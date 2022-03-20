import test from 'ava'
import { each } from 'test-each'
import { parseQuery } from 'wild-wild-parser'

each([[], [[]], ['prop'], [['prop']], '', ' '], ({ title }, arg) => {
  test(`parseQuery() validates input | ${title}`, (t) => {
    t.throws(parseQuery.bind(undefined, arg))
  })
})

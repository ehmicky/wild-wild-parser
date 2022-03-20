import test from 'ava'
import { each } from 'test-each'
import { parseQuery } from 'wild-wild-parser'

each(
  [
    { queryString: 'a', output: [['a']] },
    { queryString: 'a.b', output: [['a', 'b']] },
    { queryString: 'a b', output: [['a'], ['b']] },
    { queryString: 'a  c', output: [['a'], ['c']] },
    { queryString: ' a', output: [['a']] },
    { queryString: 'a ', output: [['a']] },
    { queryString: '.', output: [[]] },
    { queryString: '..', output: [['']] },
    { queryString: '...', output: [['', '']] },
    { queryString: '.a', output: [['a']] },
    { queryString: '.a.', output: [['a', '']] },
    { queryString: '..a', output: [['', 'a']] },
    { queryString: '\\a', output: [['a']] },
    { queryString: '\\0', output: [['0']] },
    { queryString: '\\*', output: [['*']] },
    { queryString: '\\**', output: [['**']] },
    { queryString: '\\:', output: [[':']] },
    { queryString: '\\/a/', output: [['/a/']] },
    { queryString: '\\.', output: [['.']] },
    { queryString: '\\ ', output: [[' ']] },
    { queryString: '\\\\', output: [['\\']] },
  ],
  ({ title }, { queryString, output }) => {
    test(`parseQuery() output | ${title}`, (t) => {
      t.deepEqual(parseQuery(queryString), output)
    })
  },
)

each([[], [[]], ['a'], [['a']], '', ' ', '\\', 'a\\a'], ({ title }, arg) => {
  test(`parseQuery() validates input | ${title}`, (t) => {
    t.throws(parseQuery.bind(undefined, arg))
  })
})

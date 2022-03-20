import test from 'ava'
import { each } from 'test-each'
import { parseQuery } from 'wild-wild-parser'

each(
  [
    // Dots delimiters
    { queryString: 'a.b', output: [['a', 'b']] },
    // Space delimiters
    { queryString: 'a b', output: [['a'], ['b']] },
    { queryString: 'a  c', output: [['a'], ['c']] },
    { queryString: ' a', output: [['a']] },
    { queryString: 'a ', output: [['a']] },
    // Dots non-delimiters
    { queryString: '.', output: [[]] },
    { queryString: '..', output: [['']] },
    { queryString: '...', output: [['', '']] },
    { queryString: '.a', output: [['a']] },
    { queryString: '.a.', output: [['a', '']] },
    { queryString: '..a', output: [['', 'a']] },
    // Escape characters
    { queryString: '\\a', output: [['a']] },
    { queryString: '\\0', output: [['0']] },
    { queryString: '\\*', output: [['*']] },
    { queryString: '\\**', output: [['**']] },
    { queryString: '\\:', output: [[':']] },
    { queryString: '\\/a/', output: [['/a/']] },
    { queryString: '\\.', output: [['.']] },
    { queryString: '\\ ', output: [[' ']] },
    { queryString: '\\\\', output: [['\\']] },
    // Prop tokens
    { queryString: 'a', output: [['a']] },
    // Index tokens
    { queryString: '1', output: [[1]] },
    { queryString: '0', output: [[0]] },
    { queryString: '-1', output: [[-1]] },
    { queryString: '-0', output: [[-0]] },
    { queryString: '0.1', output: [[0, 1]] },
    { queryString: '010', output: [[10]] },
    { queryString: '1a', output: [['1a']] },
    { queryString: 'a1', output: [['a1']] },
    { queryString: '1\\ ', output: [['1 ']] },
    { queryString: '\\ 1', output: [[' 1']] },
    { queryString: '1n', output: [['1n']] },
    { queryString: '1e3', output: [['1e3']] },
    { queryString: 'Infinity', output: [['Infinity']] },
    { queryString: 'NaN', output: [['NaN']] },
    // Slice tokens
    { queryString: ':', output: [[{ type: 'slice', from: 0 }]] },
    { queryString: ':-0', output: [[{ type: 'slice', from: 0 }]] },
    { queryString: '0:', output: [[{ type: 'slice', from: 0 }]] },
    { queryString: '1:1', output: [[{ type: 'slice', from: 1, to: 1 }]] },
    { queryString: '-1:-1', output: [[{ type: 'slice', from: -1, to: -1 }]] },
    { queryString: 'a:b', output: [['a:b']] },
    { queryString: '1:1a', output: [['1:1a']] },
    // RegExp tokens
    // eslint-disable-next-line require-unicode-regexp
    { queryString: '/a/', output: [[/a/]] },
    { queryString: '/a/u', output: [[/a/u]] },
    { queryString: '//', output: [['//']] },
    { queryString: '/', output: [['/']] },
  ],
  ({ title }, { queryString, output }) => {
    test(`parseQuery() output | ${title}`, (t) => {
      t.deepEqual(parseQuery(queryString), output)
    })
  },
)

each(
  [[], [[]], ['a'], [['a']], '', ' ', '\\', 'a\\a', '/a/k', '/[/'],
  ({ title }, arg) => {
    test(`parseQuery() validates input | ${title}`, (t) => {
      t.throws(parseQuery.bind(undefined, arg))
    })
  },
)

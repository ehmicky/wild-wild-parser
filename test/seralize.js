import test from 'ava'
import { each } from 'test-each'
import { serializeQuery } from 'wild-wild-parser'

each(
  [
    // Dots delimiters
    { queryArrays: [['a', 'b']], output: 'a.b' },

    // Space delimiters
    { queryArrays: [['a'], ['b']], output: 'a b' },

    // Dots non-delimiters
    { queryArrays: [], output: '.' },
    { queryArrays: [[]], output: '.' },
    { queryArrays: [['']], output: '..' },
    { queryArrays: [['', '']], output: '...' },
    { queryArrays: [['a', '']], output: 'a.' },
    { queryArrays: [['', 'a']], output: '..a' },

    // Escape characters
    { queryArrays: [['0']], output: '\\0' },
    { queryArrays: [['*']], output: '\\*' },
    { queryArrays: [['**']], output: '\\**' },
    { queryArrays: [[':']], output: '\\:' },
    { queryArrays: [['/a/']], output: '\\/a/' },
    { queryArrays: [['.']], output: '\\.' },
    { queryArrays: [[' ']], output: '\\ ' },
    { queryArrays: [['\\']], output: '\\\\' },

    // Prop tokens
    { queryArrays: [['a']], output: 'a' },

    // Index tokens
    { queryArrays: [[1]], output: '1' },
    { queryArrays: [[0]], output: '0' },
    { queryArrays: [[-1]], output: '-1' },
    { queryArrays: [[-0]], output: '-0' },
    { queryArrays: [[0, 1]], output: '0.1' },
    { queryArrays: [['1 ']], output: '1\\ ' },
    { queryArrays: [[' 1']], output: '\\ 1' },
    { queryArrays: [['1n']], output: '1n' },
    { queryArrays: [['1e3']], output: '1e3' },
    { queryArrays: [['Infinity']], output: 'Infinity' },
    { queryArrays: [['NaN']], output: 'NaN' },

    // Slice tokens
    { queryArrays: [[{ type: 'slice', from: 0 }]], output: '0:' },
    { queryArrays: [[{ type: 'slice', from: 0, to: -0 }]], output: '0:' },
    {
      queryArrays: [[{ type: 'slice', from: 0, to: undefined }]],
      output: '0:',
    },
    { queryArrays: [[{ type: 'slice' }]], output: '0:' },
    { queryArrays: [[{ type: 'slice', from: 1, to: 1 }]], output: '1:1' },
    { queryArrays: [[{ type: 'slice', from: -1, to: -1 }]], output: '-1:-1' },

    // RegExp tokens
    // eslint-disable-next-line require-unicode-regexp
    { queryArrays: [[/a/]], output: '/a/' },
    // { queryArrays: '/a/u', output: [[/a/u]] },
    // { queryArrays: '/a/b/u', output: [[/a\/b/u]] },
    // { queryArrays: '//', output: [['//']] },
    // { queryArrays: '/', output: [['/']] },
    // { queryArrays: 'b/a/', output: [['b/a/']] },

    // // any tokens
    // { queryArrays: '*', output: [[{ type: 'any' }]] },
    // { queryArrays: '*a', output: [['*a']] },
    // { queryArrays: 'a*', output: [['a*']] },

    // // anyDeep tokens
    // { queryArrays: '**', output: [[{ type: 'anyDeep' }]] },
    // { queryArrays: '**a', output: [['**a']] },
    // { queryArrays: 'a**', output: [['a**']] },
    // { queryArrays: '***', output: [['***']] },
  ],
  ({ title }, { queryArrays, output }) => {
    test(`serializeQuery() output | ${title}`, (t) => {
      t.deepEqual(serializeQuery(queryArrays), output)
    })
  },
)

each(['', 'a', [true], [[true]]], ({ title }, arg) => {
  test(`serializeQuery() validates input | ${title}`, (t) => {
    t.throws(serializeQuery.bind(undefined, arg))
  })
})

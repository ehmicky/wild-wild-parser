import test from 'ava'
import { each } from 'test-each'

import { serializePath, serializeQuery } from 'wild-wild-parser'

each(
  [
    // Dots delimiters
    { queryArrays: ['a', 'b'], output: 'a.b' },

    // Space delimiters
    { queryArrays: [['a'], ['b']], output: 'a b' },

    // Dots non-delimiters
    { queryArrays: [], output: '.' },
    { queryArrays: [[]], output: '.' },
    { queryArrays: [''], output: '..' },
    { queryArrays: ['', ''], output: '...' },
    { queryArrays: ['a', ''], output: 'a.' },
    { queryArrays: ['', 'a'], output: '..a' },

    // Escape characters
    { queryArrays: ['0'], output: '\\0' },
    { queryArrays: ['*'], output: '\\*' },
    { queryArrays: ['**'], output: '\\**' },
    { queryArrays: [':'], output: '\\:' },
    { queryArrays: ['/a/'], output: '\\/a/' },
    { queryArrays: ['.'], output: '\\.' },
    { queryArrays: [' '], output: '\\ ' },
    { queryArrays: ['\\'], output: '\\\\' },

    // Prop tokens
    { queryArrays: ['a'], output: 'a' },

    // Index tokens
    { queryArrays: [1], output: '1' },
    { queryArrays: [0], output: '0' },
    { queryArrays: [-1], output: '-1' },
    { queryArrays: [-0], output: '-0' },
    { queryArrays: [0, 1], output: '0.1' },
    { queryArrays: ['1 '], output: '1\\ ' },
    { queryArrays: [' 1'], output: '\\ 1' },
    { queryArrays: ['1n'], output: '1n' },
    { queryArrays: ['1e3'], output: '1e3' },
    { queryArrays: ['Infinity'], output: 'Infinity' },
    { queryArrays: ['NaN'], output: 'NaN' },

    // Slice tokens
    { queryArrays: [{ type: 'slice', from: 0 }], output: '0:' },
    { queryArrays: [{ type: 'slice', from: 0, to: -0 }], output: '0:' },
    { queryArrays: [{ type: 'slice', from: 0, to: undefined }], output: '0:' },
    { queryArrays: [{ type: 'slice' }], output: '0:' },
    { queryArrays: [{ type: 'slice', from: 1, to: 1 }], output: '1:1' },
    { queryArrays: [{ type: 'slice', from: -1, to: -1 }], output: '-1:-1' },
    {
      queryArrays: [Object.create({}, { type: { value: 'slice' } })],
      output: '0:',
    },
    { queryArrays: [{ type: 'slice', other: true }], output: '0:' },

    // RegExp tokens
    // eslint-disable-next-line require-unicode-regexp
    { queryArrays: [/a/], output: '/a/' },
    { queryArrays: [/a/u], output: '/a/u' },
    { queryArrays: [/a.b/u], output: '/a\\.b/u' },
    { queryArrays: [/a b/u], output: '/a\\ b/u' },
    { queryArrays: [/a\b/u], output: '/a\\\\b/u' },
    { queryArrays: [/a\/b/u], output: '/a\\\\/b/u' },

    // any tokens
    { queryArrays: [{ type: 'any' }], output: '*' },
    {
      queryArrays: [Object.create({}, { type: { value: 'any' } })],
      output: '*',
    },
    { queryArrays: [{ type: 'any', other: true }], output: '*' },

    // anyDeep tokens
    { queryArrays: [{ type: 'anyDeep' }], output: '**' },
    {
      queryArrays: [Object.create({}, { type: { value: 'anyDeep' } })],
      output: '**',
    },
    { queryArrays: [{ type: 'anyDeep', other: true }], output: '**' },
  ],
  ({ title }, { queryArrays, output }) => {
    test(`serializeQuery() output | ${title}`, (t) => {
      t.deepEqual(serializeQuery(queryArrays), output)
    })
  },
)

each(
  [
    '',
    'a',
    [true],
    [[true]],
    ['a', ['b']],
    [{}],
    // eslint-disable-next-line no-magic-numbers
    [0.1],
    [1n],
    [Number.POSITIVE_INFINITY],
    [Number.NaN],
    [{ type: 'slice', from: 'from' }],
    [{ type: 'slice', to: 'to' }],
  ],
  ({ title }, arg) => {
    test(`serializeQuery() validates input | ${title}`, (t) => {
      t.throws(serializeQuery.bind(undefined, arg))
    })
  },
)

each(
  [
    { queryString: ['a', 'b'], output: 'a.b' },
    { queryString: [], output: '.' },
    { queryString: [''], output: '..' },
    { queryString: [0], output: '0' },
  ],
  ({ title }, { queryString, output }) => {
    test(`serializePath() output | ${title}`, (t) => {
      t.deepEqual(serializePath(queryString), output)
    })
  },
)

each(
  [
    'a',
    [['a'], ['b']],
    [-1],
    [-0],
    [{ type: 'slice' }],
    [/a/u],
    [{ type: 'any' }],
    [{ type: 'anyDeep' }],
  ],
  ({ title }, arg) => {
    test(`serializePath() validates input | ${title}`, (t) => {
      t.throws(serializePath.bind(undefined, arg))
    })
  },
)

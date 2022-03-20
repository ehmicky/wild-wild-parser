import test from 'ava'
import { each } from 'test-each'
import { parsePath, serializePath, normalizePath } from 'wild-wild-parser'

each(
  [
    { queryString: 'a.b', output: ['a', 'b'] },
    { queryString: '.', output: [] },
    { queryString: '..', output: [''] },
    { queryString: '0', output: [0] },
  ],
  ({ title }, { queryString, output }) => {
    test(`parsePath() output | ${title}`, (t) => {
      t.deepEqual(parsePath(queryString), output)
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
    { query: ['a', 'b'], output: ['a', 'b'] },
    { query: 'a.b', output: ['a', 'b'] },
  ],
  ({ title }, { query, output }) => {
    test(`normalizePath() output | ${title}`, (t) => {
      t.deepEqual(normalizePath(query), output)
    })
  },
)

each(['a b', '-1', '-0', ':', '/a/', '*', '**'], ({ title }, arg) => {
  test(`parsePath() validates input | ${title}`, (t) => {
    t.throws(parsePath.bind(undefined, arg))
  })
})

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

each([[-1], '-1'], ({ title }, arg) => {
  test(`normalizePath() validates input | ${title}`, (t) => {
    t.throws(normalizePath.bind(undefined, arg))
  })
})

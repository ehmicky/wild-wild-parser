import test from 'ava'
import { each } from 'test-each'
import { serializePath } from 'wild-wild-parser'

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

import test from 'ava'
import { each } from 'test-each'
import { isParentPath } from 'wild-wild-parser'

each(
  [
    { parentPath: [], childPath: [], output: false },
    { parentPath: [], childPath: ['a'], output: true },
    { parentPath: [], childPath: 'a', output: true },
    { parentPath: 'a', childPath: 'a.b', output: true },
    { parentPath: 'a', childPath: 'a', output: false },
    { parentPath: 'a.b', childPath: 'a', output: false },
    { parentPath: 'a', childPath: 'a.b.c', output: true },
    { parentPath: 'a.b', childPath: 'a.b.c', output: true },
    { parentPath: 'c', childPath: 'a.b', output: false },
  ],
  ({ title }, { parentPath, childPath, output }) => {
    test(`isParentPath() output | ${title}`, (t) => {
      t.is(isParentPath(parentPath, childPath), output)
    })
  },
)

each(
  [
    { parentPath: true, childPath: [] },
    { parentPath: 'a b', childPath: 'a b.c' },
    { parentPath: '*', childPath: '*.a' },
  ],
  ({ title }, { parentPath, childPath }) => {
    test(`isParentPath() validates input | ${title}`, (t) => {
      t.throws(isParentPath.bind(undefined, parentPath, childPath))
    })
  },
)

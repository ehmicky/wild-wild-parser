import test from 'ava'
import { each } from 'test-each'

import { getTokenType } from 'wild-wild-parser'

each(
  [
    { token: 'a', output: 'prop' },
    { token: 0, output: 'index' },
    { token: { type: 'slice' }, output: 'slice' },
    { token: /a/u, output: 'regExp' },
    { token: { type: 'any' }, output: 'any' },
    { token: { type: 'anyDeep' }, output: 'anyDeep' },
    { token: { type: 'anyDeep', other: true }, output: 'anyDeep' },
    { token: true, output: 'unknown' },
  ],
  ({ title }, { token, output }) => {
    test(`getTokenType() output | ${title}`, (t) => {
      t.deepEqual(getTokenType(token), output)
    })
  },
)

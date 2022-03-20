import {
  ESCAPE,
  ARRAY_SEPARATOR_NAME,
  TOKEN_SEPARATOR,
  SPECIAL_CHARS,
} from '../tokens/escape.js'
import { throwQueryError } from '../validate/throw.js'

// Parse escape character in a query string
export const parseEscape = function (state, queryString) {
  const nextChar = queryString[state.index + 1]

  if (SPECIAL_CHARS.has(nextChar)) {
    state.index += 1
    state.chars += nextChar
    return
  }

  if (state.chars.length !== 0) {
    throwQueryError(
      queryString,
      `Character "${ESCAPE}" must either be at the start of a token, or be followed by ${ARRAY_SEPARATOR_NAME} or ${TOKEN_SEPARATOR} or ${ESCAPE}`,
    )
  }

  state.isProp = true
}

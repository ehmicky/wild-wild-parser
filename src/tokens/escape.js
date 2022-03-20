// Escaping character
export const ESCAPE = '\\'

// Query arrays separator.
// We squash multiple ones in a row.
// But we do not trim spaces at the start or end to allow root paths.
export const ARRAY_SEPARATOR = ' '
export const ARRAY_SEPARATOR_NAME = 'a space'

// Tokens separator
export const TOKEN_SEPARATOR = '.'

// Special characters to escape
export const SPECIAL_CHARS = new Set([ESCAPE, TOKEN_SEPARATOR, ARRAY_SEPARATOR])

// Escape special characters
export const escapeSpecialChars = function (string) {
  return string.replace(SPECIAL_CHARS_REGEXP, `${ESCAPE}$&`)
}

const SPECIAL_CHARS_REGEXP = /[\\. ]/gu

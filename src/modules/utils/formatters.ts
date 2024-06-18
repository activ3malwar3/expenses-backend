import { lowerCase, upperFirst } from 'lodash'

/**
 * Sentence case a string.
 * @param {string} s The string to sentence case.
 * @returns {string} The sentence cased string.
 */
export function sentenceCase(s: string): string {
  if (typeof s !== 'string') return ''
  if (s === '') return s

  return upperFirst(lowerCase(s))
}

/**
 * Lower case a string.
 * @param {string} s The string to lower case.
 * @returns {string} The lower cased string.
 */
export function toLowerCase(s: string): string {
  if (typeof s !== 'string') return ''
  if (s === '') return s

  return lowerCase(s)
}

/**
 * Format the value to currency. The currency used is AED. The value is formatted to 2 decimal places.
 * @param {number} value The value to format.
 * @returns {string} The formatted value.
 *
 * @example
 * currencyFormat(1000) // AED 1,000.00
 */
export function currencyFormat(value: number, withCurrency = false): string {
  let parsedValue = value
  if (!value) parsedValue = 0
  if (isNaN(value)) parsedValue

  return parsedValue.toLocaleString('en-AE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    ...(withCurrency && { style: 'currency', currency: 'AED' }),
  })
}

/**
 * Format the value to number with 2 decimal places.
 * @param {number} value The value to format.
 * @returns {string} The formatted value.
 *
 * @example
 * numberFormat(1000) // 1,000.00
 */
export function numberFormat(value: number, fractionDigits: number = 2): string {
  let parsedValue = value
  if (!value) parsedValue = 0
  if (isNaN(value)) return value.toString()

  return parsedValue.toLocaleString('en-AE', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  })
}

/**
 * Trim string to a specific length.
 * @param {string} str The string to trim.
 * @param {number} length The length to trim the string to.
 * @returns {string} The trimmed string.
 *
 * @example
 * trimString('Hello World', 5) // Hello...
 */
export function trimString(str: string, length: number): string {
  if (!str) return ''

  if (str.length > length) {
    return str.substring(0, length) + '...'
  } else {
    return str
  }
}

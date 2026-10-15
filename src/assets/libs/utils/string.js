/* eslint-disable */

export function padEnd (str, length, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length))
}

export function chunk (str, size = 1) {
  const chunked = []
  let index = 0

  while (index < str.length) {
    chunked.push(str.substr(index, size))
    index += size
  }

  return chunked
}

export function toUnit (str, unit = 'px') {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str)) {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

/**
 *
 * @param {String} string
 * @returns {String} Sluged string
 */
export function slugify (string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

/**
 *
 * @param {String} token
 * @returns {Object} Parsed token
 */
export function parseToken (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

/**
 *
 * @param {Number} length
 * @returns {String}
 */
export function randomAlpha (length) {
  let result = ''
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result.toUpperCase()
}

export const pascalToCamelCase = (str) => str[0].toLowerCase() + str.substring(1)

export const toCamelCase = (string, separator = '-') => string.replace(new RegExp(`${separator}.`, 'g'), sub => sub.charAt(1).toUpperCase())

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

export const fromCamelCase = (string, separator = '-') => string.split(/(?=[A-Z])/).map(part => part.toLowerCase()).join(separator)

/**
 *
 * @param {String} url
 * @returns {Boolean}
 */
export function verifyUrl (url) {
  return fetch(url)
}

export default {
  slugify,
  parseToken,
  randomAlpha,
  pascalToCamelCase,
  toCamelCase,
  capitalizeFirstLetter,
  fromCamelCase,
  verifyUrl,
  padEnd,
  chunk
}

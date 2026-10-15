export function parseURL (url) {
  const parser = document.createElement('a')
  const searchObject = {}
  let split
  let i
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

  parser.href = url
  const queries = parser.search.replace(/^\?/, '').split('&')

  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=')
    searchObject[split[0]] = split[1]
  }

  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    subdomain: url.split('.')[0].replace(`${protocol}://`, ''),
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash
  }
}

export function verifyUrl (url) {
  return fetch(url)
}

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

export function protoExtend (sub) {
  const Super = this
  const Constructor = hasOwn(sub, 'constructor') ? sub.constructor : function (...args) { Super.apply(this, args) }

  Object.assign(Constructor, Super)
  Constructor.prototype = Object.create(Super.prototype)
  Object.assign(Constructor.prototype, sub)

  return Constructor
}

export const pascalToCamelCase = (str) => str[0].toLowerCase() + str.substring(1)

export function parseJwt (token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

export function getCookie (cname) {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }

  return ''
}

export function getCookie2 (c) {
  const re = new RegExp(`(?<=${c}=)[^;]*`)

  try {
    return document.cookie.match(re)[0]
  } catch {
    return 'this-cookie-doesn\'t-exist'
  }
}

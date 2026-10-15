export function isWebpSupported() {
    // Singleton check, eseguito solo la prima volta
    if (window._webpSupport !== undefined) return window._webpSupport
    try {
        const elem = document.createElement('canvas')
        window._webpSupport =
            !!(elem.getContext && elem.getContext('2d')) &&
            elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
        return window._webpSupport
    } catch {
        window._webpSupport = false
        return false
    }
}

/**
 *
 * @param {number} w
 * @param {number} h
 */
export const getGcd = (w, h) => (h === 0) ? w : getGcd(h, w % h)

// PROMISES --------------------------------------------------------------------------------------------------------------------------------

export function promiseAllProperties(promisesMap) {
    if (promisesMap === null || typeof promisesMap !== 'object') return Promise.reject(new TypeError('The input argument must be of type Object'))

    const keys = Object.keys(promisesMap)
    const promises = keys.map((key) => promisesMap[key])

    return Promise.all(promises).then(results => {
        return results.reduce((resolved, result, index) => {
            resolved[keys[index]] = result
            return resolved
        }, {})
    })
}

// ROOT --------------------------------------------------------------------------------------------------------------------------------

export function getBreakpointsMap() {
    let mapString = getComputedStyle(document.head).getPropertyValue('font-family')
    mapString = mapString.replace('/map-to-JSON((', '')
    mapString = mapString.replace('))/', '')
    const mapArray = mapString.split(',')
    const map = new Map()

    mapArray.forEach((b) => {
        const s = b.split(':')
        map.set(
            s[0].replace(/["]/gi, '').trim(),
            parseInt(s[1].replace('px', ''), 10)
        )
    })
    return map
}

export function getBreakPoint() {
    let device = window.getComputedStyle(document.body, '::after').getPropertyValue('content')
    device = device.replace(/('|")/g, '')
    const deviceSplitted = device.split('-')
    return {
        name: String(deviceSplitted[0]),
        value: parseInt(String(deviceSplitted[1]).replace('px', ''))
    }
}

export const rootVarExist = (name) => getComputedStyle(document.documentElement).getPropertyValue(name) !== ''

export const getCSSVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name)

// BROWSERS --------------------------------------------------------------------------------------------------------------------------------

export function getBrowser() {
    const ua = navigator.userAgent
    let tem
    let match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

    if (/trident/i.test(match[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || []
        return 'IE ' + (tem[1] || '')
    }

    if (match[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
        if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
    }

    match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?']
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) match.splice(1, 1, tem[1])

    return {
        name: match[0].toLocaleLowerCase(),
        version: match[1],
        versionValue: parseFloat(match[1])
    }
}

export const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

export const isSafari = () => {
    const ua = navigator.userAgent.toLowerCase()
    let isSafari = false
    isSafari = /constructor/i.test(window.HTMLElement) || (p => p.toString() === '[object SafariRemoteNotification]')(!window.safari || window.safari.pushNotification)
    isSafari = (isSafari || ((ua.indexOf('safari') !== -1) && (!(ua.indexOf('chrome') !== -1) && (ua.indexOf('version/') !== -1))))
    return isSafari
}

export const isEdge = () => {
    const ua = window.navigator.userAgent
    const msie = ua.indexOf('MSIE ')
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }
    const trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        const rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }
    const edge = ua.indexOf('Edge/')
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }
    return false
}

// DEVICES / BREAKPOINT --------------------------------------------------------------------------------------------------------------------------------

export const isMobile = () => getBreakPoint().value <= getBreakpointsMap().get('m')
export const isTouchDevice = () => window.matchMedia('(pointer: coarse) and (hover: none)').matches

// DOM --------------------------------------------------------------------------------------------------------------------------------

export function fixVh() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    return `${vh}px`
    // const vh = (window.visualViewport?.height ?? window.innerHeight) / 100;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// MATH --------------------------------------------------------------------------------------------------------------------------------

export const getRandomBetween = (min, max) => parseInt(Math.random() * (max - min) + min)
export const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a))
export const invlerp = (x, y, a) => clamp((a - x) / (y - x))
export const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a))
export const lerp = (a, b, n) => (1 - n) * a + n * b
export const toDec = (v, d = 3) => Number(v.toFixed(d))

// Map number x from range [a, b] to [c, d]
export const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c

export function getClosets(item, array, getDiff) {
    let closest
    let diff

    if (!Array.isArray(array)) {
        throw new Error('Get closest expects an array as second argument')
    }

    array.forEach((comparedItem, comparedItemIndex) => {
        const thisDiff = getDiff(comparedItem, item)

        if (thisDiff >= 0 && (typeof diff === 'undefined' || thisDiff < diff)) {
            diff = thisDiff
            closest = comparedItemIndex
        }
    })

    return closest
}

// VECTOR --------------------------------------------------------------------------------------------------------------------------------

const r = num => Math.round((num + Number.EPSILON) * 100) / 100

export function fixSvg(svg) {
    const box = svg.getBBox()
    const viewBox = [
        r(box.x),
        r(box.y),
        r(box.width),
        r(box.height)
    ].join(' ')

    svg.setAttribute('viewBox', viewBox)
    svg.removeAttribute('width')
    svg.removeAttribute('height')
}

export function isInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}
import moment from 'moment'
import { parse } from 'marked'
import Dinero from 'dinero.js'

Dinero.defaultCurrency = 'EUR'
Dinero.globalLocale = 'it-IT'
Dinero.defaultPrecision = 0

moment.locale('it')

const d = {
    mdToHtml: v => parse(v),
    toHumanPrice: (v, s = '') => v && v > 0 ? Dinero({ amount: v }).toFormat() + s : '0,00 €' + s,
    toHumanDate(value, f = 'L') {
        return value && moment(value).isValid() ? moment(value).format(f) : (value || '--')
    },
    toHumanDateUnix(value, f = 'L') {
        return value && moment(value).isValid() ? moment.unix(value).format(f) : (value || '--')
    },
    toHumanCalendar(value) {
        return value ? moment(value).calendar() : (value || '--')
    },
    truncate(v, l = 115) {
        if (!v) return v
        return v.substring(0, l) + '...'
    },
    highlight(v, k) {
        if (!v || !k) return v
        return v.replace(k, '<span class="text-highlight">' + k + '</span>')
    }
}

export default d
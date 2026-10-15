import { Emitter, Http } from './libs'
import { genResources } from './resources'
import platform from 'platform'
import dot from 'dot-object'
import sortBy from 'lodash/array'
// import Me from './resources/Me'

const emitter = new Emitter()

class Api {
    constructor(opts = {}) {
        this.config = {
            requester: opts.requester || 'app',
            requester_lang: opts.requester_lang || 'it',
            app_id: opts.app_id || 'bxs',
            prefix: opts.prefix || 'bxs',
            base_url: opts.base_url || process.env.VUE_APP_API || 'http://localhost:5000',
            token_key: `${opts.token_key || opts.prefix || 'bxs_a_t'}_a_t`,
            timeout: opts.timeout || 180000, // 3m
            validate_status: opts.validate_status || (status => status >= 200 && status < 400),
            interval_watch_token: opts.interval_watch_token || 2000,
            ui: {
                max_inactivity: 10800
            }
        }

        this.tools = {
            emitter: emitter,
            socket: null,
            sniffer: {
                platform,
                navigator: {
                    deviceMemoryCache: navigator.deviceMemory,
                    lang: navigator.language,
                    onLine: navigator.onLine,
                    productSub: navigator.productSub,
                    connection: navigator.connection
                }
            },
            http: new Http(
                this.config,
                emitter
            )
        }

        this.status = {}
        this.links = {}
        this.enums = {
            fields: {
                rules: {
                    max_165_chars: v => (v && v.length < 165) || 'questo campo non può superare i 165 caratteri',
                    alphanumeric: v => /^[a-z\d]*$/.test(v) || 'codice in maiuscolo, alfanumerico, senza spazio',
                    capitalize: v => /^[A-Z]$/.test(v) || 'campo con lettere maiuscole',
                    capitalizeFirstletter: v => /([^A-Z])([A-Z])(?=[A-Z]{2})|^([A-Z])/.test(v) || 'Questo campo deve avere la prima lettera maiuscola',
                    dimension: v => /^\d+(?:[.]\d{1,3}|$)$/.test(v) || 'campo con 3 decimali',
                    email: v => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(v) || 'inserisci un\'email corretta',
                    fiscalcode: v => /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/.test(v) || 'inserisci un codice fiscale corretto',
                    from_0_to_100: v => /^0*(?:[1-9][0-9]?|100)$/g.test(v) || 'questo campo deve essere compreso tra 0 e 100',
                    iban_it: v => /^IT([0-9a-zA-Z]\s?){20}$/.test(v) || 'Inserisci un\'iban corretto.',
                    least_1_Number: v => /\d+/.test(v) || 'questo campo deve contenere almeno un numero',
                    max_1000_char: v => (v && v.length > 1000) || 'questo campo non può superare i 1000 caratteri',
                    max_20_char: v => (v && v.length > 20) || 'questo campo non può superare i 20 caratteri',
                    min_100_char: v => (v && v.length < 100) || 'questo campo deve contenere almeno 100 caratteri',
                    min_165_char: v => (v && v.length > 165) || 'questo campo deve contenere almeno 165 caratteri',
                    only5Numbers: v => /^[0-9]{5}$/.test(v) || 'questo campo deve contere solo 5 numeri',
                    only_numbers: v => /^\d+$/.test(v) || 'questo campo deve contere solo da numeri',
                    phone: v => /^\d{3,}$/.test(v) || 'il campo richiede solo numeri',
                    required: v => !!v || 'Campo richiesto',
                    three_decimal: v => /^\d+(?:[.]\d{1,3}|$)$/.test(v) || 'campo con 3 decimali',
                    two_decimal: v => /^\d+(?:[.]\d{1,2}|$)$/.test(v) || 'campo con 2 decimali',
                    vatnumber: v => /^[0-9]{11}$/.test(v) || 'inserisci una partita iva corretta',
                    required_arr: v => (v && !!v.length) || 'Campo richiesto'
                }
            },
            toArray: (k) => {
                const d = dot.pick(k, this.enums)
                if (!d) throw new Error('enum get not found')
                return d.map(i => i.value).sort()
            },
            get: (k, field, v) => {
                const d = dot.pick(k, this.enums)
                if (!d) throw new Error('enum get not found')
                const dt = sortBy(d, 'text')

                if (field && v) {
                    return dt.find(v => dot.pick(field, v) === v)
                }

                return dt
            },
            $t: (k, v, w = 'text') => {
                const arr = dot.pick(k, this.enums)
                return arr.find(i => dot.pick('value', i) === v)[w]
            }
        }
        this.errorList = {}

        const resources = genResources(this.config, this.tools)
        for (const k in resources) this[k] = resources[k]

        window.addEventListener('online', (evt) => this.tools.emitter.emit('change-connection', evt))
        window.addEventListener('offline', (evt) => this.tools.emitter.emit('change-connection', evt))
    }

    //
    on(name, cb) {
        const isArr = Array.isArray(name)
        if (isArr) return name.forEach(evt => this.tools.emitter.on(evt, cb))
        return this.tools.emitter.on(name, cb)
    }

    off(name) {
        const isArr = Array.isArray(name)
        if (isArr) return name.forEach(evt => this.tools.emitter.off(evt))
        this.tools.emitter.off(name)
    }

    //
    setAccessToken(token) {
        this.auth.token = token
        sessionStorage.setItem(this.config.token_key, token)
    }

    unsetAccessToken() {
        this.auth.token = null
        sessionStorage.removeItem(this.config.token_key)
    }

    //
    get(v, q) {
        return this.tools.http.get(v, q)
    }

    post(v, b) {
        return this.tools.http.post(v, b)
    }

    put(v, b) {
        return this.tools.http.put(v, b)
    }

    patch(v, b) {
        return this.tools.http.patch(v, b)
    }

    delete(v, b) {
        return this.tools.http.delete(v, b)
    }
    //

    getSchema(id) {
        return this.tools.http.get(`${this.config.base_url}/v1/schemes/${id}`)
    }

    fillSchema(model, doc_ref, populate, type) {
        return this.tools.http.get(`v1/schemes/${model}/fills/${doc_ref}`, {
            populate: populate,
            type: type
        })
    }

    fillForm(model, doc_ref, populate, type) {
        return this.tools.http.get(`v1/schemes/${model}/fills/${doc_ref}`, {
            populate: populate,
            type: type
        })
    }

    fillModel(model, doc_ref, populate, type) {
        return this.tools.http.get(`v1/schemes/${model}/fills/${doc_ref}`, {
            populate: populate,
            type: type
        })
    }

    duplicate(model, doc_ref) {
        return this.tools.http.get(`v1/schemes/${model}/duplicate/${doc_ref}`)
    }

    distinct(model, field, q) {
        return this.tools.http.get(`v1/schemes/${model}/distinct/${field}`, q)
    }

    counts(model, q) {
        return this.tools.http.get(`v1/schemes/${model}/counts`, q)
    }

    getLookups(arr) {
        // {
        //     [
        //         {
        //             from: 'Article',
        //             localField: 'labels',
        //             foreignId: id
        //         }
        //     ]
        // }
        return this.tools.http.get(`${this.config.base_url}/v1/lookups`, {
            items: arr
        })
    }

    async getStatus() {
        const data = await this.tools.http.get(`${this.config.base_url}/v1/status`)
        this.status = JSON.parse(JSON.stringify(data))
        return data
    }

    async getEnums() {
        const data = await this.tools.http.get(`${this.config.base_url}/v1/app/enums`)
        this.enums = {
            ...this.enums,
            ...JSON.parse(JSON.stringify(data))
        }
        return data
    }

    async getPublicEnums(q) {
        const data = await this.tools.http.get(`${this.config.base_url}/v1/app/enums/publics`, q)
        this.enums = {
            ...this.enums,
            ...JSON.parse(JSON.stringify(data))
        }
        return data
    }

    async enum(key) {
        const data = await this.tools.http.get(`${this.config.base_url}/v1/enums`, {
            key
        })

        return data
    }

    async getLinks() {
        const data = await this.tools.http.get(`${this.config.base_url}/v1/links`)
        this.links = JSON.parse(JSON.stringify(data))
        return data
    }

    async getErrorList() {
        const data = await this.tools.http.get(`${this.config.base_url}/v1/error_list`)
        this.errorList = JSON.parse(JSON.stringify(data))
        return data
    }

    activityWatcher(cbk) {
        // The number of seconds that have passed
        // since the user was active.
        let secondsSinceLastActivity = 0
        const maxInactivity = this.config.ui.max_inactivity // (60 * 5)

        // Setup the setInterval method to run
        // every second. 1000 milliseconds = 1 second.
        setInterval(() => {
            secondsSinceLastActivity++

            // console.log(secondsSinceLastActivity + ' seconds since the user was last active')
            if (cbk && typeof cbk === 'function') {
                cbk(null, 'ok')
            }

            // if the user has been inactive or idle for longer
            // then the seconds specified in maxInactivity
            if (secondsSinceLastActivity > maxInactivity) {
                // console.log('User has been inactive for more than ' + maxInactivity + ' seconds')
                if (cbk && typeof cbk === 'function') {
                    cbk(true)
                }
            }
        }, 1000)

        // The function that will be called whenever a user is active
        function activity() {
            // reset the secondsSinceLastActivity variable
            // back to 0
            secondsSinceLastActivity = 0
        }

        // An array of DOM events that should be interpreted as
        // user activity.
        const activityEvents = [
            'mousedown', 'mousemove', 'keydown',
            'scroll', 'touchstart'
        ]

        // add these events to the document.
        // register the activity function as the listener parameter.
        activityEvents.forEach(eventName => document.addEventListener(eventName, activity, true))
    }

    getResource(model_name) {
        for (const k in this) {
            if (this[k].model_name && this[k].model_name === model_name) {
                return this[k]
            }
        }
    }

    get env() {
        return process.env.NODE_ENV
    }

    get token_key() {
        return this.config.token_key
    }

    get prefix() {
        return this.config.prefix
    }

    get is_dev_env() {
        return this.env === 'development'
    }
}

export default Api
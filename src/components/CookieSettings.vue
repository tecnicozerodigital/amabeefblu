<template>
    <teleport to="#app">
        <bxs-modal
        v-model="cookie.on"
        max-width="512px"
        overlay-opacity="0"
        color="black"
        class="light"
        z-index="var(--layer-cookie)">
            <template #header>
                <div>
                    <h5 class="mb-1">Preferenze</h5>
                    <p class="small mb-0">Utilizzare questa pagina per eseguire l’opt-in e l’opt-out dei tracker del nostro sito web e dei nostri strumenti di analisi.</p>
                </div>
            </template>

            <template #subheader>
                <!-- <div class="px-ui mb-ui">
                    <p class="small mb-0">Utilizzare questa pagina per eseguire l’opt-in e l’opt-out dei tracker del nostro sito web e dei nostri strumenti di analisi.</p>
                </div> -->

                <div class="flex nowrap">
                    <bxs-btn
                    block
                    :text="view !== 'deps'"
                    :color="view !== 'deps' ? 'mute' : null"
                    tile
                    @click="view = 'deps'">Categorie</bxs-btn>

                    <bxs-btn
                    block
                    :text="view !== 'all'"
                    :color="view !== 'all' ? 'mute' : null"
                    tile
                    @click="view = 'all'">Servizi</bxs-btn>
                </div>
            </template>

            <!-- ------------------------------------------------------------------------------------------------------------------------
            ---------------------------------------------------------------------------------------------------------------------------- -->
            <div
            v-show="view === 'deps'"
            class="pa-ui">
                <bxs-collapse-item
                v-for="(item, i) in items"
                :key="i"
                class="mb-ui mb-0-lat">
                    <template #label>
                        <div class="flex nowrap align-center">
                            <div class="flex-1 pr-12 small">
                                <p class="mb-1 text-medium"><b>{{ item.title }}</b></p>
                                <p class="mb-0 text-mute">{{ item.desc }}</p>
                            </div>

                            <div>
                                <bxs-switch-field
                                v-model="item.model"
                                :disabled="item.disabled"
                                class="ma-0"
                                @change="setValue(item, item.id, $event)" />
                            </div>
                        </div>
                    </template>

                    <bxs-list v-if="item.cookies.length > 0">
                        <bxs-list-item
                        v-for="(c, ci) in item.cookies"
                        :key="ci">
                            <span class="small">{{ c.name }}</span>

                            <template #action>
                                <bxs-switch-field
                                v-model="c.model"
                                :disabled="c.disabled"
                                class="ma-0"
                                @change="setValue(c, item.id, $event)" />
                            </template>
                        </bxs-list-item>
                    </bxs-list>

                    <div
                    v-else
                    class="pa-ui">
                        <small>Nessun servizio presente</small>
                    </div>
                </bxs-collapse-item>
            </div>

            <!-- ------------------------------------------------------------------------------------------------------------------------
            ----------------------------------------------------------------------------------------------------------------------------- -->
            <div
            v-show="view === 'all'"
            class="pa-ui">
                <ul>
                    <li
                    v-for="(item, i) in items"
                    :key="i">
                        <bxs-collapse-item
                        v-for="(c, ci) in item.cookies"
                        :key="ci"
                        class="mb-ui mb-0-last">
                            <template #label>
                                <div class="flex nowrap align-center">
                                    <div class="flex-1 pr-12 small">
                                        <p class="mb-1"><b>{{ c.name }}</b></p>
                                        <p class="mb-0">{{ c.dep }}</p>
                                    </div>

                                    <div>
                                        <bxs-switch-field
                                        v-model="c.model"
                                        :disabled="c.disabled"
                                        icon-color="white"
                                        class="ma-0"
                                        @change="setValue(c, item.id, $event)" />
                                    </div>
                                </div>
                            </template>

                            <component
                            v-if="c.desc"
                            :is="`cookie-item-${c.desc}`" />
                        </bxs-collapse-item>
                    </li>
                </ul>
            </div>

            <!--  -->
            <template #actions>
                <div class="flex nowrap">
                    <!-- <bxs-btn
                    block
                    tile
                    outlined
                    class="mb-1">
                        <small>Rifiuta tutto</small>
                    </bxs-btn> -->

                    <bxs-btn
                    color="white"
                    text
                    block
                    height="60"
                    tile
                    @click="save">
                        <small>Salva impostazioni</small>
                    </bxs-btn>

                    <bxs-btn
                    color="white"
                    dark
                    tile
                    height="60"
                    block
                    @click="acceptAll">
                        <small>Accetta tutti</small>
                    </bxs-btn>
                </div>
            </template>
        </bxs-modal>
    </teleport>
</template>

<script>
import CookieItemGA from '../components/cookies/CookieItemGA.vue'
import CookieItemFB from '../components/cookies/CookieItemFB.vue'

export default {
    name: 'cookie_settings',
    components: {
        'cookie-item-ga': CookieItemGA,
        'cookie-item-fb': CookieItemFB
    },
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false
        },
        ga: {
            type: String,
            required: false,
            default: null
        }
    },
    emits: [
        'update:modelValue',
        'update:model-value',
        'save',
        'accept-all'
    ],
    data () {
        return {
            view: 'deps',
            items: [
                {
                    id: 1,
                    title: 'Prestazioni web e analisi',
                    desc: 'Questi strumenti di tracciamento ci permettono di misurare il traffico e analizzare il tuo comportamento per migliorare il nostro servizio.',
                    model: false,
                    disabled: false,
                    cookies: [
                        {
                            name: 'Google Analytics',
                            key: 'ga',
                            desc: 'ga',
                            disabled: false,
                            model: true
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Marketing',
                    desc: 'Questi strumenti di tracciamento ci permettono di fornirti contenuti marketing o annunci personalizzati e di misurarne la performance.',
                    model: false,
                    disabled: true,
                    cookies: [
                        // {
                        //     name: 'Facebook Pixel',
                        //     key: 'fb',
                        //     desc: 'fb',
                        //     model: false
                        // }
                    ]
                },
                {
                    id: 3,
                    title: 'Funzionalità',
                    desc: 'Questi strumenti di tracciamento abilitano semplici interazioni e funzionalità che ti permettono di accedere a determinate risorse del nostro servizio e ti consentono di comunicare più facilmente con noi.',
                    model: false,
                    disabled: true,
                    cookies: [
                        // {
                        //     name: 'Google Maps',
                        //     key: 'gm',
                        //     disabled: false,
                        //     desc: null,
                        //     model: false
                        // }
                    ]
                },
                {
                    id: 4,
                    title: 'Essenziali',
                    desc: 'Questi strumenti di tracciamento sono strettamente necessari per garantire il funzionamento e la fornitura del servizio che ci hai richiesto e, pertanto, non richiedono il tuo consenso.',
                    model: true,
                    disabled: true,
                    cookies: [
                        // {
                        //     name: 'Login Session Cookie fusco.ch',
                        //     key: 'login_session_fusco_ch',
                        //     desc: null,
                        //     model: true,
                        //     disabled: true
                        // }
                    ]
                }
            ],
            cookie: {
                on: this.modelValue
            }
        }
    },
    watch: {
        modelValue (newVal) {
            this.cookie.on = newVal
        },
        'cookie.on' (newVal) {
            this.$emit('update:modelValue', newVal)
        }
    },
    mounted () {
        this.$nextTick(this.start)
    },
    methods: {
        start () {
            // console.log('gtag', this.$gtag)

            // const cookies = this.getCookies()
            // console.log(cookies)
            let local_cookies = localStorage.getItem('bxs-cookie:consent')
            if (local_cookies) local_cookies = local_cookies.split(',')

            if (local_cookies && local_cookies.length > 0) {
                this.items.forEach((item) => {
                    item.cookies.forEach((c) => {
                        this.setValue(item, item.id, local_cookies.includes(c.key))
                    })
                })
            }

            this.setGoogleAnal(this.$store.state.cookie_consent.ga)
        },
        setGoogleAnal (val = true) {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: val ? 'granted' : 'denied'
                })

                // this.$gtag.disable(!val)

                if (!val) {
                    this.eraseCookie('_ga')
                    this.eraseCookie('_ga_WM79260NVP')
                }
            }
        },
        setValue (item, dep_id, value) {
            console.log('change item', item, dep_id, value)
            const is_dep = 'id' in item
            const v = []

            if (item.disabled) return

            if (is_dep) {
                if (value && !item.model) {
                    item.model = true
                }

                item.cookies.forEach(c => { c.model = value })
            } else {
                const dep = this.items.find(i => i.id === dep_id)

                if (value) {
                    if (value && !dep.model) {
                        dep.model = true
                    }
                } else {
                    if (dep.cookies.every(c => !c.model)) {
                        dep.model = false
                    }
                }
            }

            this.items.forEach((i) => {
                i.cookies.forEach((c) => {
                    if (c.model) v.push(c.key)
                    this.$store.commit('set_cookie_consent', { k: c.key, v: c.model })
                })
            })

            localStorage.setItem('bxs-cookie:consent', v)
        },
        save () {
            this.setGoogleAnal(this.$store.state.cookie_consent.ga)
            this.cookie.on = false
            this.$emit('save')
        },
        acceptAll () {
            this.items.forEach((i) => {
                this.setValue(i, i.id, true)
            })

            this.setGoogleAnal(this.$store.state.cookie_consent.ga)
            this.cookie.on = false
            this.$emit('accept-all')
        },
        // getCookies () {
        //     const pairs = document.cookie.split(';')
        //     const cookies = {}

        //     for (let i = 0; i < pairs.length; i++) {
        //         const pair = pairs[i].split('=')
        //         cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='))
        //     }

        //     return cookies
        // },
        // setCookie (name, value, days) {
        //     let expires = ''

        //     if (days) {
        //         const date = new Date()
        //         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        //         expires = `; expires=${date.toUTCString()}` // "; expires=" + date.toUTCString()
        //     }

        //     document.cookie = `${name} = ${value || ''}${expires}; path=/` // name + '=' + (value || '')  + expires + "; path=/"
        // },
        // getCookie (name) {
        //     const nameEQ = name + '='
        //     const ca = document.cookie.split(';')

        //     for (let i = 0; i < ca.length; i++) {
        //         let c = ca[i]
        //         while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        //         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        //     }

        //     return null
        // },
        eraseCookie (name) {
            // document.cookie = `${name}=; Max-Age=-99999999;` // name + '=; Max-Age=-99999999;'
            document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        }
    }
}
</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif !important;
}
</style>
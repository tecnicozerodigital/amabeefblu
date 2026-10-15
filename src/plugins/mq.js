// src/plugins/mq.js
// Plugin breakpoints reattivi per Vue 3
// - espone: app.config.globalProperties.$mq  (in template: $mq)
// - provide/inject: app.provide('mq', mq)     (in <script setup>: const mq = inject('mq'))

import { reactive } from 'vue'
import { getCSSVar } from '../assets/libs/utils'
import {
    mobile as _is_mobile, // is iPhone, iPod, Android Phone, Windows Phone, Blackberry.
    touchDevice as is_touch_device
} from 'is_js'

const static_break_value = parseInt(getCSSVar('--static-break-value').replace('px', ''))
const is_mobile = () => window.innerWidth < static_break_value || _is_mobile()

/* eslint-disable */

export function mqPlugin(app, options = {}) {
    const bps = options.breakpoints || {
        ms: 360,
        mm: 480,
        ml: 768,
        ds: 1024,
        dm: 1280,
        dl: 1440
    }

    const keys = Object.keys(bps).sort((a, b) => bps[a] - bps[b]) // desc per trovare "current"
    const keysAsc = [...keys].reverse() // asc

    // Stato reattivo
    const state = reactive({
        width: 0,
        height: 0,
        gte: Object.fromEntries(keysAsc.map(k => [k, false])), // >= bp
        lt: Object.fromEntries(keysAsc.map(k => [k, true])),  // <  bp
        current: null                                          // nome bp corrente (range attivo)
    })

    // Helpers (usabili in template e script)
    const api = {
        // >= breakpoint
        from(name) { return state.width >= (bps[name] ?? Infinity) },
        // < breakpoint
        until(name) { return state.width < (bps[name] ?? -Infinity) },
        // a <= width < b
        between(a, b) { return state.width >= (bps[a] ?? -Infinity) && state.width < (bps[b] ?? Infinity) },
        // width dentro l'intervallo [bp, nextBp)
        is(name) {
            const i = keysAsc.indexOf(name)
            if (i === -1) return false
            const min = bps[name]
            const max = keysAsc[i + 1] ? bps[keysAsc[i + 1]] : Infinity
            return state.width >= min && state.width < max
        },
        // stato grezzo
        state,
        // alias comodi per template
        gte: state.gte,
        lt: state.lt,
        is_mobile: is_mobile(),
        is_touch_device: is_touch_device(),
    }

    // --- Runtime update ----
    function updateSize() {
        // usa innerWidth per includere scrollbar dinamiche
        state.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        state.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

        // aggiorna mappe gte/lt
        keysAsc.forEach(k => {
            const px = bps[k]
            state.gte[k] = state.width >= px
            state.lt[k] = state.width < px
        })

        // calcola "current" = bp più grande soddisfatto
        const currentKey = keys.find(k => state.width >= bps[k]) || keysAsc[0]
        state.current = currentKey

        api.is_mobile = is_mobile()
        api.is_touch_device = is_touch_device()
    }

    // --- Listeners (matchMedia su ciascun "from") ---
    const mqls = []
    if (typeof window !== 'undefined') {
        // init
        updateSize()
        // resize fallback (per sicurezza)
        window.addEventListener('resize', updateSize, { passive: true })
        // matchMedia per tutte le soglie (aggiorna preciso e veloce)
        keysAsc.forEach(k => {
            const mql = window.matchMedia(`(min-width: ${bps[k]}px)`)
            const onChange = () => updateSize()
            mql.addEventListener ? mql.addEventListener('change', onChange) : mql.addListener(onChange)
            mqls.push([mql, onChange])
        })
    }

    // Esponi globalmente
    const mq = Object.assign(api, { breakpoints: bps })

    app.config.globalProperties.$mq = mq
    app.provide('mq', mq)

    // opzionale: cleanup su HMR
    if (import.meta?.hot) {
        import.meta.hot.dispose(() => {
            window.removeEventListener('resize', updateSize)
            mqls.forEach(([mql, cb]) => {
                mql.removeEventListener ? mql.removeEventListener('change', cb) : mql.removeListener(cb)
            })
        })
    }

    return mq
}

/*
    <!-- Desktop nav solo da lg in su -->
    <nav v-if="$mq.gte.lg">...</nav>
    <nav v-else>...</nav>

    <!-- Card 3-up solo tra xl e uhd -->
    <div class="grid" v-if="$mq.between('xl', 'uhd')">...</div>

    <!-- Sezione attiva solo “md” esatto (>= md e < lg) -->
    <section v-if="$mq.is('md')">...</section>

    <!-- Messaggio mobile-only -->
    <p v-if="$mq.until('md')">Sei su mobile</p>
*/
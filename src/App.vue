<template>
    <div
    ref="wrapper"
    id="wrapper"
    :class="['app--wrapper', {
        'app-is-preloaded': is_preloaded,
        'app-is-in-transition': is_in_transition,
        'app-loading': !is_preloaded || is_in_transition || is_loading,
        'app-noevt': !is_preloaded || is_in_transition || is_loading
    }]">
        <bxs-navbar
        ref="navframe"
        :hide="nav.hide"
        :on="nav.on" />

        <!-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
            view
        ---------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <main
        ref="main"
        :class="['app--main', 'app--main--view-' + $route.name]">
            <router-view
            v-slot="{ Component }"
            ref="page"
            class="app--main--page app--page">
                <transition
                mode="out-in"
                @enter="transitionEnter"
                @leave="transitionLeave">
                    <component
                    v-if="!is_in_transition"
                    :is="Component" />
                </transition>
            </router-view>
        </main>

        <!-- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
        footer
        ---------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <bxs-footer
        v-if="!is_in_transition && $route.name !== 'dev'"
        ref="footer" />

        <!-- ------------------------------------------------------------------------------------------------------------
            loader
        ------------------------------------------------------------------------------------------------------------ -->
        <transition
        v-prerender="'skip'"
        name="fade"
        mode="out-in">
            <div
            v-if="is_loading"
            class="p-loader">
                <logo max-width="180" />
            </div>
        </transition>

        <!-- ------------------------------------------------------------------------------------------------------------
            transition layer
        ------------------------------------------------------------------------------------------------------------ -->
        <div
        v-prerender="'skip'"
        ref="transitionLayer"
        class="p-transition-layer gpu-boost gpu-media gpu-boost--anim-clip">
            <logo max-width="180" />
            <!-- <h1>AmaBeef</h1> -->
        </div>

        <!-- ------------------------------------------------------------------------------------------------------------
            cookie banner
        ------------------------------------------------------------------------------------------------------------ -->
        <teleport to="#app">
            <bxs-cookie
            v-prerender="'skip'"
            ref="cookie"
            v-show="!cookie_settings.on"
            storage-name="amabeefrestaurant.it:accepted">
            <template #default="{ accept }">
                <div class="flex-1 text-ui">
                <div class="mb-8">
                    <small class="text-medium">Notice!</small>
                </div>

                <div class="mb-ui small">
                    <p class="mb-3 text-o-mute">Questo sito web non utilizza cookie di profilazione. Vengono invece utilizzati cookie tecnici, inclusi cookie di terze parti, al fine di migliorare l’esperienza di navigazione.</p>
                    <p class="mb-3 text-o-mute">Cliccando sul pulsante "Accetta", chiuderai il banner senza prestare il consenso ad alcun cookie diverso da quelli strettamente necessari.</p>

                    <div class="text-disabled mt-ui">
                        <router-link to="/policies/privacy-policy" class="link-mute">Privacy Policy</router-link>
                    </div>
                </div>

                <div class="text-right">
                    <!-- <bxs-btn
                    text
                    class="mr-ui"
                    @click="cookie_settings.on = true">
                    <small>Solo essenziali</small>
                    </bxs-btn> -->

                    <bxs-btn
                    text
                    light
                    tile
                    class="mr-ui"
                    @click="cookie_settings.on = true">
                        <small>Imposta preferenze</small>
                    </bxs-btn>

                    <bxs-btn
                    color="white"
                    dark
                    tile
                    @click="accept">
                        <small>Accetto</small>
                    </bxs-btn>
                </div>
                </div>
            </template>
            </bxs-cookie>
        </teleport>

        <!-- ------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------ -->
        <bxs-cookie-settings
        v-prerender="'skip'"
        storage-name="amabeefrestaurant.it:accepted"
        v-model="cookie_settings.on"
        @accept-all="$refs.cookie.accept()" />

        <!-- ------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------ -->
        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-1" clipPathUnits="objectBoundingBox">
                <path
                d="M0 1H0.152466C0.185351 0.960002 0.327354 0.884713 0.505232 0.884713C0.683109 0.884713 0.818635 0.968237 0.849028 1H1V0.347104C0.985052 0.222406 0.838565 0.00477544 0.497758 6.98837e-05C0.156951 -0.00463567 0.0239163 0.229466 0 0.347104V1Z"
                fill="black" />
            </clipPath>
        </svg>

        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-2" clipPathUnits="objectBoundingBox">
                <path d="M0.0249688 0C0.0111789 0 0 0.0112775 0 0.0251889V0.851385C0 0.865297 0.0111789 0.876574 0.0249688 0.876574H0.179775V0.974811C0.179775 0.988723 0.190954 1 0.204744 1H0.975031C0.988821 1 1 0.988723 1 0.974811V0.157431C1 0.143519 0.988821 0.132242 0.975031 0.132242H0.810237V0.0251889C0.810237 0.0112775 0.799058 0 0.785268 0H0.0249688Z" />
            </clipPath>
        </svg>

        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-3" clipPathUnits="objectBoundingBox">
                    <path d="M0.751042 0.5V0.251042H0.5V0H0V0.5H0.251042V0.751042H0.5V1H1V0.5H0.751042Z" />
            </clipPath>
        </svg>

        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-4" clipPathUnits="objectBoundingBox">
                <path d="M1.000000 0.000000 L0.000000 0.000000 L0.006020 0.981586 L0.528329 0.985127 C0.785057 0.969193 1.000000 0.776142 1.000000 0.500000 L0.491147 0.500000 C0.771391 0.500000 1.000000 0.276142 1.000000 0.000000 Z" />
            </clipPath>
        </svg>

        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-5" clipPathUnits="objectBoundingBox">
                <path d="M0 0H0.479167C0.766667 0 1 0.233333 1 0.520833V1H0.520833C0.233333 1 0 0.766667 0 0.479167V0Z" />
            </clipPath>
        </svg>

        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-6" clipPathUnits="objectBoundingBox">
                <path d="M1 0.5C0.867392 0.5 0.740215 0.447322 0.646447 0.353553C0.552678 0.259785 0.5 0.132608 0.5 0C0.5 0.132608 0.447322 0.259785 0.353553 0.353553C0.259785 0.447322 0.132608 0.5 0 0.5C0.132608 0.5 0.259785 0.552678 0.353553 0.646447C0.447322 0.740215 0.5 0.867392 0.5 1C0.5 0.867392 0.552678 0.740215 0.646447 0.646447C0.740215 0.552678 0.867392 0.5 1 0.5Z" />
            </clipPath>
        </svg>

        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-7" clipPathUnits="objectBoundingBox">
                <path d="M1.000000 0.000000 L0.000000 0.000000 L0.000000 1.000000 L1.000000 1.000000 L1.000000 0.000000 L1.000000 0.000000 L0.707227 0.698872 L0.000000 1.000000 L0.268552 0.260197 L1.000000 0.000000 Z" />
            </clipPath>
        </svg>

        <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-8" clipPathUnits="objectBoundingBox">
                <path d="M0.997417 0.541807C1.02854 0.316235 0.773628 -0.00919936 0.492039 0.000199072C0.249199 0.00830422 0 0.217547 0 0.539457C0.0251948 0.836695 0.248984 1 0.492039 1C0.745469 1 0.982596 0.83787 0.997417 0.541807Z" />
            </clipPath>
        </svg>

        <!-- ------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------ -->
        <!-- <grid /> -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Lenis from 'lenis'
import FontFaceObserver from 'fontfaceobserver'
// import Ukiyo from "ukiyojs"
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import animations from '@/assets/libs/animations'
import transitions from '@/assets/libs/transitions'

import CookieBanner from '@/components/CookieBanner.vue'
import CookieSettings from '@/components/CookieSettings.vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

// import Grid from '@/components/layout/GridOverlay.vue'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.defaults({ anticipatePin: 1 })

// function sleep (t = 2) {
//     return new Promise((resolve, reject) => setTimeout(resolve, t * 1000))
// }

export default {
    name: 'App',
    components: {
        'bxs-navbar': Navbar,
        'bxs-footer': Footer,
        'bxs-cookie': CookieBanner,
        'bxs-cookie-settings': CookieSettings
        // grid: Grid
    },
    data () {
        return {
            scroll: null,
            nav: { on: false, hide: false },
            cookie_settings: { on: false },
            anims: {
                els: []
            }
        }
    },
    head () {
        return {
            title: 'AmaBeef – Steakhouse & Gintoneria a Cadorago (Como) | Carni Pregiate & Gin',
            meta: [
                { name: 'description', content: 'Scopri AmaBeef a Cadorago, la steakhouse a pochi minuti da Como. Carni selezionate dalla Famiglia Amabile e oltre 50 etichette di gin. Prenota ora.' },
                { name: 'canonical', content: window.location.href },
                // og
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'AmaBeef' },
                { property: 'og:title', content: 'AmaBeef' },
                { property: 'og:description', content: 'AmaBeef – Steakhouse & Gintoneria a Cadorago (Como) | Carni Pregiate & Gin' },
                { property: 'og:image', content: 'https://amabeefrestaurant.it/img/sala-1.jpg' },
                { property: 'og:image:width', content: '1080' },
                { property: 'og:image:height', content: '1080' },
                { property: 'og:url', content: window.location.href },
                // twc
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:title', content: 'AmaBeef' },
                { name: 'twitter:description', content: 'AmaBeef – Steakhouse & Gintoneria a Cadorago (Como) | Carni Pregiate & Gin' },
                { name: 'twitter:image', content: 'https://amabeefrestaurant.it/img/sala-1.jpg' },
                // indexing
                { name: 'robots', content: 'index, follow' }
            ],
            script: [
                {
                type: 'application/ld+json',
                content: `
                    {
                        "@context": "https://schema.org",
                        "@type": "Restaurant",
                        "name": "AmaBeef",
                        "image": "https://amabeefrestaurant.it/img/sala-1.jpg",
                        "url": "https://amabeefrestaurant.it/",
                        "telephone": "+393475048825",
                        "priceRange": "€€",
                        "servesCuisine": ["Steakhouse", "Italiana", "Hamburger", "Cocktail Bar"],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Via Alessandro Manzoni, 34",
                            "addressLocality": "Cadorago",
                            "addressRegion": "CO",
                            "postalCode": "22071",
                            "addressCountry": "IT"
                        },
                        "hasMenu": [
                            "https://amabeefrestaurant.it/files/amabeef-cadorago-como-menu-ristorante.pdf",
                            "https://amabeefrestaurant.it/files/amabeef-cadorago-como-menu-hamburger.pdf",
                            "https://amabeefrestaurant.it/files/amabeef-cadorago-como-menu-gin-drink-list.pdf",
                            "https://amabeefrestaurant.it/files/amabeef-cadorago-como-menu-carta-dei-vini.pdf"
                        ],
                        "acceptsReservations": "True",
                        "sameAs": [
                            "https://www.instagram.com/amabeefrestaurant",
                            "https://www.facebook.com/amabeefrestaurant"
                        ]
                    }
                `
                }
            ]
        }
    },
    computed: {
        ...mapState({
            is_preloaded: (state) => state.is_preloaded,
            is_loading: (state) => state.is_loading,
            is_in_transition: state => state.is_in_transition,
            is_first_enter: (state) => state.is_first_enter
        })
    },
    mounted () {
        this.$nextTick(this.start)
    },
    watch: {
        $route () {
            // console.log('[App] watch $route')
            this.$store.commit('set_is_first_enter', false)
        },
        'is_in_transition' (newVal) {
            console.log('[App] watch is_in_transition', newVal)
        }
    },
    methods: {
        async start () {
            console.log('[App] start()')

            const header = document.querySelector('.bxs-navbar')
            gsap.set(header, {
                autoAlpha: 0
            })

            const condition = navigator.onLine ? 'bxs-app-online' : 'bxs-app-offline'
            document.body.classList.toggle(condition)

            /* ------------------------------------------------------------
            ------------------------------------------------------------ */
            const font_typo = new FontFaceObserver('Outfit')
            const font_diplay = new FontFaceObserver('Italiana')
            const fontTimeout = (promise, ms = 3000) =>
                Promise.race([promise, new Promise(resolve => setTimeout(resolve, ms))])
            await Promise.all([
                fontTimeout(font_typo.load()),
                fontTimeout(font_diplay.load())
            ])

            /* ------------------------------------------------------------
            ------------------------------------------------------------ */
            this.scroll = new Lenis({
                // wrapper: this.$refs.main,
                // content: this.$refs.page,
                autoToggle: true,
                autoRaf: false,
                smoothWheel: true,
                lerp: 0.07,
                // duration: 1.2, // ← rimuovi se usi lerp
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                syncTouch: true,
                autoResize: true,
                overscroll: true,
                smoothTouch: false, // mobile: tieni il touch nativo, più responsivo
                wheelMultiplier: 0.75, // leggermente più calmo
                touchMultiplier: 1
            })

            this.scroll.on('scroll', this.handleScroll)

            // GSAP guida Lenis con il suo ticker
            gsap.ticker.add((t) => {
                // gsap passa secondi, Lenis vuole ms
                this.scroll.raf(t * 1000)
            })

            // evita lo “skipping” del ticker che genera micro scatti
            gsap.ticker.lagSmoothing(0)

            /* ------------------------------------------------------------
            ------------------------------------------------------------ */
            // await sleep(2)
            this.$store.commit('set_is_preloaded', true)

            await transitions.get('layer')(this.$refs.transitionLayer, 'in')
            this.$store.commit('set_is_in_transition', false)

            /* ------------------------------------------------------------
            ------------------------------------------------------------ */
            window.addEventListener('resize', this.resize, { passive: true })
            window.visualViewport?.addEventListener('resize', this.resize, { passive: true })
            window.addEventListener('orientationchange', this.resize)

            // this.$nextTick(this.play)
        },
        play () {
            console.log('[App] play()')
            this.$store.commit('set_is_in_transition', false)

            this.$nextTick(() => {
                /* ------------------------------------------------------------
                ------------------------------------------------------------ */
                if (this.scroll) this.scroll.start()
                this.resize()

                /* ------------------------------------------------------------
                ------------------------------------------------------------ */
                if (!this.anims.els.length) {
                    // this.prepAnimEls()
                }

                this.anims.els.forEach((el) => {
                    const key = el.dataset.scrollAnimReveal

                    if (animations.has(key + '-set')) {
                        animations.get(key + '-in')(el, {
                            scrollTrigger: {
                                trigger: el,
                                start: 'top 50%',
                                end: 'top bottom',
                                // toggleActions: 'play none none reverse', // rientra → reverse
                                markers: false
                            }
                        })
                    }
                })

                gsap.utils.toArray('[data-scroll-anim]').forEach((el) => {
                    const key = el.dataset.scrollAnim
                    el.classList.add('gpu-boost')
                    el.classList.add('gpu-media')
                    let start = 'top bottom'

                    if (animations.has(key)) {
                        if (key === 'clip') el.classList.add('gpu-boost--anim-clip')
                        if (key === 'parallax-hero') {
                            start = 'bottom bottom'
                        }

                        animations.get(key)(el, {
                            scrollTrigger: {
                                trigger: el,
                                start: start,
                                end: 'max',
                                scrub: true,
                                markers: false
                            }
                        })
                    }
                })

                // assicura che il DOM sia aggiornato prima dello “scatto”
                document.dispatchEvent(new Event('app-rendered'))
            })
        },
        pause () {
            console.log('[App] pause()')
            this.nav.hide = true
            this.nav.on = false
            // if (this.scroll) this.scroll.stop()
        },
        //
        prepAnimEls () {
            this.anims.els = gsap.utils.toArray('[data-scroll-anim-reveal]')
            this.anims.els.forEach((el) => {
                const key = el.dataset.scrollAnimReveal
                el.classList.add('gpu-boost')
                el.classList.add('gpu-media')

                if (animations.has(key + '-set')) {
                    if (key === 'clip') el.classList.add('gpu-boost--anim-clip')
                    animations.get(key + '-set')(el)
                }
            })
        },
        scrollTo (val) {
            this.scroll.scrollTo(val, {
                duration: 2.5,
                lerp: 0.025,
                offset: -120,
                lock: true
            })
        },
        //
        handleScroll (e) {
            // scroll: px scorsi dall’inizio
            // limit: massimo scroll raggiungibile
            // velocity: velocità di scroll
            // direction: 1 (giù/destra) o -1 (su/sinistra)
            // progress: 0..1

            ScrollTrigger.update()

            // this.$mq.from('ds') &&
            this.nav.hide = e.direction > 0 && e.scroll >= 40
            this.nav.on = !this.nav.hide && e.scroll > (window.innerHeight / 4)
        },
        resize () {
            console.log('[App] resize()')
            const vh = (window.visualViewport?.height ?? window.innerHeight) / 100
            document.documentElement.style.setProperty('--vh', `${vh}px`)

            ScrollTrigger.update()

            if (this.scroll) {
                this.scroll.resize()
            }
        },
        //
        transitionEnter (el, next) {
            console.log('[App] transitionEnter()')

            /* ------------------------------------------------------------
            ------------------------------------------------------------ */
            if (this.scroll) {
                this.scroll.scrollTo(0, { immediate: true })
            }

            /* ------------------------------------------------------------
            ------------------------------------------------------------ */
            // this.prepAnimEls()

            /* ------------------------------------------------------------
            ------------------------------------------------------------ */
            transitions.get('layer')(this.$refs.transitionLayer, 'out').then(() => {
                next()
                this.play()
            })
        },
        transitionLeave (el, next) {
            console.log('[App] transitionLeave()')

            this.pause()
            transitions.get('layer')(this.$refs.transitionLayer, 'in').then(() => {
                next()
                this.$store.commit('set_is_in_transition', false)
            })
        }
    }
}
</script>

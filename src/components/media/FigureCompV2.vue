<!-- bxs-figure.vue -->
<template>
  <figure
    ref="figure"
    data-scroll-anim-reveal="clip"
    :class="classes"
    :style="[measurable_styles, ratio_styles]"
    :aria-busy="loading ? 'true' : 'false'"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)">
    <!-- Placeholder LQIP su background (non indicizzabile, solo estetica) -->
    <div
      v-if="showPlaceholder"
      class="figure--div reveal__img"
      :style="placeholderStyles"
      aria-hidden="true"
      role="presentation">
      <span v-if="hasSrc && !hasLazySrc && loading">loading ...</span>
    </div>

    <!-- Immagine indicizzabile -->
    <picture class="figure--picture">
      <source v-if="srcsetAvif" :srcset="srcsetAvif" type="image/avif" />
      <source v-if="srcsetWebp" :srcset="srcsetWebp" type="image/webp" />
      <img
        ref="img"
        :class="img_classes"
        :src="img_src"
        :srcset="srcset || null"
        :sizes="sizes || null"
        :alt="safeAlt"
        :width="intrinsicWidth || null"
        :height="intrinsicHeight || null"
        :loading="shouldLazy ? 'lazy' : 'eager'"
        :fetchpriority="isPriority ? 'high' : 'auto'"
        :decoding="decoding"
        @load="onLoad"
        @error="onError"
      />
    </picture>

    <!-- Overlay opzionale -->
    <div v-if="overlay" class="overlay figure--overlay"></div>

    <!-- Contenuti sopra -->
    <div
    v-if="$slots.default"
    class="figure--content">
      <slot />
    </div>

    <!-- Stato loading custom (se non usi LQIP) -->
    <div
    v-if="!hasLazySrc && loading"
    class="figure--loading">
      <slot v-if="$slots.loading" name="loading" />
      <bxs-loader v-else />
    </div>

    <!-- Didascalia/accessibilità -->
    <figcaption
    v-if="hasCaption"
    class="figure--caption">
      <slot name="caption">{{ figcaption }}</slot>
    </figcaption>
  </figure>
</template>

<script>
import { ratio, measurable } from '@/mixins'

/* eslint-disable */

export default {
  name: 'bxs-figure',
  mixins: [ratio, measurable],

  props: {
    overlay: { type: Boolean, default: false },
    rounded: { type: Boolean, default: false },
    fullHeight: { type: Boolean, default: false }, // usa :full-height nel template
    ratio: { type: String, default: '4-3' },
    autoSize: { type: Boolean, default: true }, // <— NOVITÀ

    // posizione del bg del placeholder
    backgroundPosition: { type: String, default: 'center' },

    // sorgenti
    src: { type: String, default: null },
    alt: { type: String, default: '' },

    // lazy / LQIP
    lazy: { type: Boolean, default: true },
    lazySrc: { type: String, default: null },
    lazyDelay: { type: Number, default: 0 },

    // fallback
    noSrc: { type: String, default: null },
    errorSrc: { type: String, default: null },

    // responsive / SEO
    priority: { type: Boolean, default: false }, // true => eager + fetchpriority=high
    width: { type: [Number, String], default: null },
    height: { type: [Number, String], default: null },
    srcset: { type: String, default: '' },
    sizes: { type: String, default: '' },
    srcsetWebp: { type: String, default: '' },
    srcsetAvif: { type: String, default: '' },
    figcaption: { type: String, default: '' },
    decoding: { type: String, default: 'async' },

    // compat storica (non nascondiamo più <img>, ma lasciamo la prop)
    img: { type: Boolean, default: true }
  },

  data () {
    return {
      // cache props
      cacheSrc: this.src,
      cache_lazy_src: this.lazySrc,
      cache_no_src: this.noSrc,
      cache_error_src: this.errorSrc,

      // stato
      io: null,
      intersected: false,
      loading: false,
      loaded: false,
      loaded_error: false,

      // src realmente impostata sull'<img> (per laziness via IO)
      actualSrc: '',
      naturalW: null, // <— letto al load, se serve
    naturalH: null
    }
  },

  computed: {
    // flag presenza valori
    hasSrc () { return !!(this.cacheSrc && String(this.cacheSrc).length) },
    hasLazySrc () { return !!(this.cache_lazy_src && String(this.cache_lazy_src).length) },
    hasNoSrc () { return !!(this.cache_no_src && String(this.cache_no_src).length) },
    hasErrorSrc () { return !!(this.cache_error_src && String(this.cache_error_src).length) },

    isPriority () { return !!this.priority },
    shouldLazy () { return !!(this.lazy && !this.isPriority) },
    safeAlt () { return typeof this.alt === 'string' ? this.alt : '' },
    hasCaption () { return !!(this.figcaption || this.$slots.caption) },

    // classi del contenitore
    classes () {
      return {
        figure: true,
        'figure--full-height': this.fullHeight,
        'figure-rounded': this.rounded,
        'figure-loading': this.loading,
        'figure-loaded': this.loaded,
        'figure-loaded-error': this.loaded_error,
        'figure-empty': !this.hasSrc,
        'figure-loading-lazy': this.loading && this.hasLazySrc,
        reveal: true,
        // IMPORTANT: integra le classi del tuo mixin ratio
        ...this.ratio_classes
      }
    },

    img_classes () {
      return { 'bxs-img': true }
    },

    // src effettiva dell'<img>
    img_src () {
      if (this.loaded_error && this.hasErrorSrc) return this.cache_error_src
      if (!this.hasSrc && this.hasNoSrc) return this.cache_no_src
      return this.actualSrc || '' // vuoto finché non intersecta (o se priority)
    },

    // stile del placeholder LQIP
    placeholderStyles () {
      const url =
        (this.hasLazySrc && this.cache_lazy_src) ||
        (!this.hasSrc && this.hasNoSrc && this.cache_no_src) ||
        ''
      return {
        backgroundPosition: this.backgroundPosition,
        backgroundImage: url ? `url(${url})` : 'none'
      }
    },
    showPlaceholder () {
      // mostra blur finché l'immagine "vera" non ha completato
      return (this.loading || !this.loaded) && (this.hasLazySrc || !this.loaded)
    },

    intrinsicWidth () {
    if (this.width) return Number(this.width)
    if (!this.autoSize) return null
    const d = this.autoIntrinsicDims
    return d ? d.w : null
  },
  intrinsicHeight () {
    if (this.height) return Number(this.height)
    if (!this.autoSize) return null
    const d = this.autoIntrinsicDims
    return d ? d.h : null
  },

  autoIntrinsicDims () {
    // 1) dal ratio del tuo mixin (local_ratio: "16-9", "4/3", ecc.)
    const r = this.local_ratio || this.ratio
    if (r) {
      const parsed = this.parseRatioToInts(r)
      if (parsed) return parsed // { w: 16, h: 9 } ecc.
    }
    // 2) fallback: dimensioni naturali dopo il load
    if (this.naturalW && this.naturalH) {
      return { w: this.naturalW, h: this.naturalH }
    }
    return null
  }
  },

  watch: {
    src (val) {
      this.cacheSrc = val
      this.resetAndMaybeLoad()
    },
    lazySrc (val) { this.cache_lazy_src = val },
    noSrc (val) { this.cache_no_src = val },
    errorSrc (val) { this.cache_error_src = val },
    priority () { this.resetAndMaybeLoad() },
    lazy () { this.resetAndMaybeLoad() }
  },

  created () {
    this.loading = this.shouldLazy && this.hasSrc
    this.loaded = !this.hasSrc
  },

  mounted () {
    if (!this.shouldLazy && this.hasSrc) {
      this.beginLoad()
    } else {
      this.initObserver()
    }
  },

  beforeUnmount () {
    this.teardownObserver()
  },

  methods: {
    resetAndMaybeLoad () {
      this.loaded = !this.hasSrc
      this.loading = this.shouldLazy && this.hasSrc
      this.loaded_error = false
      this.actualSrc = ''
      if (!this.shouldLazy && this.hasSrc) {
        this.beginLoad()
      } else if (this.intersected) {
        this.beginLoad()
      }
    },

    initObserver () {
      if (!this.shouldLazy || !('IntersectionObserver' in window)) return
      this.io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.intersected = true
            this.beginLoad()
            this.teardownObserver()
            break
          }
        }
      }, { rootMargin: '200px' })
      this.io.observe(this.$el)
    },
    teardownObserver () {
      if (this.io) {
        this.io.disconnect()
        this.io = null
      }
    },

    beginLoad () {
      if (!this.hasSrc) return
      if (this.actualSrc === this.cacheSrc) return
      this.loading = true
      this.loaded_error = false
      this.$emit('loading')
      this.actualSrc = this.cacheSrc
    },

    onLoad () {
      const done = () => {
        this.loaded = true
        this.loading = false
        this.$emit('loaded')
        this.$emit('img-load', this.cacheSrc)
      }
      if (this.lazyDelay > 0) setTimeout(done, this.lazyDelay)
      else done()
    },

    onError () {
      const done = () => {
        this.loaded_error = true
        this.loaded = true
        this.loading = false
        if (this.hasErrorSrc) this.actualSrc = this.cache_error_src
        this.$emit('loaded-error')
      }
      if (this.lazyDelay > 0) setTimeout(done, this.lazyDelay)
      else done()
    },
    parseRatioToInts (val) {
    // accetta "16-9", "16/9", "16:9", 1.777..., {w:16,h:9} ecc.
    if (typeof val === 'string') {
      const s = val.replace(':','/').replace('-','/')
      const [ws, hs] = s.split('/')
      const w = parseFloat(ws), h = parseFloat(hs)
      if (Number.isFinite(w) && Number.isFinite(h) && w>0 && h>0) {
        return this.reduceToSmallInts(w, h)
      }
    } else if (typeof val === 'number' && isFinite(val) && val>0) {
      const base = 1000 // qualsiasi base va bene: serve solo il rapporto
      return { w: base, h: Math.round(base / val) }
    } else if (val && typeof val === 'object' && val.w && val.h) {
      return this.reduceToSmallInts(val.w, val.h)
    }
    return null
  },
  reduceToSmallInts (w, h) {
    // porta a interi e riduci col MCD (es. 1920/1080 -> 16/9)
    const scale = (n) => {
      const s = String(n)
      const dec = s.includes('.') ? (s.length - s.indexOf('.') - 1) : 0
      return { n: Math.round(n * Math.pow(10, dec)), p: dec }
    }
    const W = scale(w), H = scale(h)
    // allinea i decimali
    const p = Math.max(W.p, H.p)
    const wi = W.n * Math.pow(10, p - W.p)
    const hi = H.n * Math.pow(10, p - H.p)
    const g = this.gcd(wi, hi)
    return { w: Math.round(wi / g), h: Math.round(hi / g) }
  },
  gcd (a, b) { return b === 0 ? a : this.gcd(b, a % b) },

  onLoad (evt) {
    // ...mantieni la tua logica...
    // se non hai width/height e nemmeno ratio, salva le dimensioni naturali
    if (!this.width && !this.height && !this.local_ratio && evt?.target) {
      this.naturalW = evt.target.naturalWidth || null
      this.naturalH = evt.target.naturalHeight || null
    }
    // chiudi come prima
    const done = () => {
      this.loaded = true
      this.loading = false
      this.$emit('loaded')
      this.$emit('img-load', this.cacheSrc)
    }
    if (this.lazyDelay > 0) setTimeout(done, this.lazyDelay); else done()
  }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

/* L'immagine vera */
.bxs-img { display: block; }

/* Contenitore */
.figure {
  position: relative;
  display: block;
  width: 100%;
  background-color: var(--figure-background-color);
  overflow: hidden;
  transform: translateZ(0);
  will-change: transform;

  &.figure-rounded { border-radius: var(--figure-border-radius); }
  &.figure--full-height { height: 100%; }

  &.figure-empty > .figure--div { background-size: 50%; }

  /* ====== SUPPORTO RATIO (mixin) ======
     Il mixin imposta:
     - classi: .bxs-r, .bxs-r-<w>-<h>
     - variabili: --ratio-w, --ratio-h
     Qui trasformiamo le variabili in altezza reale del contenitore.
  */
  &.bxs-r {
    /* Modern browsers */
    aspect-ratio: var(--ratio-w) / var(--ratio-h);
  }

  /* Fallback per browser senza aspect-ratio */
  @supports not (aspect-ratio: 1 / 1) {
    &.bxs-r::before {
      content: "";
      display: block;
      width: 100%;
      padding-top: calc((var(--ratio-h) / var(--ratio-w)) * 100%);
      pointer-events: none;
      visibility: hidden;
    }
  }

  /* Placeholder LQIP (blur-up) */
  &--div {
    position: absolute;
    inset: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
    filter: blur(12px);
    transform: scale(1.02);
    transition: filter .3s ease, transform .3s ease;
  }
  &.figure-loaded > .figure--div {
    filter: none;
    transform: none;
  }

  /* Picture/Img occupano tutto il box ratio */
  &--picture,
  & > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &--picture > img,
  > img {
    position: absolute; /* opzionale, ma comodo */
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;     /* elimina gap di baseline */
    object-fit: cover;  /* niente bande */
  }

  /* se tieni anche il caso <figure> > img senza <picture>, mantieni pure: */
//   > img {
//     position: absolute;
//     inset: 0;
//     width: 100%;
//     height: 100%;
//     display: block;
//     object-fit: cover;
//   }

  &--overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    &::before,
    &::after {
      content: "";
      position: absolute; inset: 0;
      background-image: linear-gradient(
        to top,
        rgba(#000, 0.4) 0%,
        rgba(#fff, 0) 100%
      );
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &--content { position: absolute; inset: 0; z-index: 3; }

  &--loading {
    position: absolute; inset: 0;
    background-color: var(--figure-background-color);
    display: flex; flex-flow: column nowrap; justify-content: center;
    text-align: center; z-index: 4;
  }

  &--caption {
    position: absolute; left: 0; right: 0; bottom: 0;
    padding: .5rem .75rem; font-size: .875rem; line-height: 1.2;
    color: var(--figure-caption-color, #fff);
    text-shadow: 0 1px 2px rgba(0,0,0,.6); z-index: 5;
  }
}
</style>

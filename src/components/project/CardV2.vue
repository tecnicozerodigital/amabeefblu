<!-- CardSEO.vue -->
<template>
  <!-- un container semantico -->
  <article
    class="card-comp"
    :class="ratio_classes"
    :style="ratio_styles"
    itemscope
    :itemtype="schemaUrl"
  >
    <!-- LINK WRAPPER: un solo <a> o <RouterLink> per tutta la card -->
    <component :is="linkTag" v-bind="linkAttrs" class="card-comp__link">
      <figure class="card-comp__media">
        <picture>
          <source v-if="srcsetAvif" :srcset="srcsetAvif" type="image/avif" />
          <source v-if="srcsetWebp" :srcset="srcsetWebp" type="image/webp" />
          <img
            class="card-comp__img"
            :src="src"
            :srcset="srcset || null"
            :sizes="sizes || null"
            :alt="safeAlt"
            :width="intrinsicWidth || null"
            :height="intrinsicHeight || null"
            :loading="shouldLazy ? 'lazy' : 'eager'"
            :fetchpriority="priority ? 'high' : 'auto'"
            decoding="async"
            itemprop="image"
          />
        </picture>
        <!-- fallback per crawler senza JS (SSR consigliato comunque) -->
        <noscript>
          <img :src="src" :alt="safeAlt" />
        </noscript>
      </figure>

      <header class="card-comp--main">
        <div v-if="$mq?.from('ds')" class="card-comp--main--visible">
          <h4 class="text-ui text-500 text-uppercase mb-4 py-ui" style="font-size:.9rem" itemprop="name">
            {{ title }}
          </h4>
        </div>

        <div
          ref="content"
          class="anim card-comp--main--hidden py-ui"
          :style="$mq?.from('ds') ? {
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0, var(--color-${overlayBgColor}) 30%)`
          } : null"
        >
          <div :class="$mq?.from('ds') ? 'text-' + overlayTextColor : null">
            <h3 class="h6 text-ui text-500 text-uppercase mb-4" style="font-size:.95rem" itemprop="headline">
              {{ title }}
            </h3>
            <p v-if="text" class="small text-o-mute mb-4" itemprop="description">{{ text }}</p>

            <!-- per evitare <a> annidati: il "bottone" è uno span -->
            <span
              v-if="!hideButton"
              class="btn btn--sm"
              role="link"
              aria-hidden="true"
            >{{ btnLabel }}</span>
          </div>
        </div>
      </header>
    </component>
  </article>
</template>

<script>
// compat con Options API e tuo mixin "ratio"
import { ratio } from '@/mixins'

/* eslint-disable */

export default {
  name: 'CardSEO',
  mixins: [ratio],
  props: {
    // contenuto
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    title: { type: String, required: true },
    text: { type: String, default: '' },

    // link
    href: { type: String, default: null },
    to:   { type: [String, Object], default: null }, // RouterLink
    target: { type: String, default: '_self' },
    rel: { type: String, default: null },

    // bottone (visuale)
    btnLabel: { type: String, default: 'Visualizza' },
    hideButton: { type: Boolean, default: false },

    // look
    overlayBgColor: { type: String, default: 'background' },
    overlayTextColor: { type: String, default: 'typo' },

    // immagini responsive
    srcset: { type: String, default: '' },
    sizes: { type: String, default: '' },
    srcsetWebp: { type: String, default: '' },
    srcsetAvif: { type: String, default: '' },

    // performance
    lazy: { type: Boolean, default: true },
    priority: { type: Boolean, default: false },

    // intrinsic size (SEO/CLS). Se non passati, li ricavo dal ratio.
    width: { type: [Number, String], default: null },
    height: { type: [Number, String], default: null },
    autoSize: { type: Boolean, default: true },

    // SEO extras
    schemaType: { type: String, default: 'CreativeWork' },
    withSchema: { type: Boolean, default: true }
  },
  computed: {
    safeAlt () { return typeof this.alt === 'string' ? this.alt : '' },
    shouldLazy () { return this.lazy && !this.priority },

    // link rendering
    isRouter () { return !!this.to },
    linkTag () { return this.isRouter ? 'RouterLink' : 'a' },
    computedRel () {
      if (this.rel) return this.rel
      if (this.target === '_blank') return 'noopener noreferrer'
      return null
    },
    linkAttrs () {
      return this.isRouter
        ? { to: this.to, 'aria-label': this.title }
        : { href: this.href, target: this.target, rel: this.computedRel, 'aria-label': this.title }
    },

    // intrinsic size auto dal ratio se non specificato
    intrinsicWidth () {
      if (this.width) return Number(this.width)
      if (!this.autoSize) return null
      const r = this.local_ratio || this.ratio
      const p = this.parseRatio(r)
      return p ? p.w : null
    },
    intrinsicHeight () {
      if (this.height) return Number(this.height)
      if (!this.autoSize) return null
      const r = this.local_ratio || this.ratio
      const p = this.parseRatio(r)
      return p ? p.h : null
    },

    // schema.org
    schemaUrl () { return `https://schema.org/${this.schemaType}` },
    jsonLd () {
      // stringa già “safe” (niente indent per evitare spazi nel DOM)
      const obj = {
        '@context': 'https://schema.org',
        '@type': this.schemaType,
        headline: this.title,
        description: this.text || undefined,
        image: this.src,
        url: this.isRouter ? undefined : this.href
      }
      return JSON.stringify(obj)
    }
  },
  methods: {
    parseRatio (val) {
      if (!val) return null
      const s = String(val).replace(':','/').replace('-','/')
      const [ws, hs] = s.split('/')
      const w = parseFloat(ws); const h = parseFloat(hs)
      if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null
      // riduci ai minimi termini
      const gcd = (a,b)=> b===0?a:gcd(b,a%b)
      const scale = (n) => {
        const str = String(n)
        const dec = str.includes('.') ? (str.length - str.indexOf('.') - 1) : 0
        return Math.round(n * Math.pow(10, dec))
      }
      const wi = scale(w), hi = scale(h); const g = gcd(wi, hi)
      return { w: Math.round(wi / g), h: Math.round(hi / g) }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

.card-comp {
  position: relative;
  display: block;
  text-decoration: none;
  color: inherit;

  /* integra il tuo mixin ratio: .bxs-r + --ratio-w/--ratio-h */
  &.bxs-r { aspect-ratio: var(--ratio-w) / var(--ratio-h); }
  @supports not (aspect-ratio: 1 / 1) {
    &.bxs-r::before {
      content: ""; display: block; width: 100%;
      padding-top: calc((var(--ratio-h) / var(--ratio-w)) * 100%);
      visibility: hidden; pointer-events: none;
    }
  }

  /* link wrapper copre tutta la card (unico <a>) */
  &__link { position: absolute; inset: 0; display: block; }

  &__media,
  .card-comp__img,
  .card-comp--main {
    position: absolute; inset: 0;
  }

  &__media { z-index: 0; }
  .card-comp__img {
    width: 100%; height: 100%; display: block;
    object-fit: cover;
    transition: transform .2s ease-out;
  }

  /* Hover only where it’s supported */
  @media (hover: hover) {
    &:hover .card-comp__img { transform: scale(0.9); }
  }

  &--main {
    z-index: 2;
  }

  &--main--hidden {
    text-align: left;
    transition: transform .5s ease-out;

    @include mq($mq-static-breakpoint) {
      transform: translateY(100%);
      position: absolute; bottom: 0; left: 0;
      width: 100%; height: 50%;
      display: flex; flex-flow: column nowrap; justify-content: flex-end;
      z-index: 1;
    }
  }

  @media (hover: hover) {
    &:hover .card-comp--main--hidden {
      @include mq($mq-static-breakpoint) {
        transform: translateY(0); transition-duration: .3s;
      }
    }
  }
}

/* bottone visuale (no <a> annidato) */
.btn.btn--sm { display: inline-block; padding: .4rem .7rem; border-radius: .25rem; }
</style>

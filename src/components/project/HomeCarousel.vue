<template>
  <div
  data-scroll-anim-reveal="clip"
    class="carousel"
    role="region"
    aria-roledescription="carousel"
    :aria-label="ariaLabel"
    @mouseenter="pause"
    @mouseleave="play"
    @focusin="pause"
    @focusout="play"
  >
    <!-- Annunci per screen reader -->
    <p class="visually-hidden" aria-live="polite">
      Slide {{ activeIndex + 1 }} di {{ slides.length }}
    </p>

    <div
      :class="['viewport', clipClass]"
      ref="viewport"
      role="group"
      :aria-label="`Vista slide. Attuale: ${activeIndex + 1} di ${slides.length}`"
      tabindex="0"
      @keydown.left.prevent="prev"
      @keydown.right.prevent="next"
      @touchstart.passive="onTouchStart"
      @touchmove.prevent="onTouchMove"
      @touchend="onTouchEnd"
    >
      <ul
        class="track"
        ref="track"
        :style="{ '--gap': gap + 'px' }"
        :id="trackId"
      >
        <li
          v-for="(s,i) in slides"
          :key="i"
          class="slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${i+1} di ${slides.length}`"
          :aria-current="i === activeIndex ? 'true' : undefined"
        >
          <!-- Evita doppio download: usa <img> visibile invece di background-image -->
          <img
            class="slide-img"
            :src="s.src"
            :alt="s.alt || ''"
            :width="s.width || null"
            :height="s.height || null"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            draggable="false"
          />
          <figcaption v-if="s.caption" class="visually-hidden">{{ s.caption }}</figcaption>
        </li>
      </ul>
    </div>

    <div class="controls">
      <button
        type="button"
        class="prev"
        @click="prev"
        aria-label="Slide precedente"
        :aria-controls="trackId"
        :aria-disabled="animating || !canLoop"
      >
        ‹
      </button>
      <button
        type="button"
        class="next"
        @click="next"
        aria-label="Slide successiva"
        :aria-controls="trackId"
        :aria-disabled="animating || !canLoop"
      >
        ›
      </button>
    </div>

    <!-- ClipPath (se usi .clip-main) -->
    <svg width="0" height="0" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <clipPath id="myClip" clipPathUnits="objectBoundingBox">
        <path d="M0 0.578143V0H0.298507C0.725373 0.027027 0.958209 0.27027 1 0.518214V1H0.147761V0.694477H0.061194V0.578143H0Z"/>
      </clipPath>
    </svg>
  </div>
</template>

<script>
import { gsap } from 'gsap'

/* eslint-disable */

export default {
  name: 'Carousel',
  props: {
    'clip-class': {
        type: String,
        required: false,
        default: 'clip-main'
    },
    slides: { type: Array, required: true },
    slidesToShow: { type: Number, default: 2 },
    slidesToScroll: { type: Number, default: 1 }, // quante slide per step
    gap: { type: Number, default: 0 },            // px tra slide
    autoplay: { type: Boolean, default: false },
    interval: { type: Number, default: 3000 },    // ms
    speed: { type: Number, default: 1 },        // ⬅️ secondi (coerente ovunque)
    easing: { type: String, default: 'expo.inOut' },
    ariaLabel: { type: String, default: 'Galleria immagini' },
    idBase: { type: String, default: 'carousel' } // per aria-controls
  },
  data () {
    return {
      activeIndex: 0,
      w: 0,
      slideW: 0,
      step: 0,
      timer: null,
      animating: false,
      dragging: false,
      dragStartX: 0,
      dragTrackX0: 0,
      _setX: null,             // gsap.quickSetter per performance
      _ro: null,               // ResizeObserver
      _uid: Math.random().toString(36).slice(2)
    }
  },
  computed: {
    canLoop () { return this.slides.length > this.slidesToShow },
    trackId () { return `${this.idBase}-${this._uid}-track` }
  },
  mounted () {
    this.$nextTick(() => {
      this.measure()
      window.addEventListener('resize', this.measure, { passive: true })
      document.addEventListener('visibilitychange', this.onVisibility)
      // ResizeObserver per container responsive (non solo window)
      if ('ResizeObserver' in window && this.$refs.viewport) {
        this._ro = new ResizeObserver(() => this.measure())
        this._ro.observe(this.$refs.viewport)
      }
      if (this.autoplay) this.play()
    })
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.measure)
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.pause()
    if (this._ro) { this._ro.disconnect(); this._ro = null }
  },
  methods: {
    // utils
    _children () { return Array.from(this.$refs.track?.children || []) },

    measure () {
      const vp = this.$refs.viewport
      const track = this.$refs.track
      if (!vp || !track) return

      this.w = vp.clientWidth
      this.slideW = (this.w - this.gap * (this.slidesToShow - 1)) / this.slidesToShow
      this.step = this.slideW + this.gap

      // dimensiona e resetta posizione
      const slidesEls = this._children()
      gsap.set(slidesEls, { width: this.slideW, force3D: true })
      gsap.set(track, { x: 0, force3D: true })
      this.activeIndex = 0

      // quickSetter per x, super economico per drag
      this._setX = gsap.quickSetter(track, 'x', 'px')

      if (!this.canLoop) {
        // se non possiamo loopare, disabilita autoplay
        this.pause()
      }
    },

    // autoplay
    play () {
      if (this.autoplay && this.canLoop) {
        this.pause()
        this.timer = setInterval(() => this.next(), this.interval)
      }
    },
    pause () { if (this.timer) { clearInterval(this.timer); this.timer = null } },
    onVisibility () { document.hidden ? this.pause() : this.play() },

    // controlli
    next () { this._slideBy(+1) },
    prev () { this._slideBy(-1) },

    _slideBy (direction) {
      if (this.animating || !this.canLoop) return

      const len = this.slides.length
      const stepCount = Math.max(1, Math.min(this.slidesToScroll, len))
      const track = this.$refs.track
      const dist = this.step * stepCount

      this.animating = true
      gsap.killTweensOf(track)

      const slidesEls = this.$refs.track.querySelectorAll(".slide");
        const tl = gsap.timeline();

        tl
        .to(slidesEls, {
            scale: 1.5,
            duration: 0.5,
            // opacity: 0.5,
            ease: 'expo.in'
        })
        .to(slidesEls, {
            scale: 1,
            duration: 0.7,
            // opacity: 1,
            ease: 'expo.out'
        })

      if (direction > 0) {
        // NEXT: animo, poi riciclo
        gsap.to(track, {
          x: `-=${dist}`,
          duration: this.speed,
          ease: this.easing,
          force3D: true,
          onComplete: () => {
            for (let i = 0; i < stepCount; i++) {
              const first = track.firstElementChild
              track.appendChild(first)
            }
            gsap.set(track, { x: `+=${dist}` })
            this.activeIndex = (this.activeIndex + stepCount) % len
            this.animating = false
          }
        })
      } else {
        // PREV: riciclo subito, poi animo indietro
        for (let i = 0; i < stepCount; i++) {
          const last = track.lastElementChild
          track.insertBefore(last, track.firstElementChild)
        }
        gsap.set(track, { x: `-=${dist}` })
        gsap.to(track, {
          x: `+=${dist}`,
          duration: this.speed,
          ease: this.easing,
          force3D: true,
          onComplete: () => {
            this.activeIndex = (this.activeIndex - stepCount + len) % len
            this.animating = false
          }
        })
      }
    },

    // Swipe touch
    onTouchStart (e) {
      if (!this.canLoop) return
      this.pause()
      this.dragging = true
      this.dragStartX = e.touches[0].clientX
      this.dragTrackX0 = parseFloat(gsap.getProperty(this.$refs.track, 'x')) || 0
      gsap.killTweensOf(this.$refs.track)
    },
    onTouchMove (e) {
      if (!this.dragging) return
      const delta = e.touches[0].clientX - this.dragStartX
      ;(this._setX || gsap.set)(this.$refs.track, { x: this.dragTrackX0 + delta })
    },
    onTouchEnd () {
      if (!this.dragging) return
      this.dragging = false

      const currentX = parseFloat(gsap.getProperty(this.$refs.track, 'x')) || 0
      const moved = currentX - this.dragTrackX0

      if (Math.abs(moved) > this.step * 0.2) {
        moved < 0 ? this.next() : this.prev()
      } else {
        gsap.to(this.$refs.track, {
          duration: this.speed,       // ← seconds (coerente)
          x: this.dragTrackX0,
          ease: this.easing,
          force3D: true
        })
      }

      if (this.autoplay) this.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
    position: relative;
    width: 100%;
    height: 100%;
    // height: calc(var(--vh) * 100);
}

.viewport {
  overflow: hidden;
  width: 100%;
  height: 100%;
  /* Se vuoi usare il clipPath definito sopra */
  /* clip-path: url(#myClip); */
}

.track {
  display: flex;
  gap: var(--gap, 0px);
  touch-action: pan-y;      /* consenti scroll verticale pagina su swipe verticale */
  will-change: transform;
  transform: translate3d(0,0,0);
}

.slide {
  flex: 0 0 auto;
  height: 100vh;
  overflow: hidden;
  background: #000;         /* fallback */
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;           /* evita gap inline */
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

/* Controlli */
.controls {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: var(--navbar-height);
  display: flex;
  gap: var(--size-ui);
  align-items: center;
  justify-content: center;
  pointer-events: none;
//   border: 1px solid red;
}
.controls button {
  pointer-events: auto;
  background: var(--color-fourth, #fff);
  color: var(--color-tertiary, #000);
  border: 0;
  width: 25px;
  height: 25px;
//   font-size: 1rem;
  border-radius: 999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
}

/* Visually hidden (per sr-only) */
.visually-hidden {
  position: absolute !important;
  width: 1px; height: 1px;
  margin: -1px; padding: 0; border: 0;
  overflow: hidden; clip: rect(0 0 0 0);
  white-space: nowrap; clip-path: inset(50%);
}
</style>

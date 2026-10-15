<template>
  <div ref="gallery" id="gallery-root" class="gallery-root">
    <!-- Indicatore iniziale (solo hint visivo) -->
    <div v-if="showIndicator" class="big-title">
      <div>
        <span>{{ title }}</span>
        <img src="/img/grab-icon.png" alt="" />
      </div>
    </div>

    <div class="container" ref="container" :class="{ 'is-blurry': showIndicator }">
      <div class="canvas" ref="canvas">
        <!-- Virtualizzazione: solo le celle visibili -->
        <div
          v-for="cell in visibleCells"
          :key="cell.id"
          v-memo="[cell.id]"
          class="item"
          :id="cell.id"
          :data-col="cell.col"
          :data-row="cell.row"
          :style="cell.styleText"
          @click="onItemClick(cell)"
        >
          <div class="item-image-container">
            <img
              :src="cell.img"
              :alt="`Image ${cell.idx + 1}`"
              :width="cell.size.width"
              :height="cell.size.height"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import { gsap } from 'gsap'

/* eslint-disable */

export default {
  name: 'bxs_infinite_grid',

  props: {
    title: { type: String, default: 'Tieni premuto e trascina per esplorare' },
    items: {
      type: Array,
      default: () => [
        'Chromatic Loopscape','Solar Bloom','Neon Handscape','Echo Discs','Void Gaze',
        'Gravity Sync','Heat Core','Fractal Mirage','Nova Pulse','Sonic Horizon',
        'Dream Circuit','Lunar Mesh','Radiant Dusk','Pixel Drift','Vortex Bloom',
        'Shadow Static','Crimson Phase','Retro Cascade','Photon Fold','Zenith Flow'
      ]
    },
    imageUrls: {
      type: Array,
      default: () => [
        '/img/hero-r.jpg','/img/hero.jpg','/img/sala.jpg','/img/1.jpg','/img/2.jpg',
        '/img/3.jpg','/img/4.jpg','/img/5.jpg','/img/6.jpg','/img/7.jpg','/img/8.jpg'
      ]
    },
    settings: {
      type: Object,
      default: () => ({
        // Misure base
        baseWidth: 768, // 384 mobile,
        smallHeight: 300,
        largeHeight: 500,
        itemGap: 120,
        borderRadius: 0,

        // Feeling / animazione
        hoverScale: 1,
        dragEase: 0.10,
        /**
         quanto “lontano” l’inerzia ti lancia quando rilasci.
         Interazione con dragEase: più dragEase è alto, più l’inerzia “si spegne” in fretta (atterra presto).
         Con dragEase basso l’effetto dura di più.
        */
        momentumFactor: 300,
        /**
            quanta area extra renderizzi intorno al viewport per evitare pop-in quando ti muovi veloce.
            più alto = meno pop-in ma più DOM/RAM;
            più basso = più leggero ma potresti vedere comparire le card al bordo durante uno “sparo”.
            - 0.25–0.75 per la maggior parte dei casi.
            - Sali verso 1.0 se fai “fling” molto forti o su schermi grandi.
            - Scendi a 0–0.25 su device deboli.
         */
        bufferZone: 0.5,

        // Ratio multipli (se vuoto → fallback small/large)
        ratios: ['2/3', '4/3'], // ['2/3','4/3']

        /**
            auto
                Sceglie in automatico in base al device:
                su dispositivi touch (pointer: coarse): usa press
                su mouse/desktop: usa always
                Utile se vuoi un comportamento “intelligente” unico per tutti i device.

            press (tieni premuto → poi trascina)
                Il drag si arma solo dopo un breve hold.
                Durata dell’hold: dragHoldMs (es. 250–400 ms)
                Se ti muovi prima dell’hold oltre dragMoveThreshold px, non armi il drag (interpretiamo come intento di scorrere la pagina).
                È la scelta migliore su mobile perché non “ruba” gesti allo scroll della pagina.

            always (trascina subito)
                Appena premi e muovi, drag immediato (niente hold).
                Perfetto su desktop, ma su mobile può entrare in conflitto con lo scroll pagina se l’utente inizia il gesto sopra la gallery.

            off
                Disattiva il drag via puntatore. La gallery si può muovere solo con altri input (wheel/tastiera), se abilitati.

            Nota: se interaction.pointer è impostato e diverso da 'auto', sovrascrive dragActivation.

            Parametri collegati
            dragHoldMs: millisecondi di pressione necessari in modalità press per armare il drag.
            dragMoveThreshold: px di tolleranza prima dell’hold; se li superi, consideriamo il gesto come scroll e non armiamo il drag.
        */
        // Attivazione drag
        dragActivation: 'auto',      // 'auto' | 'press' | 'always' | 'off'
        dragHoldMs: 300,            // millisecondi di pressione necessari in modalità press per armare il drag.
        dragMoveThreshold: 100,      // px di tolleranza prima dell’hold; se li superi, consideriamo il gesto come scroll e non armiamo il drag.

        // Mini-API interazione
        interaction: {
          pointer: 'auto',           // 'auto' | 'press' | 'always' | 'off'
          /*
            off: la rotellina non muove la gallery.
            x: wheel muove solo in orizzontale (X).
            y: wheel muove solo in verticale (Y).
            xy: wheel muove su entrambi gli assi.
        */
          wheel: 'off',
          wheelSpeed: 1,              // se true, tenendo Shift scambi X ↔ Y
          wheelInvert: false,         // inverte la direzione
          wheelShiftSwap: true,       // se true, tenendo Shift scambi X ↔ Y
          keyboard: 'off',            // 'off' || 'arrows' (abilita frecce ← → ↑ ↓)
          keyStepRatio: 0.5          // frazione di cellWidth/cellHeight spostata per ogni pressione (es. 0.25 = 25% di una cella).
        },

        // Anti-jank
        pixelSnap: true
      })
    }
  },

  data () {
    return {
      // Griglia
      itemSizes: [],
      columns: 4,
      cellWidth: 0,
      cellHeight: 0,

      // Virtualizzazione
      visibleCells: [],
      _win: { sc: 0, ec: 0, sr: 0, er: 0 },

      // Drag / momentum
      isDragging: false,
      dragArmed: false,
      canDrag: true,
      startX: 0, startY: 0,
      targetX: 0, targetY: 0,
      currentX: 0, currentY: 0,
      dragVX: 0, dragVY: 0,
      lastDragTime: 0,
      mouseHasMoved: false,

      // Press detection
      _pressTimer: null,
      _pressStart: { x: 0, y: 0 },
      isCoarsePointer: false,
      _dragMode: 'press',

      // Loop on-demand
      raf: 0,
      _movingFrames: 0,

      // Input opzionali
      _wheelBound: false,
      _keyBound: false,

      // Throttle virtualizzazione
      _lastVUtime: 0,
      _lastVUX: 0,
      _lastVUY: 0,

      // Debounce resize
      _rt: null,

      // UI
      showIndicator: true,
      shift: false
    }
  },

  computed: {
    itemCount () { return this.items.length }
  },

  mounted () {
    // Touch vs Mouse (per default 'auto')
    this.isCoarsePointer = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)

    // Determina la modalità pointer (nuovo setting → fallback legacy → auto)
    const inter = this.settings.interaction || {}
    if (inter.pointer && inter.pointer !== 'auto') {
      this._dragMode = inter.pointer
    } else if (this.settings.dragActivation === 'auto') {
      this._dragMode = this.isCoarsePointer ? 'press' : 'always'
    } else {
      this._dragMode = this.settings.dragActivation || (this.isCoarsePointer ? 'press' : 'always')
    }

    // Setup iniziale
    this.recomputeSizes()
    this.updateBorderRadius()
    this.updateHoverScale()
    this.maybeUpdateCells(true)

    // bind dopo patch DOM (ref-safe)
    this.$nextTick(() => { this.bindEvents() })
  },

  beforeUnmount () {
    this.stopLoop()
    this.unbindEvents()
    clearTimeout(this._pressTimer)
    clearTimeout(this._rt)
  },

  watch: {
    'settings.interaction': {
      handler () { this.rebindOptionalInputs() },
      deep: true
    }
  },

  methods: {
    /* ---------- Helpers ref-safe ---------- */
    getContainer () { return this.$refs?.container || null },
    getCanvas () { return this.$refs?.canvas || null },

    /* ---------- UI: indicatore ---------- */
    openGallery () { this.hideIndicator() },
    hideIndicator () {
      if (!this.showIndicator) return
      this.showIndicator = false
      const el = this.getContainer(); if (!el) return
      if (getComputedStyle(el).filter !== 'none') {
        gsap.to(el, {
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'expo.out',
          onComplete: () => gsap.set(el, { clearProps: 'filter' })
        })
      }
    },

    /* ---------- Misure & stile ---------- */
    setCSSVar (name, val) { document.documentElement.style.setProperty(name, val) },
    updateBorderRadius () { this.setCSSVar('--border-radius', `${this.settings.borderRadius}px`) },
    updateHoverScale () { this.setCSSVar('--hover-scale', this.settings.hoverScale) },

    normalizeRatio (r) {
      if (typeof r === 'number' && isFinite(r) && r > 0) return r
      if (typeof r === 'string') {
        const m = r.trim().match(/^(\d+(?:\.\d+)?)\s*[/:\s]\s*(\d+(?:\.\d+)?)$/)
        if (m) { const w = +m[1], h = +m[2]; if (w>0 && h>0) return w/h }
        const n = parseFloat(r); if (isFinite(n) && n > 0) return n
      }
      if (r && typeof r === 'object' && 'w' in r && 'h' in r) {
        const w = +r.w, h = +r.h; if (w>0 && h>0) return w/h
      }
      return null
    },

    recomputeSizes () {
      const ratiosRaw = Array.isArray(this.settings.ratios) ? this.settings.ratios : []
      const ratios = ratiosRaw.map(this.normalizeRatio).filter(v => typeof v === 'number' && isFinite(v) && v > 0)

      if (ratios.length) {
        this.itemSizes = ratios.map(r => ({
          width: this.settings.baseWidth,
          height: Math.round(this.settings.baseWidth / r)
        }))
      } else {
        this.itemSizes = [
          { width: this.settings.baseWidth, height: this.settings.smallHeight },
          { width: this.settings.baseWidth, height: this.settings.largeHeight }
        ]
      }

      this.cellWidth  = this.settings.baseWidth + this.settings.itemGap
      this.cellHeight = Math.max(...this.itemSizes.map(s => s.height)) + this.settings.itemGap
    },

    getItemSize (row, col) {
      const idx = Math.abs((row * this.columns + col) % this.itemSizes.length)
      return this.itemSizes[idx]
    },
    getItemId (col, row) { return `${col},${row}` },
    getItemPos (col, row) { return { x: col * this.cellWidth, y: row * this.cellHeight } },

    /* ---------- Virtualizzazione ---------- */
    getWindow () {
      const buffer = Math.max(0, Math.min(3, this.settings.bufferZone || 0))
      const vw = window.innerWidth  * (1 + buffer)
      const vh = window.innerHeight * (1 + buffer)
      return {
        sc: Math.floor((-this.currentX - vw / 2)  / this.cellWidth),
        ec: Math.ceil  ((-this.currentX + vw * 1.5) / this.cellWidth),
        sr: Math.floor((-this.currentY - vh / 2)  / this.cellHeight),
        er: Math.ceil  ((-this.currentY + vh * 1.5) / this.cellHeight)
      }
    },

    maybeUpdateCells (force = false) {
      const w = this.getWindow()
      const last = this._win
      const changed = force || w.sc!==last.sc || w.ec!==last.ec || w.sr!==last.sr || w.er!==last.er
      if (!changed) return
      this._win = w
      this.buildVisibleCells(w)
      // Se devi misurare/animare i nuovi nodi, usa this.$nextTick(...)
    },

    buildVisibleCells (w) {
      const next = []
      for (let row = w.sr; row <= w.er; row++) {
        for (let col = w.sc; col <= w.ec; col++) {
          const id = this.getItemId(col, row)
          const size = this.getItemSize(row, col)
          const pos  = this.getItemPos(col, row)
          const idx  = Math.abs((row * this.columns + col) % this.itemCount)
          const styleText = `position:absolute;left:${pos.x}px;top:${pos.y}px;width:${size.width}px;height:${size.height}px;border-radius:var(--border-radius);`
          next.push({ id, col, row, size, pos, idx, img: this.imageUrls[idx % this.imageUrls.length], styleText })
        }
      }
      if (next.length !== this.visibleCells.length || next.some((c, i) => this.visibleCells[i]?.id !== c.id)) {
        this.visibleCells = next
      }
    },

    /* ---------- Interazioni: elementi ---------- */
    onItemClick () { /* hook libero per futuro */ },

    /* ---------- Interazioni: pointer (press/always/off) ---------- */
    onPointerDown (e) {
        console.log('[InfiniteGrid] onPointerDown()')
      if (!this.canDrag) return
      if (e.button !== undefined && e.button !== 0) return // solo click primario
      const c = this.getContainer(); if (!c) return
      try { c.setPointerCapture?.(e.pointerId) } catch {}

      this.isDragging = true
      this.mouseHasMoved = false
      this.startX = e.clientX; this.startY = e.clientY
      this._pressStart = { x: e.clientX, y: e.clientY }

      if (this._dragMode === 'off') { this.isDragging = false; return }
      if (this._dragMode === 'always') {
        clearTimeout(this._pressTimer); this.armDrag()
      } else {
        clearTimeout(this._pressTimer)
        this._pressTimer = setTimeout(() => { if (!this.dragArmed) this.armDrag() }, this.settings.dragHoldMs || 200)
      }
    },

    onPointerMove (e) {
        console.log('[InfiniteGrid] onPointerMove()')
      if (!this.isDragging) return

      // non armato: movimento prima dell'hold ⇒ intento scroll
      if (!this.dragArmed) {
        const dx0 = e.clientX - this._pressStart.x
        const dy0 = e.clientY - this._pressStart.y
        if (Math.abs(dx0) > this.settings.dragMoveThreshold || Math.abs(dy0) > this.settings.dragMoveThreshold) {
          this.cancelPress()
        }
        return
      }

      // drag armato
      const dx = e.clientX - this.startX
      const dy = e.clientY - this.startY
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) this.mouseHasMoved = true

      const now = Date.now()
      const dt = Math.max(10, now - this.lastDragTime)
      this.lastDragTime = now
      this.dragVX = dx / dt
      this.dragVY = dy / dt

      this.targetX += dx; this.targetY += dy
      this.startX = e.clientX; this.startY = e.clientY
      this.startLoop()
    },

    onPointerUp () {
        console.log('[InfiniteGrid] onPointerUp()')
      clearTimeout(this._pressTimer)

      if (this.dragArmed) {
        const v = Math.hypot(this.dragVX, this.dragVY)
        if (v > 0.12) {
          const m = Math.min(this.settings.momentumFactor, 260)
          this.targetX += this.dragVX * m
          this.targetY += this.dragVY * m
          this.startLoop()
        }
      }
      this.dragVX = 0; this.dragVY = 0

      this.disarmDrag()
      this.isDragging = false
    },

    armDrag () {
        console.log('[InfiniteGrid] armDrag()')
      if (this.dragArmed) return
      const c = this.getContainer(); if (!c) return
      this.dragArmed = true
      c.classList.add('drag-active', 'grabbing')
      c.style.cursor = 'grabbing'
      this.hideIndicator()
      if (navigator.vibrate) { try { navigator.vibrate(10) } catch {} }

      if (this.$root.scroll) {
        console.log('[InfiniteGrid] scrollStop()')
        // this.$root.scroll.scrollTo('#gallery-root')
        this.$root.scroll.stop()
        this.$root.nav.hide = true
        this.$root.nav.on = false
      }
    },

    disarmDrag () {
        console.log('[InfiniteGrid] disarmDrag()')
      const c = this.getContainer(); if (!c) return
      this.dragArmed = false
      c.classList.remove('drag-active', 'grabbing')
      c.style.cursor = 'grab'
      if (this.$root.scroll) {
        console.log('[InfiniteGrid] startScroll()')
        this.$root.scroll.start()
      }
    },

    cancelPress () {
      clearTimeout(this._pressTimer)
      this.dragArmed = false
      const c = this.getContainer(); if (!c) return
      c.classList.remove('drag-active')
    },

    /* ---------- Interazioni opzionali ---------- */
    rebindOptionalInputs () {
      const inter = this.settings.interaction || {}
      if (inter.wheel && inter.wheel !== 'off') this.bindWheel()
      else this.unbindWheel()
      if (inter.keyboard === 'arrows') this.bindKeyboard()
      else this.unbindKeyboard()
    },

    bindWheel () {
      if (this._wheelBound) return
      const c = this.getContainer(); if (!c) return
      c.addEventListener('wheel', this.onWheel, { passive: false })
      this._wheelBound = true
    },
    unbindWheel () {
      if (!this._wheelBound) return
      const c = this.getContainer(); if (c) c.removeEventListener('wheel', this.onWheel)
      this._wheelBound = false
    },

    onWheel (e) {
        console.log('[InfiniteGrid] onWheel()')

      const inter = this.settings.interaction || {}
      const mode = inter.wheel || 'off'
      if (mode === 'off') return

      e.preventDefault()

      const unit = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? window.innerHeight : 1)
      let dx = e.deltaX * unit
      let dy = e.deltaY * unit

      const swap = inter.wheelShiftSwap !== false && e.shiftKey
      if (swap) [dx, dy] = [dy, dx]

      if (mode === 'x') { dy = 0; if (dx === 0) dx = dy }
      else if (mode === 'y') { dx = 0; if (dy === 0) dy = dx }

      const sgn = inter.wheelInvert ? -1 : 1
      const speed = inter.wheelSpeed ?? 1

      this.targetX += (dx * sgn * speed)
      this.targetY += (dy * sgn * speed)
      this.hideIndicator()
      this.startLoop()
    },

    bindKeyboard () {
      if (this._keyBound) return
      window.addEventListener('keydown', this.onArrowKeys)
      this._keyBound = true
    },
    unbindKeyboard () {
      if (!this._keyBound) return
      window.removeEventListener('keydown', this.onArrowKeys)
      this._keyBound = false
    },

    onArrowKeys (e) {
        console.log('[InfiniteGrid] onArrowKeys()')

      const inter = this.settings.interaction || {}
      if (inter.keyboard !== 'arrows') return
      const stepX = this.cellWidth  * (inter.keyStepRatio ?? 0.25)
      const stepY = this.cellHeight * (inter.keyStepRatio ?? 0.25)
      let used = false
      switch (e.key) {
        case 'ArrowLeft':  this.targetX += stepX; used = true; break
        case 'ArrowRight': this.targetX -= stepX; used = true; break
        case 'ArrowUp':    this.targetY += stepY; used = true; break
        case 'ArrowDown':  this.targetY -= stepY; used = true; break
      }
      if (used) { e.preventDefault(); this.hideIndicator(); this.startLoop() }
    },

    onShift (e) {
        console.log('[InfiniteGrid] onShift()')
        this.shift = e.shiftKey
    },

    /* ---------- Loop / Animazione ---------- */
    startLoop () {
      if (!this.raf) {
        const cv = this.getCanvas(); if (cv) cv.style.willChange = 'transform'
        this.raf = requestAnimationFrame(this.animate)
      }
    },

    stopLoop () {
      if (this.raf) {
        cancelAnimationFrame(this.raf)
        this.raf = 0
        const cv = this.getCanvas(); if (cv) cv.style.willChange = 'auto'
      }
    },

    animate () {
        console.log('[InfiniteGrid] animate()')
      const e   = this.settings.dragEase
      const eps = 0.35 // soglia snap

      const dx = this.targetX - this.currentX
      const dy = this.targetY - this.currentY

      // Ease + snap
      this.currentX = Math.abs(dx) <= eps ? this.targetX : (this.currentX + dx * e)
      this.currentY = Math.abs(dy) <= eps ? this.targetY : (this.currentY + dy * e)

      // Trasform con pixelSnap opzionale
      const snap = v => this.settings.pixelSnap ? Math.round(v) : v
      const cv = this.getCanvas()
      if (cv) cv.style.transform = `translate3d(${snap(this.currentX)}px, ${snap(this.currentY)}px, 0)`

      // Throttle ricostruzione finestra
      const now = performance.now()
      const dist = Math.hypot(this.currentX - this._lastVUX, this.currentY - this._lastVUY)
      if (dist > 60 || (now - this._lastVUtime) > 100) {
        this.maybeUpdateCells()
        this._lastVUX = this.currentX; this._lastVUY = this.currentY; this._lastVUtime = now
      }

      // Loop finché ci si muove
      const moving = (Math.abs(this.targetX - this.currentX) > eps) || (Math.abs(this.targetY - this.currentY) > eps)
      if (moving) {
        this.raf = requestAnimationFrame(this.animate)
      } else {
        // Atterra e spegni pulito
        this.currentX = this.targetX
        this.currentY = this.targetY
        if (cv) cv.style.transform = `translate3d(${snap(this.currentX)}px, ${snap(this.currentY)}px, 0)`
        this.stopLoop()
      }
    },

    /* ---------- Binding eventi ---------- */
    bindEvents () {
      const c = this.getContainer(); if (!c) return
      c.addEventListener('pointerdown', this.onPointerDown)
      window.addEventListener('pointermove', this.onPointerMove)
      window.addEventListener('pointerup',   this.onPointerUp)
      window.addEventListener('pointercancel', this.onPointerUp)

      this.rebindOptionalInputs()

      c.style.overscrollBehavior = 'contain'
      window.addEventListener('resize', this.onResize)
      window.addEventListener('keydown', this.onShift)
      window.addEventListener('keyup',   this.onShift)
    },

    unbindEvents () {
      const c = this.getContainer()
      if (c) c.removeEventListener('pointerdown', this.onPointerDown)
      window.removeEventListener('pointermove', this.onPointerMove)
      window.removeEventListener('pointerup',   this.onPointerUp)
      window.removeEventListener('pointercancel', this.onPointerUp)

      this.unbindWheel()
      this.unbindKeyboard()

      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('keydown', this.onShift)
      window.removeEventListener('keyup',   this.onShift)
    },

    /* ---------- Misc ---------- */
    onResize () {
        console.log('[InfiniteGrid] onResize')
      clearTimeout(this._rt)
      this._rt = setTimeout(() => {
        this.recomputeSizes()
        this.maybeUpdateCells(true)
      }, 120)
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  --border-radius: 0px;
  --hover-scale: 1.05;
}

/* Wrapper pieno schermo */
.gallery-root {
  width: 100vw;
  height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  user-select: none;
}

/* Area interattiva della gallery */
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  /* Default: la pagina può scorrere verticalmente */
  touch-action: pan-y pinch-zoom;
  transition: filter 0.5s ease-out;
}
.container.is-blurry { filter: blur(4px); }
.container.grabbing  { cursor: grabbing; }

/* Canvas spostata via transform */
.canvas {
  position: absolute;
  left: 0; top: 0;
  transform: translate3d(0,0,0);
  /* will-change viene attivato/disattivato via JS durante il movimento */
}

/* Card (niente content-visibility per evitare jank al fermo) */
.item {
  position: absolute;
  overflow: hidden;
  background: #000;
  border-radius: var(--border-radius);
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: auto;
}
.item-image-container { width:100%; height:100%; overflow:hidden; position:relative; }
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  transition: transform 0.3s ease;
  backface-visibility: hidden;
  transform: translateZ(0);
}
.item:hover img { transform: scale(var(--hover-scale)); }

/* Durante il drag: disabilita i gesti nativi solo allora */
.container.drag-active,
.container.drag-active .item,
.container.drag-active .item-image-container {
  touch-action: none !important;
}

/* Indicatore iniziale */
.big-title {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none; z-index: 1;
  text-align: center; font-size: 21px; font-weight: 400; text-transform: lowercase;
}
.big-title > div {
  display: inline-block;
  background: none;
}
.big-title > div > span { display:block; margin-bottom: 0.2rem; }
.big-title > div > img { max-width: 21px; }
</style>

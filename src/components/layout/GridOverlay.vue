<template>
  <!-- Bottone toggle -->
  <button
    v-if="showToggle"
    class="go-toggle"
    type="button"
    @click="toggle"
    :aria-pressed="visible"
    :title="`Grid ${visible ? 'ON' : 'OFF'} (Ctrl/Cmd + ;)`"
  >
    {{ visible ? 'Grid: ON' : 'Grid: OFF' }}
  </button>

  <!-- Overlay griglia -->
  <div
    v-show="visible"
    class="go-overlay"
    :style="overlayStyle"
    aria-hidden="true"
  >
    <!-- Baseline opzionale -->
    <div v-if="showBaseline" class="go-baseline" :style="baselineStyle"></div>

    <!-- Container centrato con max-width -->
    <div class="go-container" :style="containerStyle">
      <!-- Colonne -->
      <div class="go-columns" :style="columnsStyle">
        <div
          v-for="i in columns"
          :key="i"
          class="go-col"
          :style="colStyle"
        >
          <span v-if="showColIndex" class="go-col-index">{{ i }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const STORAGE_KEY = '__grid_overlay_visible__'

export default {
  name: 'GridOverlay',

  props: {
    // layout
    columns: { type: Number, default: 12 },
    gutter: { type: Number, default: 1.5 }, // rem tra colonne
    containerMaxWidth: { type: [Number, String], default: '100%' }, // px o '100%'
    paddingX: { type: Number, default: 1 },
    // stile colonne
    colColor: { type: String, default: '#4f46e5' },
    colOpacity: { type: Number, default: 0.12 },
    // baseline
    showBaseline: { type: Boolean, default: false },
    baselineStep: { type: Number, default: 8 },
    baselineColor: { type: String, default: '#111827' },
    baselineOpacity: { type: Number, default: 0.08 },
    // overlay
    overlayZ: { type: Number, default: 9999 },
    overlayOpacity: { type: Number, default: 1 },
    // UI
    defaultVisible: { type: Boolean, default: false },
    showToggle: { type: Boolean, default: true },
    showColIndex: { type: Boolean, default: false }
  },

  data () {
    return {
      visible: this.defaultVisible
    }
  },

  mounted () {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== null) this.visible = saved === '1'
    } catch (_) {}

    window.addEventListener('keydown', this.onKey)
  },

  beforeUnmount () {
    window.removeEventListener('keydown', this.onKey)
  },

  computed: {
    overlayStyle () {
      return {
        zIndex: String(this.overlayZ),
        opacity: String(this.overlayOpacity)
      }
    },
    containerStyle () {
      return {
        maxWidth: typeof this.containerMaxWidth === 'number' ? `${this.containerMaxWidth}px` : String(this.containerMaxWidth),
        // paddingLeft: `${this.paddingX}rem`,
        // paddingRight: `${this.paddingX}rem`
      }
    },
    columnsStyle () {
      return {
        display: 'grid',
        gridTemplateColumns: `repeat(${this.columns}, 1fr)`,
        // columnGap: `${this.gutter}rem`,
        height: '100%'
      }
    },
    colStyle () {
      return {
        background: this.colColor,
        opacity: String(this.colOpacity),
        borderRadius: '2px',
        height: '100%',
        position: 'relative'
      }
    },
    baselineStyle () {
      return {
        backgroundImage: `repeating-linear-gradient(
          to bottom,
          ${this.baselineColor},
          ${this.baselineColor} 1px,
          transparent 1px,
          transparent ${this.baselineStep}px
        )`,
        opacity: String(this.baselineOpacity)
      }
    }
  },

  methods: {
    toggle () {
      this.visible = !this.visible
      try {
        localStorage.setItem(STORAGE_KEY, this.visible ? '1' : '0')
      } catch (_) {}
    },
    onKey (e) {
      // Ctrl+; o Cmd+;
      if ((e.ctrlKey || e.metaKey) && e.key === ';') {
        e.preventDefault()
        this.toggle()
      }
    }
  }
}
</script>

<style scoped>
.go-toggle {
  position: fixed;
  right: 12px;
  bottom: 12px;
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.12);
  background: rgba(255,255,255,.9);
  backdrop-filter: saturate(180%) blur(10px);
  cursor: pointer;
  z-index: 10000; /* sopra l'overlay */
}

.go-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none; /* non blocca l'interazione con la pagina */
  padding-left: var(--size-layout);
padding-right: var(--size-layout);
}

.go-baseline {
  position: absolute;
  inset: 0;
}

.go-container {
  position: relative;
  height: 100%;
  margin: 0 auto; /* centra */
}

.go-columns {
  position: absolute;
  inset: 0;
  display: grid;
  gap: var(--grid-gutter);
}

.go-col {
  height: 100%;
}

.go-col-index {
  position: absolute;
  top: 4px;
  right: 6px;
  font-size: 10px;
  line-height: 1;
  color: #111827;
  mix-blend-mode: multiply;
}
</style>

<template>
  <div :class="classes">
    <label :for="name || inputId">
      <input
        type="checkbox"
        :name="name || inputId"
        :id="inputId"
        v-model="localValue"
        :disabled="disabled"
        @change="emitChanges"
      />

      <span class="slider round">
        <bxs-icon
          v-show="localValue"
          name="check"
          width="1rem"
          height="1rem"
          :class="!disabled ? `text-${iconColor}` : `text-${iconColorDisabled}`"
          style="position: absolute; left: 2px; top: 0; bottom: 0; margin: auto;" />

        <bxs-icon
          v-show="!localValue"
          name="close"
          width="1rem"
          height="1rem"
          :class="!disabled ? `text-${iconColor}` : `text-${iconColorDisabled}`"
          style="position: absolute; right: 2px; top: 0; bottom: 0; margin: auto;" />
      </span>
    </label>

    <span
      v-if="label"
      class="bxs-switch-field--label"
      :role="'switch'"
      :aria-checked="String(localValue)"
      :aria-disabled="String(disabled)"
      @click="!disabled && toggle()"
    >
      {{ localValue ? (activedLabel || label) : label }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'bxs-switch-field',
  props: {
    modelValue: { type: Boolean, default: false },
    name: { type: String, default: null },
    label: { type: String, default: null },
    activedLabel: { type: String, default: null }, // ✅ camelCase
    iconColor: { type: String, default: 'white' }, // ✅ default sensato
    iconColorDisabled: { type: String, default: 'gray-400' }, // ✅ default sensato
    disabled: { type: Boolean, default: false }
  },
  emits: ['update:modelValue', 'change'],
  data () {
    return {
      localValue: this.modelValue, // ✅ usa solo modelValue
      uid: Math.random().toString(36).slice(2) // id semplice
    }
  },
  computed: {
    classes () {
      return [
        'bxs-field',
        'bxs-switch-field',
        {
          'bxs-switch-field-checked': this.localValue,
          'bxs-switch-field-disabled': this.disabled, // ✅ fix
          'bxs-disabled': this.disabled
        }
      ]
    },
    inputId () {
        return this.name || `bxs-switch-${this.uid}`
    }
  },
  watch: {
    modelValue (v) { this.localValue = v }
  },
  methods: {
    toggle () {
      if (this.disabled) return
      this.localValue = !this.localValue
      this.emitChanges()
    },
    emitChanges () {
      // sincronizza v-model e emetti evento change
      this.$emit('update:modelValue', this.localValue)
      this.$emit('change', this.localValue)
    },
    reset () {
      if (this.disabled) return
      this.localValue = false
      this.emitChanges()
    }
  }
}
</script>

<style lang="scss" scoped>
$bxs_swtich_width: var(--switch-width);
$bxs_switch_height: calc($bxs_swtich_width / 2);
$bxs_switch_font_size_base: calc($bxs_switch_height / 1.5);

.bxs-switch-field {
  position: relative;
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  margin-top: var(--input-margin-bottom);
  margin-bottom: var(--input-margin-bottom);
  pointer-events: auto;

  &--label {
    color: var(--input-color-label);
    font-size: $bxs_switch_font_size_base;
    font-weight: 400;
    line-height: normal;
    padding-left: calc(var(--size-ui) / 2);
    margin-top: 1px;
    transition: color 0.2s ease;
  }

  &.bxs-switch-field-checked {
    > .bxs-switch-field--label {
      color: var(--switch-actived-pill-color);
    }
    .slider:before {
      background-color: var(--switch-actived-pill-color);
    }
  }

  &.bxs-disabled {
    cursor: not-allowed !important;

    > label > span {
      background-color: var(--color-disabled) !important;

      &::before {
        background-color: var(--switch-pill-color-disabled) !important;
      }
    }

    > .bxs-switch-field--label {
      color: var(--color-disabled) !important;
      pointer-events: none;
    }
  }
}

label {
  position: relative;
  display: inline-block;
  width: $bxs_swtich_width;
  height: $bxs_switch_height;
  font-size: $bxs_switch_font_size_base;
}

.bxs-switch-field input {
  padding: 0;
  margin: 0;
  opacity: 0;
  width: 0;
  height: 0;
}

// false bg
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--switch-background-color);
  transition: 0.25s ease;
}

// pallina
.slider:before {
  content: "";
  position: absolute;
  display: inline-block;
  height: $bxs_switch_height;
  width: $bxs_switch_height;
  left: -1px; // ✅ fix refuso
  bottom: 0;
  background-color: var(--switch-pill-color);
  transition: 0.25s ease;
}

// actived bg
input:checked + .slider {
  background-color: var(--switch-actived-background-color);
}

input:checked + .slider:before {
  transform: translateX(calc(($bxs_swtich_width / 2) + 1px));
}

/* Rounded sliders */
.slider.round { border-radius: var(--pill); }
.slider.round:before { border-radius: 50%; }
</style>

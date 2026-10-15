<template>
  <div class="bxs-geo-field">
    <bxs-menu
    v-model="on"
    :title="optionTitle">
      <template #activator="{ on }">
        <bxs-text-field
          :value="displayText"
          :label="label"
          :required="required"
          :placeholder="placeholder"
          readonly
          v-on="on"
        />
      </template>

      <template
      v-if="!hideSearch"
      #header>
        <!-- INPUT DI RICERCA FISSO -->
        <div class="px-layout py-1">
            <bxs-field
            v-model="keywords"
            placeholder="Cerca…"
            append-icon="search"
            clearable
            hide-details>
                <template #default="{ modelValue, ...attrs }">
                    <bxs-text-field v-bind="attrs" :value="modelValue" />
                </template>
            </bxs-field>
        </div>
      </template>

      <!-- LISTA FILTRATA -->
      <bxs-list>
        <bxs-list-item
          v-for="option in filteredOptions"
          :key="option.id"
          link
          :prepend-icon="isSelected(option) ? 'check-cirlce-fill' : null"
          @click="toggleSelect(option)">
          {{ option.text }}
        </bxs-list-item>
      </bxs-list>
    </bxs-menu>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'bxs_select_field',
  props: {
    modelValue: [String, Array],
    value: [String, Array],
    label: String,
    required: Boolean,
    placeholder: String,
    multiple: { type: Boolean, default: false },
    'close-on-click-item': {
      type: Boolean,
      required: false,
      default: true
    },
    options: {
      type: Array,
      required: false,
      default: () => []
    },
    'option-title': {
      type: String,
      required: false,
      default: 'Seleziona'
    },
    'max-selectable': {
        type: Number,
        required: false,
        default: -1,
        min: 1
    },
    'hide-search': {
        type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      local_value: [],
      on: false,
      keywords: '',      // input ricerca
      local_options: this.options
    }
  },
  computed: {
    displayText() {
      if (this.multiple) {
        return this.local_value.map(x => x.text).join(', ')
      }
      return this.local_value[0]?.text || ''
    },
    filteredOptions() {
      if (!this.keywords) return this.local_options
      const k = this.keywords.toLowerCase()
      return this.local_options.filter(opt =>
        (opt.text || '').toLowerCase().includes(k)
      )
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.syncLocalValue(newVal)
      }
    },
    options: {
      immediate: true,
      handler(newVal) {
        this.local_options = newVal
        this.syncLocalValue(this.value)
      }
    }
  },
  methods: {
    syncLocalValue(value) {
      if (this.multiple) {
        let arr = Array.isArray(value) ? value : (value ? [value] : [])
        this.local_value = this.local_options.filter(opt => arr.includes(opt.value))
      } else {
        let v = Array.isArray(value) ? value[0] : value
        let found = this.local_options.find(opt => opt.value === v)
        this.local_value = found ? [found] : []
      }
    },
    isSelected(option) {
      return this.local_value.some(opt => opt.value === option.value)
    },
    toggleSelect(option) {
      if (this.multiple) {
        if (this.isSelected(option)) {
          // Rimuovi
          this.local_value = this.local_value.filter(opt => opt.value !== option.value)
        } else {
          // Aggiungi
          if (this.maxSelectable !== -1 && this.local_value.length >= this.maxSelectable) return
          this.local_value.push(option)
        }

        this.$emit('update:modelValue', this.local_value.map(opt => opt.value))

        if (this.closeOnClickItem === true && !this.multiple) {
          this.on = false
        }
      } else {
        if (this.local_value.includes(option)) {
            this.local_value = []
        } else {
            this.local_value = [option]
        }

        this.$emit('update:modelValue', this.local_value.length > 0 ? option.value : null)
        if (this.closeOnClickItem === true) {
          this.on = false
        }
      }
    }
  }
}
</script>

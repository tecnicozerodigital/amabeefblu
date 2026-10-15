<template>
  <div>
    <div v-if="label">
      <p>{{ label }}</p>
    </div>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="repeater-row flex items-center gap-2 mb-2"
    >
      <template v-for="field in fields" :key="field.key">
        <!-- STRING -->
        <div v-if="field.type === 'string'">
          <label :for="field.key + '-' + index">{{ field.label }}</label>
          <input
            :id="field.key + '-' + index"
            type="text"
            v-model="items[index][field.key]"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            class="native-input"
          />
        </div>
        <!-- NUMBER -->
        <div v-else-if="field.type === 'number'">
          <label :for="field.key + '-' + index">{{ field.label }}</label>
          <input
            :id="field.key + '-' + index"
            type="number"
            v-model.number="items[index][field.key]"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            class="native-input"
          />
        </div>
        <!-- DATE -->
        <div v-else-if="field.type === 'date'">
          <label :for="field.key + '-' + index">{{ field.label }}</label>
          <input
            :id="field.key + '-' + index"
            type="date"
            v-model="items[index][field.key]"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            class="native-input"
          />
        </div>
        <!-- SELECT -->
        <div v-else-if="field.type === 'select'">
          <label :for="field.key + '-' + index">{{ field.label }}</label>
          <select
            :id="field.key + '-' + index"
            v-model="items[index][field.key]"
            :required="field.required"
            class="native-input"
          >
            <option value="" disabled>
              {{ field.placeholder || 'Seleziona...' }}
            </option>
            <option
              v-for="opt in field.options || []"
              :key="opt.value ?? opt"
              :value="opt.value ?? opt"
            >
              {{ opt.text ?? opt }}
            </option>
          </select>
        </div>
      </template>
      <button type="button" @click="removeRow(index)" class="remove-btn">🗑️</button>
    </div>
    <button type="button" @click="addRow" class="add-btn">➕ Aggiungi</button>
  </div>
</template>

<script>
export default {
  name: 'DynamicRepeater',
  props: {
    modelValue: { type: Array, default: () => [] },
    fields: { type: Array, required: true },
    label: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      items: this.modelValue && this.modelValue.length
        ? JSON.parse(JSON.stringify(this.modelValue))
        : [this.emptyRow()]
    }
  },
  watch: {
    modelValue: {
      handler(val) {
        this.items = val && val.length
          ? JSON.parse(JSON.stringify(val))
          : [this.emptyRow()]
      },
      deep: true
    },
    items: {
      handler(val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    }
  },
  methods: {
    emptyRow() {
      const row = {}
      this.fields.forEach(f => {
        if (f.type === 'number') row[f.key] = 0
        else row[f.key] = ''
      })
      return row
    },
    addRow() {
      this.items.push(this.emptyRow())
    },
    removeRow(idx) {
      if (this.items.length > 1) {
        this.items.splice(idx, 1)
      }
    }
  }
}
</script>

<style scoped>
.repeater-row {
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5em;
}
.add-btn {
  margin-top: 1em;
}
.remove-btn {
  margin-left: 0.5em;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3em;
  line-height: 1;
  color: #d11a1a;
}
.remove-btn:hover {
  color: #a90000;
}
.native-input {
  margin-left: 0.3em;
  margin-right: 0.8em;
  padding: 0.18em 0.45em;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 100px;
}
label {
  font-size: 0.97em;
}
</style>

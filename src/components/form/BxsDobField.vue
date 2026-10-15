<template>
  <div class="dob-input">
    <!-- Input per il giorno -->
    <input
    type="number"
    v-model.number="localDob.day"
    :min="1"
    :max="31"
    :step="1"
    :required="required"
    placeholder="GG"
    class="dob-input-field"
    @change="checkDay" />

    <span class="separator">/</span>

    <!-- Input per il mese -->
    <input
    type="number"
    v-model.number="localDob.month"
    :min="1"
    :max="12"
    :required="required"
    placeholder="MM"
    class="dob-input-field"
    @change="checkMonth" />

    <span class="separator">/</span>

    <!-- Input per l'anno -->
    <input
    type="number"
    v-model.number="localDob.year"
    :min="minYear"
    :max="maxYear"
    :required="required"
    placeholder="AAAA"
    class="dob-input-field"
    @change="checkYear" />
  </div>
</template>

<script>
export default {
  name: 'bxs_dob_field',
  inheritAttrs: false,
  props: {
    value: {
      type: Object,
      default: () => ({
        day: '',
        month: '',
        year: ''
      })
    },
    required: Boolean
  },
  emits: [
        'update:modelValue',
        'update:model-value',
        'change',
        'input'
    ],
  data() {
    return {
      localDob: { ...this.value }
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    maxYear() {
      return this.currentYear;
    },
    minYear() {
      return this.currentYear - 100;
    }
  },
  methods: {
    checkDay() {
      if (this.localDob.day < 1) {
        this.localDob.day = 1;
      } else if (this.localDob.day > 31) {
        this.localDob.day = 31;
      }
    },
    checkMonth() {
      if (this.localDob.month < 1) {
        this.localDob.month = 1;
      } else if (this.localDob.month > 12) {
        this.localDob.month = 12;
      }
    },
    checkYear() {
      if (this.localDob.year < this.minYear) {
        this.localDob.year = this.minYear;
      } else if (this.localDob.year > this.maxYear) {
        this.localDob.year = this.maxYear;
      }
    }
  },
  watch: {
    localDob: {
      deep: true,
      handler(newVal) {
        this.$emit("update:modelValue", newVal);
      }
    }
  }
}
</script>

<style scoped>
.dob-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

/* Gli input number sono stilizzati per un look pulito */
.dob-input-field {
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  text-align: center;
}

/* Stile per la slash di separazione */
.separator {
  margin: 0 4px;
  color: var(--color-disabled);
}
</style>

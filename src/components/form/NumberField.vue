<template>
    <div :class="['input-number', { disabled: disabled }]">
        <button
        :class="['input-number--decrement', {
            disabled: disabled || this.min && this.model === this.min
        }]"
        :disabled="disabled || this.min && this.model === this.min"
        @click="decrease">-</button>

        <input
        ref="input"
        :value="model"
        :name="name"
        :placeholder="placeholder"
        :step="step"
        :min="min"
        :max="max"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-required="required"
        :aria-disabled="disabled"
        :autocomplete="autocomplete"
        type="number"
        @change="change"
        @paste="handlePaste">

        <button
        :class="['input-number--increment', {
            disabled: disabled || this.max && this.model === this.max
        }]"
        :disabled="disabled || this.max && this.model === this.max"
        @click="increase">+</button>
    </div>
</template>

<script>
const isNaN = Number.isNaN || window.isNaN
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/
const normalizeDecimalNumber = (value, times = 100000000000) => (
  REGEXP_DECIMALS.test(value) ? (Math.round(value * times) / times) : value)

export default {
    name: 'number_field',
    props: {
        modelValue: {
            type: Number,
            default: NaN
        },
        max: {
            type: Number,
            default: null
        },
        min: {
            type: Number,
            default: 1
        },
        name: {
            type: String,
            default: undefined
        },
        step: {
            type: Number,
            default: 1
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false
        },
        placeholder: String,
        readonly: {
            type: Boolean,
            required: false,
            default: false
        },
        required: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        autocomplete: {
            type: String,
            default: 'off'
        }
    },
    data () {
        return {
            model: this.modelValue
        }
    },
    emits: [
        'update:modelValue',
        'change'
    ],
    watch: {
        value (newVal) {
            this.model = newVal
        }
    },
    methods: {
        change (evt) {
            console.log('number field change()', evt)
            this.setValue(Math.min(this.max, Math.max(this.min, evt.target.value)))
        },
        handlePaste (evt) {
            const clipboardData = evt.clipboardData || window.clipboardData
            if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData('text'))) evt.preventDefault()
        },
        decrease () {
            console.log('number field decrease()')

            if (isNaN(this.model)) this.model = 0

            this.setValue(
                Math.min(
                    this.max,
                    Math.max(this.min, normalizeDecimalNumber(this.model - this.step))
                )
            )
        },
        increase () {
            console.log('number field increase()')

            if (isNaN(this.model)) this.model = 0

            this.setValue(
                Math.min(
                    this.max,
                    Math.max(this.min, normalizeDecimalNumber(this.model + this.step))
                )
            )
        },
        setValue (value) {
            console.log('number field setValue()', value)

            const oldValue = this.model
            let newValue = this.rounded ? Math.round(value) : value

            if (this.min <= this.max) {
                newValue = Math.min(this.max, Math.max(this.min, newValue))
            }

            this.model = newValue

            if (newValue === oldValue) {
                this.$refs.input.value = newValue
            }

            this.$emit('update:modelValue', newValue, oldValue)
            this.$emit('change', newValue, oldValue)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/conf.scss';
.input-number {
    position: relative;
    flex: 1;
    width: 100%;
    min-width: var(--min-height-ui);
    height: var(--min-height-ui);

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    font-size: 1rem;
    font-weight: 400;
    border: 1px solid var(--color-black);
    color: var(--color-black);
    border-radius: var(--radius);

    overflow: hidden;

    &.disabled {
        border: none !important;
        // border-color: darken(map-get($colors, 'disabled'), 25%) !important;
        color: darken(map-get($colors, 'disabled'), 25%) !important;
        pointer-events: none !important;
        font-weight: 400;

        button {
            pointer-events: none !important;
        }
    }

    > input {
        flex: 1;
        width: 100%;
        height: 100%;
        font-size: 1.25em;
        box-sizing: border-box;
        vertical-align: top;
        text-align: center;
        outline: none;
        -moz-appearance: textfield; /* Firefox */
        pointer-events: none;
        outline: none;
        border: none;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            // display: none; <- Crashes Chrome on hover
            -webkit-appearance: none;
            margin: 0; // Apparently some margin are still there even though it's hidden
        }
    }

    button {
        min-width: var(--min-height-ui);
        height: 100%;

        display: inline-flex;
        justify-content: center;
        align-items: center;

        font-size: 1.5em;
        font-weight: 500;
        user-select: none !important;
        cursor: pointer;
        color: var(--color-black);
        // border: 1px solid red;

        &.disabled {
            background-color: transparent !important;
            color: var(--color-disabled);
        }
    }
}

</style>
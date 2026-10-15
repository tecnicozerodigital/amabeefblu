<template>
    <div class="bxs-qty-field">
        <label :for="name">{{ label }}</label>

        <div class="bxs-qty-field--input">
            <button
            v-if="!hideActions"
            type="button"
            tabindex="-1"
            :disabled="disabled || readonly || !decreasable"
            @click.prevent="decrease">&mdash;</button>

            <div>
                <input
                ref="input"
                type="number"
                :name="name"
                :id="id"
                :value="isNaN(value) ? '' : value"
                :min="min"
                :max="max"
                :step="step"
                :readonly="readonly || !inputtable"
                :disabled="disabled || (!decreasable && !increasable)"
                :placeholder="placeholder"
                autocomplete="off"
                @change="change"
                @paste="paste">

                <span>{{ suffix }}</span>
            </div>

            <button
            v-if="!hideActions"
            :disabled="disabled || readonly || !increasable"
            type="button"
            tabindex="-1"
            @click.prevent="increase">&#xff0b;</button>
        </div>
    </div>
</template>

<script>
const isNaN = Number.isNaN || window.isNaN
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/
const normalizeDecimalNumber = (value, times = 100000000000) => (
  REGEXP_DECIMALS.test(String(value)) ? (Math.round(value * times) / times) : value
)

export default {
    name: 'qty_field',
    props: {
        modelValue: {
            type: Number,
            required: false,
            default: NaN
        },
        'hide-actions': {
            type: Boolean,
            required: false,
            default: false
        },
        id: {
            type: String,
            required: false,
            default: null
        },
        label: {
            type: String,
            required: false,
            default: null
        },
        min: {
            type: Number,
            required: false,
            default: 0
        },
        max: {
            type: Number,
            required: false,
            default: null
        },
        step: {
            type: Number,
            required: false,
            default: 1
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        inputtable: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            default: undefined
        },
        placeholder: {
            type: String,
            default: undefined
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false
        },
        size: {
            type: String,
            default: undefined
        },
        suffix: {
            type: String,
            default: undefined
        }
    },
    emits: [
        'update:modelValue',
        'update:model-value',
        'change'
    ],
    data () {
        return {
            value: NaN
        }
    },
    computed: {
        increasable () {
            return isNaN(this.value) || this.value < this.max
        },
        decreasable () {
            return isNaN(this.value) || this.value > this.min
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(newValue, oldValue) {
                console.log('qty field change modelValue', newValue, oldValue)

                if (
                    !(isNaN(newValue) && typeof oldValue === 'undefined') &&
                    newValue !== this.value
                ) {
                    this.setValue(newValue)
                }
            }
        }
        // min (newVal, oldVal) {
        //     if (newVal !== oldVal) this.setValue(this.value)
        // },
        // max (newVal, oldVal) {
        //     if (newVal !== oldVal) this.setValue(this.value)
        // }
    },
    methods: {
        isNaN,
        change (event) {
            this.setValue(event.target.value)
        },
        paste(event) {
            const clipboardData = event.clipboardData || window.clipboardData

            if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData('text'))) {
                event.preventDefault()
            }
        },
        decrease () {
            if (this.decreasable) {
                let { value } = this
                if (isNaN(value)) value = 0
                this.setValue(normalizeDecimalNumber(value - this.step))
            }
        },
        increase () {
            if (this.increasable) {
                let { value } = this
                if (isNaN(value)) value = 0
                this.setValue(normalizeDecimalNumber(value + this.step))
            }
        },
        setValue (value) {
            const oldValue = this.value
            let newValue = typeof value !== 'number' ? parseFloat(value) : value

            if (!isNaN(newValue)) {
                if (this.min <= this.max) {
                    newValue = Math.min(this.max, Math.max(this.min, newValue))
                }

                if (this.rounded) {
                    newValue = Math.round(newValue)
                }
            }

            this.value = newValue

            if (newValue === oldValue) {
                // Force to override the number in the input box (#13).
                this.$refs.input.value = String(newValue)
            }

            console.log('qty field setValue()', this.name, this.min, this.max, newValue, oldValue)

            this.$emit('update:modelValue', newValue, oldValue)
        }
    }
}
</script>

<style lang="scss" scoped>
// $border: 1px solid #ddd;

.bxs-qty-field {
    label {
        margin-bottom: 0.15rem;
    }

    &--input {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        width: 100%;
        min-width: var(--cta-min-height);
        height: var(--cta-min-height);
        border-radius: var(--radius);
        overflow: hidden;
        background-color: var(--input-background-color);

        div {
            width: 100%;
            height: 100%;
            flex: 1;
            position: relative;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            align-items: center;

            //
            input {
                flex: 1;
                width: 100%;
                min-width: 20px;
                height: 100%;
                border: 0;
                -moz-appearance: textfield;
                padding: 0 1rem;
                font-size: 1.15rem;
                font-weight: 500;
                background-color: rgba(#000, 0.05);
                border: 1px solid transparent;

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }

                &:hover {
                    &:not([disabled]) {
                        border-color: black;
                    }
                }
            }

            span {
                position: absolute;
                height: 100%;
                right: 0.5rem;
                padding: 0 0.25rem;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                align-items: center;
                pointer-events: none;
                // background-color: rgba(#000, 0.1);
            }
        }

        button {
            background-color: var(--color-fourth);
            color: var(--color-primary);
            width: var(--cta-min-height);
            height: 100%;
            padding: 0;
            margin: 0;
            font-size: 1rem;
            font-weight: 500;
            border-radius: var(--radius);
            cursor: pointer;

            &:disabled {
                background-color: var(--color-disabled);
                cursor: not-allowed;
            }
        }
    }
}
</style>
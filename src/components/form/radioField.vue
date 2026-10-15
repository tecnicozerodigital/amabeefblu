<template>
    <div
    :class="classes"
    :style="styles"
    @click="handleClick">
        <div class="mr-ui">
            <input
            ref="input"
            type="radio"
            :value="value"
            :id="id"
            :name="name"
            :aria-label="ariaLabel"
            :autocomplete="autocomplete"
            :readonly="readonly"
            :checked="local_value === value"
            :disabled="disabled"
            class="bxs-hidden">

            <span class="outer">
                <span class="inner"></span>
            </span>
        </div>

        <label :for="id">
            <slot />
        </label>
    </div>
</template>

<script>
export default {
    name: 'tsm_radio_field',
    props: {
        modelValue: {
            type: [String, Number],
            required: false,
            default: null
        },
        value: {
            type: [String, Number],
            required: false,
            default: null
        },
        autocomplete: {
            type: [String, Boolean],
            required: false,
            default: 'off'
        },
        id: {
            type: String,
            required: false,
            default: null
        },
        checked: {
            type: Boolean,
            required: false,
            default: false
        },
        autofocus: {
            type: Boolean,
            required: false,
            default: false
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        'aria-label': {
            type: String,
            required: false,
            default: null
        },
        name: {
            type: String,
            required: false,
            default: null
        },
        hint: {
            type: String,
            required: false,
            default: null
        },
        error: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: [
        'update:modelValue'
    ],
    data () {
        return {
            local_value: this.modelValue
        }
    },
    computed: {
        classes () {
            return ['tsm-radio-field', {
                'tsm-radio-field-actived': this.local_value === this.value,
                'tsm-radio-field-readonly': this.readonly,
                'tsm-radio-field-error': this.error,
                'tsm-radio-field-disabled': this.disabled
            }]
        },
        styles () {
            return {}
        }
    },
    watch: {
        modelValue (newVal) {
            this.local_value = newVal
        }
    },
    methods: {
        handleClick () {
            if (this.local_value) this.local_value = null
            else this.local_value = this.value

            this.$emit('update:modelValue', this.local_value)
        }
    }
}
</script>

<style lang="scss" scoped>
.tsm-radio-field {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: var(--input-margin-bottom);
    cursor: pointer;

    &.tsm-radio-field-actived {
        label {
            color: var(--color-typo);
        }
    }

    &.tsm-radio-field-disabled {
        color: var(--color-disabled) !important;
        pointer-events: none !important;

        .outer {
            border-color: var(--color-disabled);
        }

        .inner {
            background-color: var(--color-disabled);
        }
    }

    &:hover {
        label {
            color: var(--color-typo);
        }
    }

    &:active {
        label {
            transform: scale(0.95);
        }
    }

    // ----------------------------------------

    input,
    label {
        pointer-events: none;
    }

    label {
        color: var(--color-black-darken-1);
        transition:
            transform 0.15s ease-out,
            color 0.1s ease-out;
    }

    input[type=radio] {
        height: 1px;
        width: 1px;
        opacity: 0;

        &:focus + .outer .inner {
            transform: scale(1);
            opacity: 1;
            background-color: var(--color-black);
        }

        &:checked + .outer .inner {
            transform: scale(1);
            opacity: 1;
            background-color: var(--color-primary);
        }
    }

    .outer {
        height: 20px;
        width: 20px;
        display: block;
        float: left;
        border: 1px solid var(--color-disabled);
        border-radius: 50%;
        background-color: #fff;
    }

    .inner {
        transition: all 0.25s ease-in-out;
        height: 10px;
        width: 10px;
        transform: scale(0);
        display: block;
        margin: 4px;
        border-radius: 50%;
        background-color: var(--color-disabled);
        opacity: 0;
    }
}
</style>
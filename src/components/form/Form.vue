<template>
    <form
    class="bxs-form"
    ref="form"
    role="form"
    :id="name"
    :name="name"
    :aria-label="name"
    :autocomplete="autocomplete"
    novalidate
    @submit.prevent="submit">
        <slot />
    </form>
</template>

<script>
export default {
    name: 'bxs_form',
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false
        },
        name: {
            type: String,
            required: false,
            default: () => 'form-' + Math.random()
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        autocomplete: {
            type: [String, Boolean],
            required: false,
            default: 'on'
        }
    },
    data () {
        return {
            valid: false,
            fields_comps: {}
        }
    },
    emits: [
        'update:modelValue',
        'submit'
    ],
    provide() {
        return {
            bxs_form: this // Forniamo il riferimento al form ai componenti figli
        }
    },
    methods: {
        submit () {
            const vals = []
            const _model = {}
            let is_changed = []

            for (const k in this.fields_comps) {
                const { value } = this.fields_comps[k].validate()
                const model = this.fields_comps[k].getValue()
                if (model.is_changed) _model[model.name] = model.value
                is_changed.push(model.is_changed)
                vals.push(value)
            }

            console.log('Form comp submit()', _model, is_changed)

            this.valid = vals.every(v => v === true)
            is_changed = is_changed.some(v => v === true)

            if (this.valid) this.$emit('submit', _model, is_changed)
            this.$emit('update:modelValue', this.valid)

            return this.valid
        }
    },
    beforeUnmount() {
        this.valid = false
    }
};
</script>

<style scoped>
.bxs-form {
    display: block;
    position: relative;
}
</style>

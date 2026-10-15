import validator from 'validator'
import colorable from './colorable'

const base_attrs = {
    title: {
        type: String,
        required: false,
        default: null
    },
    'option-title': {
        type: String,
        required: false,
        default: 'Seleziona'
    },
    lang: {
        type: String,
        required: false,
        default: 'it'
    },
    dir: {
        type: String,
        required: false,
        default: 'ltr',
        validator: (value) => ['ltr', 'rtl'].includes(value)
    },
    id: {
        type: String,
        required: false,
        default: null
    },
    value: {
        type: [String, Number, Array],
        required: false,
        default: null
    },
    items: {
        type: Array,
        required: false,
        default: []
    }
}

const input_base_attrs = {
    type: {
        type: String,
        required: false,
        default: 'text'
    },
    name: {
        type: String,
        required: false,
        default: null
    },
    value: {
        type: [String, Boolean, Array, Number, Object],
        required: false,
        default: null
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
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
    placeholder: {
        type: String,
        required: false,
        default: null
    },
    autocomplete: {
        type: String,
        required: false,
        default: 'off',
        validator: (value) => ['on', 'off'].includes(value)
    },
    autofocus: {
        type: Boolean,
        required: false,
        default: false
    },
    checked: {
        type: Boolean,
        required: false,
        default: false
    }
}

const input_data_attrs = {
    min: {
        type: [String, Number],
        required: false,
        default: null
    },
    max: {
        type: [String, Number],
        required: false,
        default: null
    },
    step: {
        type: [String, Number],
        required: false,
        default: null
    },
    'min-length': {
        type: [String, Number],
        required: false,
        default: null
    },
    'max-length': {
        type: [String, Number],
        required: false,
        default: null
    },
    'max-selectable': {
        type: Number,
        required: false,
        default: -1,
        min: 1
    },
    pattern: {
        type: String,
        required: false,
        default: null
    },
    multiple: {
        type: Boolean,
        required: false,
        default: false
    },
    suggestions: {
        type: Array,
        required: false,
        default: []
    },
    options: {
        type: Array,
        required: false,
        default: []
    }
}

const input_ux_attrs = {
    'aria-label': {
        type: String,
        required: false,
        default: null
    },
    spellcheck: {
        type: Boolean,
        required: false,
        default: true
    },
    inputmode: {
        type: Boolean,
        required: false,
        default: null
    }
}

const custom_props = {
    instance_type: {
        type: String,
        required: false,
        default: 'string'
    },
    class: {
        type: String,
        required: false,
        default: 'bxs-field-input'
    },
    'comp-name': {
        type: String,
        required: false,
        default: null
    },
    'append-icon': {
        type: String,
        required: false,
        default: null
    },
    modelValue: {
        type: [String, Boolean, Array, Number, Object],
        required: false,
        default: null
    },
    clearable: {
        type: Boolean,
        required: false,
        default: false
    },
    rules: {
        type: Array,
        required: false,
        default: () => []
    },
    outlined: {
        type: Boolean,
        required: false,
        default: true
    },
    hint: {
        type: String,
        required: false,
        default: null
    },
    errors: {
        type: Array,
        required: false,
        default: () => []
    },
    label: {
        type: String,
        required: false,
        default: null
    },
    'hide-details': {
        type: Boolean,
        required: false,
        default: false
    },
    'hide-counter': {
        type: Boolean,
        required: false,
        default: false
    },
    solo: {
        type: Boolean,
        required: false,
        default: false
    },
    tile: {
        type: Boolean,
        required: false,
        default: null
    },
    'hide-search': {
        type: Boolean,
        required: false,
        default: false
    }
}

export default {
    // serve a bloccare l'ereditarietà automatica degli attributi non definiti nel componente figlio,
    // impedendo che vengano applicati automaticamente all'elemento root del template.
    inheritAttrs: false,
    inject: ['bxs_form'],
    provide() {
        return {
            bxsField: this
        }
    },
    mixins: [colorable],
    props: {
        ...custom_props,
        ...base_attrs,
        ...input_base_attrs,
        ...input_data_attrs,
        ...input_ux_attrs
    },
    emits: [
        'update:modelValue',
        'update:model-value',
        'change',
        'focus',
        'blur',
        'click',
        'reset'
    ],
    data() {
        return {
            is_first_enter: true,
            inputRef: null,
            cacheValue: this.modelValue || this.value,
            old_cache_value: this.modelValue || this.value,
            charsCount: 0,
            focus: false,
            valid: true,
            cacheErrors: this.errors,
            showPass: false,
            internalType: this.type,
            selected_rules: [],
            local_rules: {
                alphanumeric: (v) => /^[a-z\d]*$/.test(v) || 'codice in maiuscolo, alfanumerico, senza spazio',
                capitalize: (v) => /^[A-Z]$/.test(v) || 'campo con lettere maiuscole',
                capitalizeFirstletter: (v) => /([^A-Z])([A-Z])(?=[A-Z]{2})|^([A-Z])/.test(v) || 'Questo campo deve avere la prima lettera maiuscola',
                dimension: (v) => /^\d+(?:[.]\d{1,3}|$)$/.test(v) || 'campo con 3 decimali',
                email: (v) => /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(v) || 'Email non valida',
                fiscalcode: (v) => /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/.test(v) || 'inserisci un codice fiscale corretto',
                from0To100: (v) => /^0*(?:[1-9][0-9]?|100)$/g.test(v) || 'questo campo deve essere compreso tra 0 e 100',
                least1Number: (v) => /\d+/.test(v) || 'questo campo deve contenere almeno un numero',
                max1000char: (v) => (v && v.length > 1000) || 'questo campo non può superare i 1000 caratteri',
                max165char: (v) => (v && v.length < 165) || 'questo campo non può superare i 165 caratteri',
                max20char: (v) => (v && v.length > 20) || 'questo campo non può superare i 20 caratteri',
                minchar: (l) => (v) => (v && v.length >= l) || `questo campo deve contenere almeno ${l} caratteri`,
                only5Numbers: (v) => /^[0-9]{5}$/.test(v) || 'questo campo deve contere solo 5 numeri',
                onlyNumbers: (v) => /^\d+$/.test(v) || 'questo campo deve contere solo numeri',
                phone: (v) => /^\d{3,}$/.test(v) || 'il campo richiede solo numeri',
                required: (v) => !!v || 'campo richiesto',
                url: (v) => (v && !!validator.isURL(v)) || 'Url non valido',
                requiredArr: (v) => (v && !!v.length) || 'Campo richiesto',
                threeDecimal: (v) => /^\d+(?:[.]\d{1,3}|$)$/.test(v) || 'campo con 3 decimali',
                twoDecimal: (v) => /^\d+(?:[.]\d{1,2}|$)$/.test(v) || 'campo con 2 decimali',
                vatnumber: (v) => /^[0-9]{11}$/.test(v) || 'inserisci una partita iva corretta',
                stong_password: v => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) || 'Password debole'
            }
        }
    },
    computed: {
        classes() {
            return {
                field: true,
                'bxs-field': true,
                'bxs-field-has-label': !!this.label,
                'bxs-field-readonly': this.readonly,
                'bxs-field-hide-details': this.hideDetails,

                'bxs-field-error': !this.valid,
                'bxs-field-raised': this.focus || !!this.placeholder || !!this.cacheValue,
                'bxs-field-focused': this.focus,
                'bxs-field-disabled': this.disabled,
                'bxs-field-outlined': this.outlined
            }
        },
        styles() {
            return {}
        },
        content_class() {
            return {
                'bxs-tile': this.tile
            }
        },
        isPassword() {
            return this.type === 'password' || this.name === 'password' || this.name === 'oldPassword' || this.name === 'newPassword'
        }
    },
    mounted() {
        this.$nextTick(this.start)
    },
    beforeUnmount() {
        this.stop()
    },
    watch: {
        modelValue(newValue) {
            this.cacheValue = newValue
            // console.log('Inputable mixin watch modelValue()', this.name, newValue, this.old_cache_value, this.instance_type)

            // if (this.is_first_enter) {
            //     this.old_cache_value = this.cacheValue
            //     this.is_first_enter = false
            // }
        },
        cacheValue() {
            this.charsCount = this.cacheValue ? this.cacheValue.length : 0
        },
        showPass(newVal) {
            if (newVal) this.internalType = 'text'
            else this.internalType = 'password'
        }
    },
    methods: {
        // comps
        start() {
            // console.log('Inputable mixin start()', this.name, this.cacheValue, this.old_cache_value, this.instance_type)

            this.old_cache_value = this.cacheValue

            if (!this.bxs_form.fields_comps[this.name]) {
                this.bxs_form.fields_comps[this.name] = this
            }

            if (this.required) {
                this.selected_rules.push(this.local_rules.required)
            }

            if (this.rules.length > 0) {
                this.rules.forEach((k) => {
                    if (k.includes('minchar=')) {
                        const l = k.split('=')[1]
                        this.selected_rules.push(this.local_rules.minchar(l))
                    } else {
                        this.selected_rules.push(this.local_rules[k])
                    }
                })
            }

            if (this.autofocus) {
                this.validate()
            }

            document.addEventListener('click', this.handleClickOutside)
        },
        stop() {
            document.removeEventListener("click", this.handleClickOutside)
        },
        // ---------------------------------------------------------------------------------------------------
        // events --------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------
        handleClickOutside(evt) {
            if (this.$refs.fieldContent && !this.$refs.fieldContent.contains(evt.target)) {
                this.focus = false

                if (this.cacheValue) this.validate()
            }
        },
        handleClick(evt) {
            this.focus = true

            if (!this.valid) {
                this.resetValidation()
            } else {
                if (this.cacheValue) this.validate()
            }

            this.inputRef.$el.focus()
        },
        handleChange(evt) {
            this.$emit('change', this.cacheValue)
            this.$emit('update:modelValue', this.cacheValue)
        },
        // handleFocus(focused, evt) {
        //     console.log('hanlde focus')
        //     this.focus = focused

        //     if (this.focus) {
        //         this.resetValidation()
        //     } else {
        //         if (!this.cacheValue) {
        //             this.resetValidation()
        //         } else {
        //             this.validate()
        //         }
        //     }

        //     this.$emit(evt.type, evt)
        // },
        handleInput(evt) {
            this.$emit('update:modelValue', evt.target.value)
        },
        emitToChild(message) {
            console.log('parent emitToChild', message)

            if (this.inputRef.receiveEventFromParent) {
                this.inputRef.receiveEventFromParent(message)
            }
        },
        receiveEventFromChild(message) {
            console.log('parent receiveEventFromChild', message)
        },
        // ---------------------------------------------------------------------------------------------------
        // actions -------------------------------------------------------------------------------------------
        // ---------------------------------------------------------------------------------------------------
        getValue() {
            let v = this.cacheValue
            // console.log('Inputable mixin', this.name, v, this.old_cache_value, this.instance_type)

            if (!v || !v.length) {
                if (this.instance_type === 'string') {
                    v = null
                } else if (this.instance_type === 'array') {
                    v = []
                }
            }

            const is_changed = JSON.stringify(v) !== JSON.stringify(this.old_cache_value)
            // this.old_cache_value = this.cacheValue

            return {
                name: this.name,
                value: v,
                is_changed: is_changed
            }
        },
        reset() {
            console.log('reset')
            this.cacheValue = null
            this.resetValidation()
            this.$emit('update:modelValue', this.cacheValue)
            this.$emit('reset')
            this.emitToChild('reset')
        },
        resetValidation() {
            console.log('reset validation')
            this.valid = true
            this.cacheErrors = []
        },
        validate() {
            // if (!this.required) {
            //     return {
            //         value: true,
            //         errors: []
            //     }
            // }

            let v = true
            this.cacheErrors = []

            if (this.selected_rules.length > 0) {
                this.selected_rules.forEach((rule) => {
                    if (typeof rule === 'function') {
                        const resRule = rule(this.cacheValue)

                        if (typeof resRule === 'string') {
                            this.cacheErrors.push(resRule)
                        } else if (typeof resRule === 'boolean') {
                            v = resRule
                        } else {
                            console.error('error valid input =>', resRule)
                        }
                    }
                })

                v = this.cacheErrors.length === 0
            }

            this.valid = v

            if (!this.valid) {
                this.shake()
            }

            return {
                value: v,
                errors: this.cacheErrors
            }
        },
        shake() {
            if (!this.$refs.label) return

            this.$refs.label.classList.add('error-anim')

            setTimeout(() => {
                this.$refs.label.classList.remove('error-anim')
            }, 600)
        }
    }
}
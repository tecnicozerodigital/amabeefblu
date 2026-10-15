function modelable (valueTypes) {
    if (!valueTypes) throw new Error('valueTypes required')

    return {
        props: {
            modelValue: {
                type: valueTypes,
                required: false,
                default: false
            }
        },
        emits: [
            'update:modelValue'
        ],
        computed: {
            modelableValueType () {
                return (typeof this.modelValue).toLowerCase()
            },
            modelableValueSetted () {
                return !!this.modelableCacheValue
            }
        },
        data () {
            return {
                modelableCacheValue: this.modelValue
            }
        },
        watch: {
            modelValue (newVal) {
                this.modelableCacheValue = newVal
            }
        },
        methods: {
            modelableUpdateValue (v) {
                this.$emit('update:modelValue', v || this.modelableCacheValue)
            }
        }
    }
}

export default modelable

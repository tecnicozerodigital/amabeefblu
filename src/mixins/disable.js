export default {
    props: {
        disabled: {
            type: [String, Number, Boolean],
            required: false,
            default: false
        }
    },
    computed: {
        disableClasses () {
            return {
                'mk-disabled': this.disabled
            }
        }
    }
}

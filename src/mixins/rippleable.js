export default {
    // directives: { ripple },
    props: {
        ripple: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    data () {
        return {
            rippleable: this.$mk.theme.ripple || this.ripple
        }
    },
    watch: {
        ripple (newVal) {
            this.rippleable = this.$mk.theme.ripple || newVal
        }
    }
}
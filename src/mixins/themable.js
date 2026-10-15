export default {
    props: {
        dark: {
            type: Boolean,
            required: false,
            default: false
        },
        light: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        themableClasses () {
            return {
                'mk-dark': this.dark && !this.light,
                'mk-light': this.light && !this.dark,
                'mk-theme-dark': this.$mk.theme.isDark,
                'mk-theme-light': !this.$mk.theme.isDark
            }
        }
    }
}

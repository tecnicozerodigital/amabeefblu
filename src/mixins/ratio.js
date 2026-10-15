export default {
    props: {
        ratio: {
            type: [String, Number, Boolean],
            required: false,
            default: false
        },
        'ratio-mobile': {
            type: [String, Boolean],
            required: false,
            default: false
        },
        breakpoint: {
            type: [String, Number],
            required: false,
            default: 1024
        }
    },
    computed: {
        ratio_classes() {
            return {
                'bxs-r': !!this.local_ratio,
                ['bxs-r-' + this.local_ratio]: !!this.local_ratio
            }
        },
        ratio_styles() {
            const v = {}

            if (this.ratio) {
                v['--ratio-w'] = this.local_ratio.split('-')[0]
                v['--ratio-h'] = this.local_ratio.split('-')[1]
            }

            return v
        }
    },
    data() {
        return {
            local_ratio: this.ratio
        }
    },
    watch: {
        ratio(newVal) {
            this.local_ratio = newVal
        }
    },
    mounted() {
        this.$nextTick(this.ratioPlay)
    },
    methods: {
        ratioPlay() {
            if (this.ratioMobile) {
                this.ratioResize()
                window.addEventListener('resize', this.ratioResize)
            }
        },
        ratioResize() {
            if (window.innerWidth < this.breakpoint) this.local_ratio = this.ratioMobile
            else if (window.innerWidth > this.breakpoint) this.local_ratio = this.ratio
        }
    },
    beforeUnmount() {
        if (this.ratioMobile) {
            window.removeEventListener('resize', this.ratioResize)
        }
    }
}

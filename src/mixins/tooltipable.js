import { isObject, merge } from '@/assets/utils/object'

export default {
    props: {
        tooltip: {
            type: [Boolean, Object],
            required: false,
            default: null
        }
    },
    data () {
        return {
            tooltipable: {
                content: null,
                distance: 10,
                container: 'body',
                strategy: 'absolute',
                placement: 'top',
                triggers: ['hover', 'focus', 'touch'],
                disabled: true
            }
        }
    },
    mounted () {
        this.$nextTick(this.tooltipablePLay)
    },
    watch: {
        tooltip () {
            this.tooltipablePLay()
        }
    },
    methods: {
        tooltipablePLay () {
            if (isObject(this.tooltip)) {
                merge(this.tooltipable, this.tooltip)
                this.tooltipable.disabled = false
            }
        }
    }
}
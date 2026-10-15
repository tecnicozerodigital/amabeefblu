import { isObject, merge } from '@/assets/utils/object'

export default {
    props: {
        sticky: {
            type: [Boolean, Object],
            required: false,
            default: null
        }
    },
    data () {
        return {
            stickable: {
                bottom: false,
                top: true,
                sticked: false
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
            if (isObject(this.sticky)) {
                merge(this.tooltipable, this.tooltip)
                this.stickable.sticked = true
            }
        }
    }
}
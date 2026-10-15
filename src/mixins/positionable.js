import { toUnit } from '@/assets/libs/utils/string'
import { boolean } from 'is_js'

export default {
    props: {
        top: {
            type: [String, Number, Boolean],
            required: false,
            default: false
        },
        right: {
            type: [String, Number, Boolean],
            required: false,
            default: false
        },
        bottom: {
            type: [String, Number, Boolean],
            required: false,
            default: false
        },
        left: {
            type: [String, Number, Boolean],
            required: false,
            default: false
        },
        absolute: {
            type: Boolean,
            required: false,
            default: false
        },
        relative: {
            type: Boolean,
            required: false,
            default: false
        },
        fixed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        positionable_classes() {
            const v = {
                'bxs-absolute': this.absolute,
                'bxs-relative': this.relative,
                'bxs-fixed': this.fixed,
                'bxs-top': boolean(this.top) && this.top === true,
                'bxs-right': boolean(this.right) && this.right === true,
                'bxs-bottom': boolean(this.bottom) && this.bottom === true,
                'bxs-left': boolean(this.left) && this.left === true
            }

            return v
        },
        positionable_styles() {
            const styles = {}
            const top = toUnit(this.top)
            const right = toUnit(this.right)
            const bottom = toUnit(this.bottom)
            const left = toUnit(this.left)

            if (!boolean(top) && top) styles.top = top
            if (!boolean(right) && right) styles.right = right
            if (!boolean(bottom) && bottom) styles.bottom = bottom
            if (!boolean(left) && left) styles.left = left

            return styles
        }
    }
}

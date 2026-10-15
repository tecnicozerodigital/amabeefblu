import { toUnit } from '@/assets/libs/utils/string'

export default {
    props: {
        height: [Number, String],
        maxHeight: [Number, String],
        maxWidth: [Number, String],
        minHeight: [Number, String],
        minWidth: [Number, String],
        width: [Number, String]
    },
    computed: {
        measurable_styles() {
            const styles = {}

            const height = toUnit(this.height)
            const minHeight = toUnit(this.minHeight)
            const minWidth = toUnit(this.minWidth)
            const maxHeight = toUnit(this.maxHeight)
            const maxWidth = toUnit(this.maxWidth)
            const width = toUnit(this.width)

            if (height) styles.height = height
            if (minHeight) styles.minHeight = minHeight
            if (minWidth) styles.minWidth = minWidth
            if (maxHeight) styles.maxHeight = maxHeight
            if (maxWidth) styles.maxWidth = maxWidth
            if (width) styles.width = width

            return styles
        }
    }
}

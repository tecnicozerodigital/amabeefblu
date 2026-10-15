// import { isCssColor } from '@/assets/utils/color'

export default {
    props: {
        color: {
            type: [String, Boolean],
            required: false,
            default: false
        },
        'text-color': {
            type: [String, Boolean],
            required: false,
            default: false
        },
        light: {
            type: Boolean,
            required: false,
            default: false
        },
        dark: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        colorable() {
            const v = {
                class: {
                    dark: this.dark,
                    light: this.light
                },
                style: {}
            }

            if (this.color) {
                v.class[this.color] = true
                // if (!isCssColor(this.color)) v.classes[this.color] = true
                // else v.styles.backgroundColor = this.color
            }

            // || (this.$props.text && this.text)
            if (this.textColor) {
                v.class['text-' + (this.textColor || this.color)] = true
                // if (!isCssColor(this.textColor)) v.classes['text-' + (this.textColor || this.color)] = true
                // else v.styles.color = this.textColor
            }

            return v
        }
    }
}

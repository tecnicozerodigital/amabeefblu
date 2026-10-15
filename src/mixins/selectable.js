export default {
    props: {
        selectable: {
            type: Boolean,
            required: false,
            default: false
        },
        'active-classes': {
            type: [String, Boolean],
            required: false,
            default: false
        }
    },
    data () {
        return {
            selectableCacheValue: false
        }
    },
    computed: {
        selectableClasses () {
            const v = {
                'mk-selectable': this.selectable
            }

            if (this.selectable && this.activeClasses && this.selectableCacheValue) {
                v['mk-color-' + this.activeClasses] = true
            }

            return v
        }
    },
    methods: {
        selectableHandleClick () {
            console.log('selectableHandleClick')
        }
    }
}

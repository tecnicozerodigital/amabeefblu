export default {
    props: {
        elevation: {
            type: [String, Number, Boolean],
            required: false,
            default: null
        }
    },
    computed: {
        elevatable_classes() {
            const elevation = this.elevation
            if (elevation === null || isNaN(parseInt(elevation))) return {}

            return {
                'bxs-elevation': true,
                [`bxs-elevation-${elevation}`]: true
            }
        }
    }
}

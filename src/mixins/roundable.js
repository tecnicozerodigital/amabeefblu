export default {
  props: {
    rounded: {
      type: Boolean,
      required: false,
      default: false
    },
    pill: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    roundClasses () {
      return {
        'mk-rounded': (this.rounded || this.$mk.theme.rounded) && !this.pill,
        'mk-pill': (this.pill || this.$mk.theme.pill) && !this.rounded
      }
    }
  }
}

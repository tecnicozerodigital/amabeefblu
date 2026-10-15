export default {
  props: {
    outlined: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    outlineClasses () {
      return {
        'mk-outlined': this.outlined || this.$mk.theme.outlined
      }
    }
  }
}

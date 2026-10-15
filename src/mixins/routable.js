import {
    useLink
} from 'vue-router'

export default {
    props: {
        to: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        href: {
            type: String,
            required: false,
            default: null
        },
        target: {
            type: String,
            required: false,
            default: '_blank'
        }
    },
    emits: ['click'],
    setup(props) {
        const routerLink = useLink(props)
        console.log(routerLink)
        return { routerLink }
    },
    computed: {
        routable_classes() {
            return {
                'bxs-link': this.routable_local_link,
                'bxs-link-actived': false // link.isExactActive?.value
            }
        },
        routable_local_to() {
            if (!this.to) return null
            return this.to === '/' ? '/' : this.to
        }
    },
    data() {
        return {
            routable_local_link: this.link
        }
    },
    created() {
        this.routable_local_link = this.link || (this.to && this.to.length > 0) || (this.href && this.href.length > 0)
    },
    watch: {
        link(newVal) {
            this.routable_local_link = this.link || (this.to && this.to.length > 0) || (this.href && this.href.length > 0)
        }
    },
    methods: {
        routableHandleClick() {
            if (this.to && this.to.length > 0 && !this.href) {
                this.$router.push(this.routable_local_to)
            }

            if (this.href && this.href.length > 0 && !this.to) {
                window.open(this.href, this.target)
            }

            this.$emit('click')
        }
    }
}

export default {
    props: {
        src: {
            type: String,
            required: false,
            default: null
        },
        alt: {
            type: String,
            required: false,
            default: null
        },
        'fallback-src': {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        mediaHasDefaultSlot() {
            return 'default' in this.$slots
        },
        mediaExistsScr() {
            return this.media.cacheSrc !== null || (this.media.cacheSrc !== null && typeof this.media.cacheSrc === 'string' && this.media.cacheSrc.length > 0)
        },
        mediaExistsFallback() {
            return this.fallbackSrc !== null || (this.fallbackSrc !== null && typeof this.fallbackSrc === 'string' && this.fallbackSrc.length > 0)
        },
        mediableClasses() {
            return {
                'mk-figure-loading': this.media.loading,
                'mk-figure-loaded': this.media.loaded
            }
        },
        mediableStyle() {
            if (this.mediaExistsScr) {
                return { backgroundImage: `url(${this.media.cacheSrc})` }
            }

            return {}
        }
    },
    data() {
        return {
            media: {
                cacheSrc: this.src || this.fallbackSrc,
                w: 0,
                h: 0,
                loading: false,
                loaded: false,
                loadedErr: false
            }
        }
    },
    watch: {
        src() {
            this.media.cacheSrc = this.src
            this.mediaPreload()
        }
    },
    mounted() {
        this.$nextTick(this.mediaPreload)
    },
    methods: {
        mediaPreload() {
            this.media.loading = true
            return new Promise((resolve, reject) => {
                const image = new Image()
                image.src = this.media.cacheSrc
                this.media.loadedErr = false

                if (image.complete) {
                    this.media.w = this.$refs.img.clientWidth
                    this.media.h = this.$refs.img.clientHeight
                    this.media.loaded = true
                    this.media.loading = false
                    resolve({ img: image, width: this.media.w, height: this.media.h })
                } else {
                    image.onload = () => {
                        this.media.w = this.$refs.img.clientWidth
                        this.media.h = this.$refs.img.clientHeight
                        this.media.loaded = true
                        this.media.loading = false

                        resolve({ img: image, width: this.media.w, height: this.media.h })
                    }

                    image.onerror = () => {
                        this.media.loadedErr = true
                        this.media.loading = false

                        resolve({ img: image })
                    }
                }
            })
        }
    }
}

<template>
    <figure
    :class="classes"
    :style="[measurable_styles, ratio_styles]"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)">
        <div
        v-if="!cache_img && !loaded_error"
        ref="img_ratio"
        :data-figure-alt="alt"
        :data-figure-src="src"
        :class="img_ratio_classes"
        :style="img_ratio_styles">
            <span v-if="hasSrc && !hasLazySrc && loading">loading  ...</span>
        </div>

        <img
        ref="img"
        data-scroll-anim-reveal="clip"
        v-show="loading || !loaded_error"
        :class="img_classes"
        :src="img_src"
        :alt="alt"
        :width="w"
        :height="h"
        loading="lazy"
        @load="handleImgLoad" />

        <div
        v-if="overlay"
        class="overlay figure--overlay"></div>

        <div
        v-if="$slots.default"
        class="figure--content">
            <slot />
        </div>

        <div
        v-if="!hasLazySrc && loading"
        class="figure--loading">
            <slot
            v-if="$slots.loading"
            name="loading" />

            <bxs-loader v-else />
        </div>
    </figure>
</template>

<script>
import { isInViewport } from '@/assets/libs/utils'
import { ratio, measurable } from '@/mixins'

export default {
    name: 'bxs-figure',
    mixins: [ratio, measurable],
    props: {
        overlay: {
            type: Boolean,
            required: false,
            default: false
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false
        },
        img: {
            type: Boolean,
            required: false,
            default: false
        },
        'full-height': {
            type: Boolean,
            required: false,
            default: false
        },
        //
        'background-position': { // x y
            type: String,
            required: false,
            default: 'center'
        },
        //
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
        //
        lazy: {
            type: Boolean,
            required: false,
            default: true
        },
        'lazy-src': {
            type: String,
            required: false,
            default: null
        },
        'lazy-delay': {
            type: Number,
            required: false,
            default: 0
        },
        //
        'no-src': {
            type: String,
            required: false,
            default: '/img/logo.svg'
        },
        'error-src': {
            type: String,
            required: false,
            default: '/img/logo.svg'
        }
    },
    computed: {
        hasSrc () {
            return this.cacheSrc !== null || (this.cacheSrc !== null && typeof this.cacheSrc === 'string' && this.cacheSrc.length > 0)
        },
        hasLazySrc () {
            return this.cache_lazy_src !== null || (this.cache_lazy_src !== null && typeof this.cache_lazy_src === 'string' && this.cache_lazy_src.length > 0)
        },
        hasNoSrc () {
            return this.cache_no_src !== null || (this.cache_no_src !== null && typeof this.cache_no_src === 'string' && this.cache_no_src.length > 0)
        },
        hasErrorSrc () {
            return this.cache_error_src !== null || (this.cache_error_src !== null && typeof this.cache_error_src === 'string' && this.cache_error_src.length > 0)
        },
        //
        classes () {
            let v = {
                figure: true,
                'figure–full-height': this.fullHeight,
                'figure-rounded': this.rounded,
                'figure-loading': this.loading,
                'figure-loaded': this.loaded,
                'figure-loaded-error': this.loaded_error,
                'figure-empty': !this.hasSrc,
                'figure-loading-lazy': this.loading && this.hasLazySrc,
                'reveal': true
            }

            if (!!this.ratio && !this.cache_img) {
                v = {
                    ...v,
                    ...this.ratio_classes
                }
            }

            return v
        },
        //
        img_classes () {
            return { 'bxs-hidden': !this.cache_img }
        },
        img_src () {
            if (this.loading) {
                if (this.hasLazySrc) return this.cache_lazy_src
            }

            if (this.loaded) {
                if (this.loaded_error) {
                    if (this.hasErrorSrc) return this.cache_error_src
                }

                if (!this.hasSrc && this.hasNoSrc) return this.cache_no_src
            }

            return this.cacheSrc
        },
        //
        img_ratio_classes () {
            return ['figure--div', 'reveal__img', {
                'r-c': !!this.ratio && !this.cache_img,
                'bxs-hidden': this.cache_img && !!this.ratio
            }]
        },
        img_ratio_styles () {
            const v = {
                backgroundPosition: this.backgroundPosition,
                backgroundImage: `url(${this.img_src})`
            }

            return v
        }
    },
    data () {
        return {
            isInView: false,

            cacheSrc: this.src,
            cache_lazy_src: this.lazySrc,
            cache_no_src: this.noSrc,
            cache_error_src: this.errorSrc,
            //
            w: 0,
            h: 0,
            //
            cache_img: this.img || !this.ratio,
            //
            loading: false,
            loaded: false,
            loaded_error: false
        }
    },
    created () {
        this.start()
    },
    mounted () {
        this.$nextTick(this.play)
    },
    watch: {
        src (newVal) {
            this.cacheSrc = newVal
            this.preload()
        },
        noSrc (newVal) {
            this.cache_no_src = newVal
        },
        errorSrc (newVal) {
            this.cache_error_src = newVal
        },
        img (newVal) {
            this.cache_img = newVal
        }
    },
    methods: {
        start () {
            this.loading = this.lazy && this.hasSrc
            this.loaded = !this.hasSrc
        },
        play () {
            this.isInView = isInViewport(this.$el)

            if (this.lazy) this.preload()

            // document.addEventListener('scroll', () => {
            //     if (isInViewport(this.$el) && !this.loaded) {
            //         this.$nextTick(() => {
            //             this.preload()
            //         })
            //     }
            // }, {
            //     passive: true
            // })
        },
        handleImgLoad (evt) {
            // console.log('img loaded', evt)
            this.$emit('img-load', this.cacheSrc)
        },
        preload () {
            if (!this.hasSrc) return

            this.loading = true
            this.loaded_error = false

            this.$emit('loading')

            return new Promise((resolve, reject) => {
                // console.log('preload', this.cacheSrc)

                const image = new Image()
                image.src = this.cacheSrc

                if (image.complete) {
                    // this.w = this.$refs.img.clientWidth
                    // this.h = this.$refs.img.clientHeight

                    this.loaded = true
                    this.loading = false

                    this.$emit('loaded')
                    resolve({ img: image, width: this.w, height: this.h })
                }

                image.onload = (evt) => {
                    // console.log('bxs-figure onload', evt)

                    // this.w = evt.path[0].naturalWidth
                    // this.h = evt.path[0].naturalHeight

                    setTimeout(() => {
                        this.loaded = true
                        this.loading = false

                        this.$emit('loaded')
                        resolve({ img: image, width: this.w, height: this.h })
                    }, this.lazyDelay)
                }

                image.onerror = (evt) => {
                    // console.log('bxs-figure onerror', evt)
                    // this.w = evt.path[0].naturalWidth
                    // this.h = evt.path[0].naturalHeight

                    setTimeout(() => {
                        this.loaded_error = true
                        this.loaded = true
                        this.loading = false

                        this.$emit('loaded-error')
                        resolve({ img: image })
                    }, this.lazyDelay)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";

.figure {
    position: relative;
    display: block;
    width: 100%;
    background-color: var(--figure-background-color);
    overflow: hidden;
    transform: translateZ(0);           /* GPU per trasformazioni */
    will-change: transform;

    &.figure-rounded {
        border-radius: var(--figure-border-radius);
    }

    &.figure–full-height {
        height: 100%;
    }

    &.figure-loading {
        > .figure--div {
        }
    }

    &.figure-loading-lazy {
    }

    &.figure-loaded {
        > .figure--div {
        }
    }

    &.figure-loaded-error {
        > .figure--div {
        }
    }

    &.figure-empty {
        > .figure--div {
            background-size: 50%;
        }
    }

    &--div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        background-size: cover;
        background-repeat: no-repeat;

        z-index: 1;
    }

    > img {
        z-index: 1;
    }

    &--overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        pointer-events: none;
        z-index: 2;

        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(
                to top,
                rgba(#000, 0.4) 0%,
                rgba(#fff, 0) 100%
            );
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

    &--content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
    }

    &--loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--figure-background-color);

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        text-align: center;

        z-index: 4;
    }
}
</style>
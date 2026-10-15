<template>
    <section class="hero-comp">
        <div class="hero-comp--carousel">
            <home-carousel
            :slides="imgs"
            :slidesToShow="slidesToShow"
            :clip-class="slideClipClass" />
        </div>

        <!--  -->
        <div
        v-if="overlay"
        class="hero-comp--overlay"></div>

        <!--  -->
        <p-section-divider color="tertiary" />

        <bxs-layout>
            <bxs-row>
                <bxs-col
                cols="12"
                ds="7"
                offset-ds="5">
                    <slot />
                </bxs-col>
            </bxs-row>
        </bxs-layout>
    </section>
</template>

<script>
import HomeCarousel from './HomeCarousel.vue'

export default {
    name: 'hero',
    components: {
        'home-carousel': HomeCarousel
    },
    props: {
        'slide-clip-class': {
            type: String,
            required: false,
            default: 'clip-main'
        },
        imgs: {
            type: Array,
            required: false,
            default: () => []
        },
        'src-left': {
            type: String,
            required: false,
            default: null
        },
        'src-right': {
            type: String,
            required: false,
            default: null
        },
        'slides-to-show': {
            type: [String, Number],
            required: false,
            default: 2
        },
        overlay: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

section {
    padding: 0;
}

.hero-comp {
    position: relative;
    width: 100vw;
    height: 100svh;
    min-height: calc(var(--vh, 1vh) * 100);

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    @include mq($mq-static-breakpoint) {
        justify-content: center;
    }

    // overflow: hidden;

    &--carousel {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &--overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#EBCCB3, 0.5);
        z-index: 2;
        pointer-events: none;
    }

    .bxs-layout {
        z-index: 3;
        padding-top: var(--navbar-height);

        @include mq($mq-static-breakpoint) {
            padding-top: 0;
        }
    }
}
</style>
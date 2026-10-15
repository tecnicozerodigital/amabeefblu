<template>
    <a
    class="card-comp"
    :href="href"
    :target="target">
        <div
        :class="ratio_classes"
        :style="ratio_styles">
            <!-- clip-5 -->
            <div
            ref="img"
            data-scroll-anim-reveal="clip"
            class="card-comp--img clip-8"
            :style="{ backgroundImage: `url(${src})` }"></div>
        </div>

        <div class="card-comp--main">
            <div
            v-if="$mq.from('ds')"
            class="card-comp--main--visible">
                <!-- <p-divider
                width="120"
                :color="overlayTextColor"
                style="transform: translateY(-100%);" /> -->

                <h4
                class="text-ui text-500 text-uppercase mb-4 py-ui"
                style="font-size: 0.9rem;">{{ title }}</h4>
            </div>

            <div
            ref="content"
            class="anim card-comp--main--hidden py-ui"
            :style="$mq.from('ds') ? {
                backgroundImage: `linear-gradient(
                    to bottom,
                    rgba(255,255,255,0) 0,
                    var(--color-${overlayBgColor}) 30%
                )`
            } : null">
                <div :class="$mq.from('ds') ? 'text-' + overlayTextColor : null">
                    <h3
                    class="h6 text-ui text-500 text-uppercase mb-4"
                    style="font-size: 0.95rem;">{{ title }}</h3>

                    <p class="small text-o-mute mb-4">{{ text }}</p>

                    <!-- :to="to" -->
                    <btn
                    v-if="!hideButton"
                    :href="href"
                    :target="target"
                    small>{{ btnLabel }}</btn>

                    <!-- <p-divider :color="overlayTextColor"></p-divider> -->
                </div>
            </div>
        </div>
    </a>
</template>

<script>
import { ratio } from '@/mixins'

export default {
    name: 'card_comp',
    mixins: [ratio],
    props: {
        src: String,
        title: String,
        text: String,
        href: String,
        to: String,
        target: {
            type: String,
            required: false,
            default: '_blank'
        },
        'btn-label': {
            type: String,
            required: false,
            default: 'Visualizza'
        },
        'hide-button': {
            type: Boolean,
            required: false,
            default: false
        },
        'overlay-bg-color': {
            type: String,
            required: false,
            default: 'background'
        },
        'overlay-text-color': {
            type: String,
            required: false,
            default: 'typo'
        },
        'text-color': {
            type: String,
            required: false,
            default: 'typo'
        },
        ratio: {
            type: [String, Number, Boolean],
            required: false,
            default: '2-3'
        },
        'ratio-mobile': {
            type: [String, Number, Boolean],
            required: false,
            default: '4-3'
        },
    },
    data () {
        return {
            anim: null
        }
    },
    mounted () {
        this.$nextTick(this.start)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

.card-comp {
    display: inline-block;
    position: relative;
    text-decoration: none;
    width: 100%;
    max-width: 320px;

    cursor: pointer;

    @include mq($mq-static-breakpoint) {
        overflow: hidden;
    }

    @media (hover: hover) {
         &:hover {
            .card-comp--img {
                transform: scale(0.95);
            }

            .card-comp--main--hidden {
                @include mq($mq-static-breakpoint) {
                    transform: translateY(0);
                    transition-duration: 0.3s;
                }
            }
        }
    }

    &--img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        z-index: 0;
        transition: transform 0.2s ease-out;
    }

    &--main {
        z-index: 2;

        // &--visible {
        // }

        &--hidden {
            text-align: left;
            transition: transform 0.5s ease-out;

            @include mq($mq-static-breakpoint) {
                transform: translateY(100%);
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 55%;
                display: flex;
                flex-flow: column nowrap;
                justify-content: flex-end;
                z-index: 1;
            }
        }
    }

    &--overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        // background-color: rgba(#000, 0.75);
        background-image: linear-gradient(
            to bottom,
            rgba(#fff, 0) 0,
            rgba(#000, 1) 100%
        );
        pointer-events: none;
        z-index: 1;
    }
}
</style>
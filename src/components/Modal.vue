<template>
    <div class="bxs-modal">
        <div
        v-if="$slots.activator"
        class="bxs-modal--activator">
            <slot
            name="activator"
            :on="{
                click: () => local_on = !local_on
            }"
            :attrs="{
                role: 'button',
                'aria-haspopup': true,
                'aria-expanded': false
            }" />
        </div>

        <transition
        @enter="enter"
        @leave="leave"
        mode="out-in"
        :css="false">
            <div
            v-if="local_on"
            class="bxs-modal--modal"
            :style="modal_styles"
            @click.self="_closeFromBg">
                <bxs-layout
                ref="container"
                fluid
                :max-width="maxWidth"
                class="bxs-modal--modal--container"
                :style="{ height: maxHeight }">
                    <!-- header -->
                    <div
                    class="bxs-modal--modal--container--header"
                    :style="color ? { backgroundColor: color } : {}">
                        <div class="bxs-modal--modal--container--header--inner pa-ui">
                            <div class="flex-1">
                                <slot name="header" />
                            </div>

                            <bxs-icon
                            v-if="!hideClose"
                            name="close"
                            @click="close" />
                        </div>

                        <slot name="subheader" />
                    </div>

                    <!-- body -->
                    <div
                    class="bxs-modal--modal--container--body bxs-scrollable"
                    :style="color ? { backgroundColor: color } : {}">
                        <slot />
                    </div>

                    <!-- actions -->
                    <div
                    v-if="!!$slots.actions"
                    class="bxs-modal--modal--container--actions"
                    :style="color ? { backgroundColor: color } : {}">
                        <slot
                        name="actions"
                        :on="{
                            click: () => local_on = !local_on
                        }"
                        :attrs="{
                            role: 'button',
                            'aria-haspopup': true,
                            'aria-expanded': false
                        }" />
                    </div>
                </bxs-layout>
            </div>
        </transition>
    </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
    name: 'modal',
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false
        },
        'max-width': {
            type: [String, Number],
            required: false,
            default: 512
        },
        persistent: {
            type: Boolean,
            required: false,
            default: false
        },
        'hide-close': {
            type: Boolean,
            required: false,
            default: false
        },
        'overlay-opacity': {
            type: [String, Number],
            required: false,
            default: 0.8
        },
        'z-index': {
            type: [String, Number],
            required: false,
            default: null
        },
        color: {
            type: String,
            required: false,
            default: null
        },
        'max-height': {
            type: [Number, String],
            required: false,
            default: 'auto'
        }
    },
    emits: [
        'update:modelValue',
        'change',
        'close'
    ],
    computed: {
        modal_styles () {
            const v = {
                backgroundColor: `rgba(0, 0, 0, ${this.overlayOpacity})`
            }

            if (this.zIndex) v.zIndex = this.zIndex

            return v
        }
    },
    data () {
        return {
            local_on: this.modelValue
        }
    },
    watch: {
        modelValue (newVal) {
            this.local_on = newVal
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.local_on = this.modelValue
        })
    },
    methods: {
        _closeFromBg () {
            if (this.persistent) return
            this.close()
        },
        close () {
            this.local_on = false
            this.$emit('update:modelValue', this.local_on)
            this.$emit('close')
        },
        enter (el, next) {
            this.$nextTick(() => {
                // gsap.to(el, {
                //     backgroundColor: 'rgba(0, 0, 0, 0.65)',
                //     duration: 0.5,
                //     ease: 'expo.out'
                // })
                const container_el = this.$refs.container.$el

                gsap.fromTo(el, {
                    // y: -10,
                    autoAlpha: 0
                },
                {
                    // y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: 'expo.out'
                })

                gsap.fromTo(container_el, {
                    y: -20,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.5,
                    ease: 'expo.out',
                    onComplete: () => next()
                })
            })
        },
        leave (el, next) {
            gsap.to(el, {
                // y: 10,
                autoAlpha: 0,
                duration: 0.5,
                ease: 'expo.out',
                onComplete: () => next()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

.bxs-modal {
    &--activator {
        position: relative;
    }

    &--modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;

        padding: var(--modal-padding);
        z-index: var(--layer-modal);

        &--container {
            display: flex;
            flex-direction: column;
            padding-left: 0;
            padding-right: 0;
            min-height: 50vh;
            -webkit-box-shadow: 0px 0px 15px 0px rgba(#000, 0.25);
            box-shadow: 0px 0px 15px 0px rgba(#000, 0.25);

            // @include mq(ds) {
            //     height: 90vh;
            // }

            &--header {
                background-color: var(--color-background);
                border-radius: var(--modal-border-radius);
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                border-bottom: 1px solid var(--divider-color);
                z-index: 2;

                &--inner {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: space-between;
                    align-items: flex-start;
                }
            }

            &--body {
                position: relative;
                flex: 1;
                height: auto;
                background-color: var(--color-background);
                z-index: 1;
            }

            &--actions {
                position: relative;
                margin-top: auto;
                min-height: var(--list-item-min-height);
                background-color: var(--color-background);
                border-top: 1px solid var(--divider-color);
                z-index: 2;
            }
        }
    }
}
</style>
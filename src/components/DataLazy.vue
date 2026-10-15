<template>
    <div :class="['bxs-await', {
        'bxs-await-loading': loading
    }]">
        <transition
        name="lazy-trans"
        mode="out-in">
            <div
            v-if="loading"
            class="text-center pa-layout vue-content-placeholders-is-rounded vue-content-placeholders-is-animated">
                <bxs-card
                :ratio="ratio"
                :min-width="minWidth"
                :min-height="minHeight"
                style="background: transparent;">
                    <div class="flex nowrap column justify-center align-between">
                        <div class="vue-content-placeholders-heading vue-content-placeholders-heading__title"></div>
                        <div class="vue-content-placeholders-heading vue-content-placeholders-heading__subtitle"></div>
                        <div class="vue-content-placeholders-text vue-content-placeholders-text__line" />
                    </div>
                </bxs-card>
            </div>

            <div v-else-if="!loading && data">
                <slot
                :data="data"
                :call="start"
                :error="error" />
            </div>

            <div
            v-else-if="!loading && error"
            class="pa-ui text-center">
                <p class="text-600s">Ops, errore {{ error.status_code }}</p>
                <p class="mb-6">{{ error.message || error.code }}</p>

                <div v-if="$slots.actions">
                    <slot name="actions" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { promiseAllProperties } from '@/assets/libs/utils'

export default {
    name: 'bxs-await',
    props: {
        modelValue: {
            type: [Object, Array, Boolean, String, Function, File],
            required: false,
            default: false
        },
        promises: {
            type: [Function, Object],
            required: false,
            default: null
        },
        delay: {
            type: [String, Number],
            required: false,
            default: 0
        },
        'loading-message': {
            type: String,
            required: false,
            default: null
        },
        ratio: {
            type: String,
            required: false,
            default: null
        },
        'min-width': {
            type: [String, Number],
            required: false,
            default: null
        },
        'min-height': {
            type: [String, Number],
            required: false,
            default: null
        },
        'in-scroll': {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: [
        'update:modelValue',
        'success',
        'error'
    ],
    data () {
        return {
            loading: true,
            data: null,
            error: null
        }
    },
    created () {
        this.start()
    },
    methods: {
        start () {
            this.data = null

            if (this.promises) {
                this.error = null

                if (this.inScroll) {
                    this.handleScroll()
                    window.addEventListener('scroll', this.handleScroll)
                } else {
                    this.call()
                }
            }
        },
        play () {
            this.start()
        },
        call () {
            if (typeof this.promises === 'object') {
                    promiseAllProperties(this.promises).then((res) => {
                    setTimeout(() => {
                        this.$emit('success', res)
                        this.data = res
                        this.loading = false

                        this.$emit('update:modelValue', res)
                    }, this.delay)
                }).catch((err) => {
                    setTimeout(() => {
                        this.$emit('error', err)
                        this.error = err
                        this.loading = false
                    }, this.delay)
                })
            } else {
                this.promises().then((res) => {
                    setTimeout(() => {
                        this.$emit('success', res)
                        this.data = res
                        this.loading = false

                        this.$emit('update:modelValue', res)
                    }, this.delay)
                }).catch((err) => {
                    setTimeout(() => {
                        this.$emit('error', err)
                        this.error = err
                        this.loading = false
                    }, this.delay)
                })
            }
        },
        handleScroll () {
            if (this.elementIsInViewport) {
                this.call()
            }
        },
        elementIsInViewport () {
            const rect = this.$el.getBoundingClientRect()

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
            )
        }
    }
}
</script>

<style lang="scss">
.bxs-await {
    width: 100%;
    height: 100%;

    > div {
        height: 100%;

        > div {
            height: 100%;
        }
    }
}

.lazy-trans-enter-active,
.lazy-trans-leave-active {
    transition: opacity 0.2s ease, trasform 0.2s ease;
}

.lazy-trans-enter-from,
.lazy-trans-leave-to {
    opacity: 0.1;
    transform: translateX(-5px);
}
</style>
<template>
    <div :class="classes" :style="styles" @click="onClick" :id="id">
        <div class="bxs-card--body">
            <div v-if="overlay" class="bxs-overlay bxs-card--body--overlay"></div>

            <div class="bxs-card--body--cnt">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import { ratio, measurable, base } from '@/mixins'

export default {
    name: 'bxs-card',
    mixins: [ratio, measurable, base],
    props: {
        'no-padding': {
            type: Boolean,
            required: false,
            default: false
        },
        'allow-overflow': {
            type: Boolean,
            required: false,
            default: true
        },
        src: {
            type: String,
            required: false,
            default: null
        },
        overlay: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: null
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false
        },
        gradient: {
            type: Boolean,
            required: false,
            default: true
        },
        elevation: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        hoverable: {
            type: Boolean,
            required: false,
            default: false
        },
        actived: {
            type: Boolean,
            required: false,
            default: false
        },
        inline: {
            type: Boolean,
            required: false,
            default: false
        },
        color: {
            type: String,
            required: false,
            default: null
        },
        light: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        classes() {
            return [
                'bxs-card',
                {
                    ...this.ratio_classes,
                    light: this.light,
                    ['bxs-card-' + this.color]: !!this.color,
                    'bxs-card-outlined': this.outlined,
                    'bxs-card-actived': this.actived,
                    'bxs-rounded': this.rounded,
                    'bxs-elevation': this.elevation,
                    'bxs-disabled': this.disabled,
                    'bxs-link': !!this.to || !!this.$attrs.onClick,
                    'bxs-no-padding': this.noPadding,
                    'bxs-card-gradient': this.gradient,
                    'bxs-card-hoverable': this.hoverable || !!this.to || !!this.$attrs.onClick,
                    'bxs-overflow-hidden': this.allowOverflow,
                    'bxs-card-inline': this.inline
                }
            ]
        },
        styles() {
            const v = {
                ...this.measurable_styles,
                ...this.ratio_styles
            }
            if (this.src) v.backgroundImage = 'url(' + this.src + ')'
            return v
        }
    },
    methods: {
        onClick() {
            if (this.to) this.$router.push(this.to)
        }
    }
    // mounted () {
    //     console.log(this)
    // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/conf.scss';

.bxs-card {
    position: relative;
    width: 100%;
    border-radius: var(--card-border-radius);
    background-color: var(--card-background-color);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: var(--card-box-shadow);

    @each $key, $value in $colors {
        &.bxs-card-#{$key} {
            background-color: var(--color-#{$key});
        }
    }

    &.bxs-card-inline {
        display: inline-block;
    }

    &.bxs-card-outlined {
        background-color: var(--color-background);
        border: 1px solid transparent;
    }

    &.bxs-disabled {
        background-color: var(--color-disabled);
    }

    &.bxs-card-actived {
        border-color: var(--color-primary);
        background-color: var(--card-background-color);
    }

    &.bxs-no-padding {
        padding: 0;

        .bxs-card--body--cnt {
            padding: 0
        }
    }

    &.bxs-overflow-hidden {
        overflow: hidden;

        >.bxs-card--body {
            overflow: hidden;
        }
    }

    &.bxs-card-gradient {
        box-shadow: var(--card-box-shadow);
        // background-image: linear-gradient(
        //     0deg,
        //     var(--color-secondary),
        //     var(--color-primary),
        // );
    }

    &.bxs-card-hoverable {
        &:hover {
            border-color: var(--color-primary);
        }
    }

    &--body {
        height: 100%;

        &--overlay {
            z-index: 0;
        }

        &--cnt {
            position: relative;
            height: 100%;
            padding: var(--card-padding-y) var(--card-padding-x);
        }
    }
}
</style>

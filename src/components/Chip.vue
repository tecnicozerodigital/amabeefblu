<template>
    <div
    :class="classes"
    :style="styles"
    @click="routableHandleClick">
        <bxs-icon
        v-if="prependIcon"
        :name="prependIcon"
        class="bxs-btn-icon-prepend" />

        <div class="bxs-chip--content">
            <slot />
        </div>

        <bxs-icon
        v-if="appendIcon"
        :name="appendIcon"
        class="bxs-btn-icon-append" />
    </div>
</template>

<script>
import {
    routable,
    colorable,
    measurable
} from '@/mixins'

export default {
    name: 'bxs-chip',
    mixins: [routable, colorable, measurable],
    props: {
        'prepend-icon': {
            type: String,
            required: false,
            default: null
        },
        'append-icon': {
            type: String,
            required: false,
            default: null
        },
        color: {
            type: String,
            required: false,
            default: null
        },
        small: {
            type: Boolean,
            required: false,
            default: false
        },
        'x-small': {
            type: Boolean,
            required: false,
            default: false
        },
        large: {
            type: Boolean,
            required: false,
            default: false
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        },
        tile: {
            type: Boolean,
            required: false,
            default: false
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        uppercase: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        classes () {
            return ['bxs-chip', {
                'bxs-chip-outlined': this.outlined,
                'bxs-chip-small': this.small,
                'bxs-chip-x-small': this.xSmall,
                'bxs-chip-large': this.large,
                'bxs-chip-tile': this.tile,
                'text-uppercase': this.uppercase,
                'bxs-chip-rounded': this.rounded,
                ...this.routable_classes,
                ...this.colorable.classes
            }]
        },
        styles () {
            return this.measurable_styles
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/conf.scss';

.bxs-chip {
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    font-size: var(--chip-font-size);
    font-weight: var(--chip-font-weight);
    min-height: var(--chip-min-height);
    line-height: normal;
    padding: var(--chip-padding-y) var(--chip-padding-x);
    background-color: var(--chip-background-color);
    white-space: nowrap;
    overflow: hidden;
    text-transform: var(--chip-text-transform);
    border-radius: var(--chip-border-radius);
    border: var(--thickness) solid transparent;
    user-select: none;
    text-align: center;
    color: var(--chip-color);
    transform: transform 0.5s ease-out, background-color 0.25s ease, color 0.25s ease;

    &--content {
        // transform: translateY(1px);
    }

    &:hover {
        &.bxs-link {
            border-color: transparent !important;
            color: var(--button-color-active) !important;
            background-color: var(--button-hover-background-color) !important;
        }
    }

    @each $key, $value in $colors {
        &.bxs-chip-#{$key} {
            &.bxs-chip-outlined {
                background-color: transparent;
                border-color: var(--color-#{$key});
                color: var(--color-#{$key});
            }
        }
    }

    &.bxs-chip-tile {
        border-radius: 0;
    }

    &.bxs-chip-rounded {
        border-radius: calc(var(--radius) / 2);
    }

    &.bxs-chip-outlined {
        border: var(--thickness) solid currentColor;
        background: transparent;
        color: currentColor;
    }

    &.bxs-chip-x-small {
        min-height: unset;
        font-size: calc(var(--chip-font-size) / 1.4);
        padding: calc(var(--chip-padding-y) / 1.4) calc(var(--chip-padding-x) / 1.4);
    }

    &.bxs-chip-small {
        min-height: unset;
        font-size: calc(var(--chip-font-size) / 1.2);
        padding: calc(var(--chip-padding-y) / 1.2) calc(var(--chip-padding-x) / 1.2);
    }

    &.bxs-chip-large {
        font-size: calc(var(--chip-font-size) * 1.4);
        padding: calc(var(--chip-padding-y) * 1.4) calc(var(--chip-padding-x) * 1.4);
    }
}
</style>
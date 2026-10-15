<template>
    <li
    :class="classes"
    :style="styles"
    @click="$emit('click')">
        <router-link
        v-if="to"
        :to="to"
        :exact="exact"
        :disabled="disabled"
        class="bxs-list-item--content">
            <bxs-icon
            v-if="prependIcon || !!$slots.prependIcon"
            :name="prependIcon"
            :disabled="disabled"
            class="bxs-list-item-icon-prepend" />

            <span class="flex-1">
                <slot />
            </span>

            <bxs-icon
            v-if="appendIcon"
            :name="appendIcon"
            :disabled="disabled"
            class="bxs-list-item-icon-append" />

            <slot name="action" />
        </router-link>

        <a
        v-else-if="href"
        :href="href"
        :target="target"
        :exact="exact"
        :disabled="disabled"
        class="bxs-list-item--content">
            <bxs-icon
            v-if="prependIcon"
            :name="prependIcon"
            :disabled="disabled"
            class="bxs-list-item-icon-prepend" />

            <span class="flex-1">
                <slot />
            </span>

            <bxs-icon
            v-if="appendIcon"
            :name="appendIcon"
            :disabled="disabled"
            class="bxs-list-item-icon-append" />

            <slot name="action" />
        </a>

        <div
        v-else
        class="bxs-list-item--content">
            <bxs-icon
            v-if="prependIcon"
            :name="prependIcon"
            :disabled="disabled"
            class="bxs-list-item-icon-prepend" />

            <span class="flex-1">
                <slot />
            </span>

            <bxs-icon
            v-if="appendIcon"
            :name="appendIcon"
            :disabled="disabled"
            class="bxs-list-item-icon-append" />

            <slot name="action" />
        </div>

        <bxs-divider v-if="divider"></bxs-divider>
    </li>
</template>

<script>
import {
    colorable,
    routable,
    measurable
} from '@/mixins'

export default {
    name: 'bxs-list-item',
    emits: ['click'],
    mixins: [
        colorable,
        measurable,
        routable
    ],
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
        'two-line': {
            type: Boolean,
            required: false,
            default: false
        },
        divider: {
            type: Boolean,
            required: false,
            default: false
        },
        tile: {
            type: Boolean,
            required: false,
            default: false
        },
        truncate: {
            type: Boolean,
            required: false,
            default: false
        },
        collapse: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        exact: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {
        classes () {
            return ['bxs-list-item', {
                'bxs-list-item-to': !!this.to,
                'bxs-list-item-link': this.link || !!this.to || !!this.href || 'onClick' in this.$attrs,
                'bxs-list-item-prepend-icon': this.prependIcon,
                'bxs-list-item-append-icon': this.appendIcon,
                'bxs-list-item-disabled': !!this.disabled,
                'bxs-list-item-two-line': this.twoLine,
                'bxs-disabled': !!this.disabled,
                'bxs-tile': this.tile,
                'bxs-truncate': this.truncate,
                ...this.colorable.classes,
                ...this.routable_classes
            }]
        },
        styles () {
            return this.measurable_styles
        }
    }
}
</script>

<style lang="scss" scoped>
.bxs-list-item {
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: var(--list-item-min-height);
    font-size: var(--list-item-font-size);
    background-color: var(--list-item-background-color);
    border-radius: var(--list-item-border-radius);
    overflow: hidden;
    font-weight: var(--list-item-font-weight);
    text-align: left;
    text-transform: var(--list-item-text-transform);
    list-style: none;

    // @media (hover: hover) and (pointer: fine) {
    //     &:hover {
    //         &.bxs-link {
    //             background-image: linear-gradient(rgb(0 0 0/10%) 0 0);
    //         }
    //     }
    // }

    &.bxs-list-item-two-line {
        min-height: calc(var(--list-item-min-height) * 1.25);

        > .bxs-list-item--content {
            min-height: calc(var(--list-item-min-height) * 1.25);
        }
    }

    &.bxs-list-item-disabled {
        color: var(--color-disabled);
    }

    &--content {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        flex: 1;
        min-height: var(--list-item-min-height);

        font-size: inherit !important;
        font-weight: inherit !important;
        text-decoration: none;

        width: 100%;
        height: 100%;
        padding-top: var(--list-item-padding-y);
        padding-bottom: var(--list-item-padding-y);
        padding-left: var(--list-item-padding-x);
        padding-right: var(--list-item-padding-x);
    }

    .bxs-icon {
        width: var(--list-item-icon-nest-size) !important;
        height: var(--list-item-icon-nest-size) !important;
        transform: translateY(-1px);

        &.bxs-list-item-icon-prepend {
            margin-right: var(--list-item-icon-margin-x);
        }

        &.bxs-list-item-icon-append {
            margin-left: var(--list-item-icon-margin-x);
        }
    }
}
</style>
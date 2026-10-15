<template>
    <div
    :class="classes"
    :style="styles">
        <slot />
    </div>
</template>

<script>
import { measurable } from '@/mixins'

export default {
    name: 'bxs_avatar',
    mixins: [measurable],
    props: {
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
        tile: {
            type: Boolean,
            required: false,
            default: false
        },
        src: {
            type: String,
            required: false,
            default: null
        }
    },
    computed: {
        classes () {
            return ['bxs-avatar', {
                'bxs-avatar-small': this.small,
                'bxs-avatar-x-small': this.xSmall,
                'bxs-avatar-large': this.large,
                'bxs-avatar-tile': this.tile
            }]
        },
        styles () {
            const v = {
                ...this.measurable_styles
            }

            if (this.src) v.backgroundImage = 'url(' + this.src + ')'

            return v
        }
    }
}
</script>

<style lang="scss" scoped>
.bxs-avatar {
    display: inline-flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    width: var(--avatar-size);
    height: var(--avatar-size);

    border-radius: 50%;
    overflow: hidden;
    background-color: var(--avatar-background-color);

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    overflow: hidden;

    * {
        margin: 0;
        padding: 0;
    }

    &.bxs-avatar-x-small {
        width: calc(var(--avatar-size) / 1.75);
        height: calc(var(--avatar-size) / 1.75);
    }

    &.bxs-avatar-small {
        width: calc(var(--avatar-size) / 1.5);
        height: calc(var(--avatar-size) / 1.5);
    }

    &.bxs-avatar-large {
        width: calc(var(--avatar-size) * 1.5);
        height: calc(var(--avatar-size) * 1.5);
    }

    &.bxs-avatar-tile {
        border-radius: var(--avatar-border-radius);
    }
}
</style>
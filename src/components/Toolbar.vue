<template>
    <div
    v-sticky="sticky"
    :class="classes"
    :style="measurable_styles">
        <slot />
    </div>
</template>

<script>
import { measurable, colorable } from '@/mixins'

export default {
    name: 'bxs-toolbar',
    mixins: [measurable, colorable],
    props: {
        flat: {
            type: Boolean,
            required: false,
            default: false
        },
        tile: {
            type: Boolean,
            required: false,
            default: false
        },
        sticky: {
            type: Boolean,
            required: false,
            default: false
        },
        pill: {
            type: Boolean,
            required: false,
            default: false
        },
        depressed: {
            type: Boolean,
            required: false,
            default: false
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    computed: {
        classes () {
            return ['bxs-toolbar', {
                'bxs-toolbar-flat': this.flat,
                'bxs-toolbar-pill': this.pill,
                'bxs-toolbar-tile': this.tile,
                'bxs-toolbar-outlined': this.outlined,
                'bxs-outlined': this.outlined,
                'bxs-toolbar-depressed': this.depressed,
                ...this.colorable.classes
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/conf.scss';

.bxs-toolbar {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    max-width: var(--boxed-ui);
    min-height: var(--toolbar-height);
    margin: 0 auto;
    background-color: var(--toolbar-background-color);
    color: var(--toolbar-color);
    padding: var(--toolbar-padding-y) var(--toolbar-padding-x);
    border-radius: var(--toolbar-border-radius);
    box-shadow: var(--box-shadow);

    transition: max-width 0.3s ease-out;

    &.bxs-toolbar-flat {
        background-color: transparent;
    }

    &.bxs-toolbar-outlined {
        border: var(--thickness) var(--border-type) currentColor;
        background-color: transparent;
        color: currentColor;
    }

    &.bxs-toolbar-tile {
        border-radius: 0;
    }

    &.bxs-toolbar-depressed {
        box-shadow: none;
    }

    &.bxs-toolbar-pill {
        border-radius: var(--pill);
    }
}
</style>
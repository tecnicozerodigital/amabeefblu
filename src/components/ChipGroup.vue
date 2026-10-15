<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script>
import { colorable } from '@/mixins'

export default {
    name: 'bxs-chip-group',
    mixins: [colorable],
    computed: {
        classes () {
            return [
                'bxs-chip-group',
                this.colorable.classes
            ]
        }
    }
}
</script>

<style lang="scss">
.bxs-chip-group {
    .bxs-chip {
        margin-right: 0.5rem;

        &:last-child {
            margin-right: 0;
        }
    }
}
</style>

<style lang="scss" scoped>
.bxs-chip-group {
    position: relative;
    border-radius: var(--chip-group-border-radius);
    background-color: var(--chip-group-background-color);
    padding-right: 25%;

    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }

    &.top-sticky {
        padding: 1rem 0;
        background-color: var(--color-background);
        // border-bottom: 1px solid black;
    }
}
</style>
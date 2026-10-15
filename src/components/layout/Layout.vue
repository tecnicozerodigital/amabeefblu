<template>
    <div
    :class="classes"
    :style="{
        ...measurable_styles,
        '--max-cols': $mq.gte.dm ? maxCols : 12
    }">
        <slot />
    </div>
</template>

<script>
import { measurable } from '@/mixins'

export default {
    name: 'bxs-layout',
    mixins: [measurable],
    props: {
        fluid: {
            type: Boolean,
            required: false,
            default: false
        },
        'max-cols': {
            type: [String, Number],
            required: false,
            default: 12
        }
    },
    computed: {
        classes () {
            return ['bxs-layout', {
                'bxs-layout-fluid': this.fluid
            }]
        }
    }
}
</script>

<style lang="scss">
.bxs-layout {
    position: relative;
    width: 100%;
    // max-width: calc(8.3333333333% * var(--max-cols)) !important;
    max-width: calc(8.3333333333% * var(--max-cols));

    margin-left: auto;
    margin-right: auto;

    padding-left: var(--size-layout);
    padding-right: var(--size-layout);

    // border: 1px solid red;

    &.bxs-layout-fluid {
        max-width: 100%;
    }
}
</style>

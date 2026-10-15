<template>
    <span
    :class="['bxs-icon', {
        'bxs-icon-disabled': !!disabled,
        'bxs-disabled': !!disabled,
        ...routable_classes,
        ...colorable.classes
    }]"
    :style="measurable_styles"
    @click="routableHandleClick">
        <svg
        ref="svg"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16">
            <path
            v-if="name"
            :d="$store.state.icons[name]" />

            <slot />
        </svg>
    </span>
</template>

<script>
import { routable, measurable, colorable } from '@/mixins'

export default {
    name: 'bxs-icon',
    mixins: [routable, measurable, colorable],
    props: {
        name: {
            type: String,
            required: false,
            default: null
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.bxs-icon {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: var(--icon-size);
    height: var(--icon-size);
    color: var(--icon-color);
    transform: translateY(-1px);

    > svg {
        width: 100%;
        height: 100%;
    }

    &.bxs-icon-disabled {
    }
}
</style>
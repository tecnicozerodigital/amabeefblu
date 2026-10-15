<template>
    <div
    v-sticky="sticky"
    class="bxs-top-navigation">
        <bxs-toolbar color="background">
            <slot name="undo">
                <bxs-btn
                icon
                color="black"
                @click="$router.go(-1)">
                    <bxs-icon name="chevron-left"></bxs-icon>
                </bxs-btn>
            </slot>

            <div class="bxs-top-navigation--body bxs-truncate">
                <h5 class="mb-0">
                    <slot />
                </h5>
            </div>

            <slot name="append" />
        </bxs-toolbar>

        <slot name="append-outer" />
    </div>
</template>

<script>
export default {
    name: 'bxs-top-navigation',
    props: {
        sticky: {
            type: Boolean,
            required: false,
            default: true
        }
    }
}
</script>

<style lang="scss" scoped>
.bxs-top-navigation {
    position: relative;

    > .bxs-toolbar {
        justify-content: space-between;
    }

    &--body {
        position: absolute;
        width: calc(80% - var(--size-layout));
        flex: 1;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        pointer-events: none;
    }
}
</style>
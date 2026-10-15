<template>
    <div :class="['bxs-alert', {
        ['bxs-alert-' + type]: type,
        'bxs-alert-tile': tile
    }]"
    @click="on = true">
        <div>
            <slot />
        </div>

        <bxs-menu
        v-if="explainable"
        v-model="on"
        title="Avviso"
        solo>
            <div class="pa-layout">
            </div>
        </bxs-menu>

        <div v-if="$slots.actions">
            <slot name="actions" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'alert',
    props: {
        type: {
            type: String,
            required: false,
            default: 'info'
        },
        tile: {
            type: Boolean,
            required: false,
            default: false
        },
        explainable: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            on: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/conf.scss';

.bxs-alert {
    display: block;
    border-left: 4px solid transparent;
    border-radius: var(--radius);

    &.bxs-alert-info {
        border-left-color: darken(map-get($colors, 'info'), 25%);
        background-color: lighten(map-get($colors, 'info'), 50%);
        color: darken(map-get($colors, 'info'), 25%);
    }

    &.bxs-alert-warn,
    &.bxs-alert-warning {
        background-color: lighten(map-get($colors, 'warn'), 25%);
        color: darken(map-get($colors, 'warn'), 25%);
        border-left-color: darken(map-get($colors, 'warn'), 10%);
    }

    &.bxs-alert-error {
        background-color: lighten(map-get($colors, 'error'), 55%);
        border-left-color: darken(map-get($colors, 'error'), 25%);
        color: darken(map-get($colors, 'error'), 25%);
    }

    &.bxs-alert-tile {
        border-radius: 0;
    }

    > div {
        padding: 0.5rem 1rem;
        font-weight: 600;
        font-size: 0.85rem;
    }

    p {
        margin: 0;
        padding: 0;
    }
}
</style>
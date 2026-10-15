<template>
    <router-link
    to="/"
    exact
    class="logo bxs-logo"
    :style="{
        '--logo-max-width': maxWidth,
        maxWidth: $mq.from('ds') ? maxWidth + 'px' : (maxWidth / 1.25) + 'px'
    }">
        <img
        v-if="src"
        :src="src"
        :alt="alt">

        <slot />
    </router-link>
</template>

<script>
export default {
    name: 'logo',
    props: {
        'max-width': {
            type: [String, Number],
            required: false,
            default: 60
        },
        alt: {
            type: String,
            required: false,
            default: null
        },
        src: {
            type: String,
            required: false,
            default: '/img/ristorante-amabeef-logo-simbolo.png'
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    display: inline-block;
    position: relative;
    text-decoration: none !important;
    vertical-align: middle;
    text-wrap: nowrap;
    color: currentColor !important;
    
    &::after,
    &::before {
        display: none;
    }

    &:hover {
        color: currentColor !important;
    }

    > img {
        display: block;
        position: relative;
        width: 100%;
        max-width: 100%;
        height: auto;
    }
}
</style>
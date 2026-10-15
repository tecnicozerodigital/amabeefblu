<template>
    <div :class="['bxs-loader' , 'text-center', { 'bxs-loader-fullscreen': fullscreen }]">
        <logo
        v-if="logo"
        max-width="120px"
        class="mb-ui" />

        <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
        style="enable-background:new 0 0 50 50;"
        xml:space="preserve">
            <path fill="currentColor" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"/>
            </path>
        </svg>

        <p
        v-if="label"
        class="mt-ui text-uppercase"><small>{{ label }}</small></p>
    </div>
</template>

<script>
export default {
    name: 'bxs-loader',
    props: {
        label: {
            type: String,
            required: false,
            default: null
        },
        fullscreen: {
            type: Boolean,
            required: false,
            default: false
        },
        logo: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.bxs-loader {
    position: relative;

    &.bxs-loader-fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        background-color: rgba(#fff, 0.8);
        z-index: var(--layer-loader);
    }
}
</style>
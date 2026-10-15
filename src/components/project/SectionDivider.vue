<template>
    <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 20"
    preserveAspectRatio="none"
    :class="['section-divider-comp', 'section-divider-comp-dir-' + dir, 'section-divider-comp-pos-' + pos]">
        <path
        d="M0,0v3c0,0,393.8,0,483.4,0c9.2,0,16.6,7.4,16.6,16.6c0-9.1,7.4-16.6,16.6-16.6C606.2,3,1000,3,1000,3V0H0z"
        :fill="color ? `var(--color-${color})` : null" />
    </svg> -->

    <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
        <path
        d="M18.17 11.44c-.2.3-.94 1.18-1.63 1.24-.17.02-.45 0-.84-.39-.58-.58-.48-1.31-.24-2.66.27-1.48.6-3.32-.64-5.19-2.23-3.35-4.57-3.45-4.83-3.45-.64 0-1.13.6-.97 1.24.24.96.57 3.75-.74 5.05-2 2-4.29 3.22-4.29 6.71 0 4.41 3.59 8 8 8s8-3.59 8-8v-2c0-1-1.28-1.38-1.83-.56Z"
        :fill="color ? `var(--color-${color})` : null"></path>
    </svg> -->

    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 480 480"
    height="80px"
    :class="['section-divider-comp', 'section-divider-comp-dir-' + dir, 'section-divider-comp-pos-' + pos]">
        <path
        d="M480 240A240 240 0 0 1 240 0 240 240 0 0 1 0 240a240 240 0 0 1 240 240 240 240 0 0 1 240-240Z"
        :fill="color ? `var(--color-${color})` : null"></path>
    </svg>
</template>

<script>
export default {
    name: 'project_section_divider',
    props: {
        color: {
            type: String,
            required: false,
            default: 'secondary'
        },
        dir: {
            type: String,
            required: false,
            default: 'top'
        },
        pos: {
            type: String,
            required: false,
            default: 'bottom'
        }
    }
}
</script>

<style lang="scss" scoped>
$height: var(--navbar-height);

svg {
    position: absolute;
    width: 100%;
    height: $height;
    bottom: calc(($height / 2) * -1);
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    pointer-events: none;
    // border: 1px solid red;

    &.section-divider-comp-dir-bottom {
        // top: 100%;
        // bottom: unset;
    }

    &.section-divider-comp-pos-top {
        top: calc(($height / 2) * -1);
        bottom: unset;
    }
}
</style>
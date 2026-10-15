<template>
    <div
    :class="['bxs-hero', ratio_classes]"
    :style="[measurable_styles, ratio_styles, {
        'background-image': `url(${src})`
    }]">
        <div class="bxs-hero--overlay"></div>
        <slot />
    </div>
</template>

<script>
import { ratio, measurable } from '@/mixins'

export default {
    name: 'hero',
    mixins: [ratio, measurable],
    props: {
        src: {
            type: String,
            required: false,
            defatul: '/img/grow-up-illustration.jpg'
        }
    }
}
</script>

<style lang="scss" scoped>
.bxs-hero {
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;

    &--overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: linear-gradient(to right top, rgba(#000, 1), rgba(#000, 0));
        z-index: 0;
        pointer-events: none;
    }
}
</style>
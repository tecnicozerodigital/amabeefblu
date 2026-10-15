<template>
    <div class="cols">
        <div
        class="col col-l"
        :style="{
            'background-image': `url(${srcLeft})`
        }"></div>

        <div
        class="col col-r"
        :style="{
            'background-image': `url(${srcRight})`
        }"></div>
    </div>
</template>

<script>
export default {
    name: 'project_images_clip',
    props: {
        'src-left': {
            type: String,
            required: false,
            default: null
        },
        'src-right': {
            type: String,
            required: false,
            default: null
        }
    }
}
</script>

<style lang="scss" scoped>
 .cols {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 1;
    pointer-events: none;

    .col {
        position: relative;
        width: 30%;
        // height: calc(100% - (var(--navbar-height) / 2));
        height: 100%;
        overflow: hidden;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;

        // display: flex;
        // flex-flow: row nowrap;
        // justify-content: flex-start;
        // align-items: center;

        img {
            // width: 100vh;
        }

        // filter: blur(3px);
    }

    .col-l {
        border-top-right-radius: 100%;
        // border-bottom-left-radius: 100%;
    }

    .col-r {
        border-top-left-radius: 100%;
        // border-bottom-right-radius: 100%;
    }
}
</style>
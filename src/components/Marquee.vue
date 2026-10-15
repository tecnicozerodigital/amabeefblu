<template>
    <div class="marquee">
        <div class="track">
            <p
            v-for="n in counts"
            :key="n"
            :class="['text', 'mb-0', {
                ['text-direction-' + direction]: direction,
                'text-color': n === indexColor // n === parseInt(counts / 2)
            }]">
                <slot>{{ value }}</slot>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bxs_marquee',
    props: {
        value: String,
        counts: {
            type: Number,
            required: false,
            default: 8
        },
        indexColor: {
            type: Number,
            required: false,
            default: 0
        },
        speed: {
            type: [String, Number],
            required: false,
            default: 5
        },
        direction: {
            type: String,
            required: false,
            default: 'r'
        }
    },
    mounted () {
        this.$nextTick(this.start)
    },
    methods: {
        start () {
        }
    }
}
</script>

<style lang="scss" scoped>
.marquee {
    width: 100vw;
    font-size: 7vh;
    overflow: hidden;
    position: relative;
    // letter-spacing: -4px;

    .track {
        padding: 1rem 0;
        overflow: hidden;
        white-space: nowrap;

        display: inline-flex;
        justify-content: center;
        align-items: center;

        .text {
            will-change: transform;
            animation-duration: 15s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;

            &.text-direction-l {
                animation-name: marquee-l;
            }

            &.text-direction-r {
                animation-name: marquee-r;
            }
        }
    }

    .text-color {
        color: var(--color-sixth) !important;
    }

    @keyframes marquee-l {
        from {transform: translateX(0);}
        to {transform: translateX(-100%);}
    }

    @keyframes marquee-r {
        from {transform: translateX(-100%);}
        to {transform: translateX(0);}
    }
}
</style>
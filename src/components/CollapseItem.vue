<template>
    <div
    :class="['collapse-item-comp', {
        actived: on,
        outlined: outlined
    }]">
        <bxs-list-item
        link
        :divider="outlined"
        :append-icon="!on ? 'chevron-down' : 'chevron-top'"
        @click="toggle">
            <span v-if="label">{{ label }}</span>
            <slot name="label" />
        </bxs-list-item>

        <div
        ref="content"
        class="collapse-item-comp--cnt">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'collapse-item',
    props: {
        label: {
            type: String,
            required: false,
            default: ''
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            on: false
        }
    },
    // mounted () {
    //     console.log('collapse item comp', this)
    // },
    methods: {
        toggle () {
            this.on = !this.on

            this.$nextTick(() => {
                const cnt = this.$refs.content

                if (cnt.style.maxHeight) {
                    cnt.style.maxHeight = null
                } else {
                    cnt.style.maxHeight = cnt.scrollHeight + 'px'
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

.collapse-item-comp {
    position: relative;
    border-radius: var(--collapse-item-border-radius);
    overflow: hidden;
    border: 1px solid currentColor;

    &.actived {
        > .collapse-item-comp--cnt {
            padding-top: var(--collapse-padding-y-actived);
            padding-bottom: var(--collapse-padding-y-actived);
        }
    }

    &.outlined {
        border: 1px solid var(--divider-color);
    }

    &--no-border {
        border: none;
    }

    &--cnt {
        max-height: 0;
        transition: max-height 0.2s ease-out;
        padding: 0 var(--size-layout);

        overflow-x: hidden;
        overflow-y: scroll;
        scroll-behavior: auto;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
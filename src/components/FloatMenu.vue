<template>
    <div :class="['bxs-menu', { 'bxs-menu-on': local_on }]">
        <div
        v-if="$slots.activator"
        class="bxs-menu--activator">
            <slot
            name="activator"
            :on="{
                click: () => local_on = !local_on
            }"
            :attrs="{
                role: 'button',
                'aria-haspopup': true,
                'aria-expanded': false
            }" />
        </div>

        <div v-else>
            <bxs-btn
            :icon="icon"
            @click="open">
                <bxs-icon :name="activatorIcon || 'three-dots'" />
            </bxs-btn>
        </div>

        <div
        v-if="local_on"
        ref="menu"
        class="bxs-menu--menu"
        @click.self="_close_empty">
            <bxs-layout class="bxs-menu--menu--content bxs-elevation">
                <div class="bxs-menu--menu--content--header">
                    <h5>{{ title }}</h5>

                    <bxs-spacer></bxs-spacer>

                    <bxs-btn
                    icon
                    fab
                    @click="close">
                        <bxs-icon name="close" />
                    </bxs-btn>
                </div>

                <div
                ref="scroller"
                class="bxs-menu--menu--content--body">
                    <slot />
                </div>

                <div class="bxs-menu--menu--content--footer">
                    <slot name="actions" />
                </div>
            </bxs-layout>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bxs-menu',
    props: {
        title: {
            type: String,
            required: false,
            default: 'Opzioni'
        },
        'activator-icon': {
            type: String,
            required: false,
            default: null
        },
        icon: {
            type: Boolean,
            required: false,
            default: false
        },
        'close-on-click': {
            type: Boolean,
            required: false,
            default: true
        }
    },
    emits: [
        'open',
        'close',
        'infinite-scroll'
    ],
    data () {
        return {
            local_on: false
        }
    },
    mounted () {
        this.$nextTick(this.play)
    },
    watch: {
        local_on (newVal) {
            if (newVal) {
                this.$emit('open')

                this.$nextTick(() => {
                    if (this.$refs.scroller) {
                        this.$refs.scroller.addEventListener('scroll', this.handleScroll)
                    }
                })
            } else {
                this.$emit('close')

                if (this.$refs.scroller) {
                    this.$refs.scroller.removeEventListener('scroll', this.handleScroll)
                }
            }
        }
    },
    methods: {
        play () {
            if (this.$refs.scroller) {
                this.$refs.scroller.addEventListener('scroll', this.handleScroll)
            }

            if (this.closeOnClick) {
                window.addEventListener('click', this._checkClose)
            }
        },
        stop () {
            if (this.$refs.scroller) {
                this.$refs.scroller.removeEventListener('scroll', this.handleScroll)
            }

            if (this.closeOnClick) {
                window.removeEventListener('click', this.checkClose)
            }
        },
        handleScroll () {
            if (!this.$refs.scroller) return

            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = this.$refs.scroller

            // console.log(scrollTop + clientHeight, clientHeight, scrollHeight)

            if (
                scrollTop + clientHeight >= (scrollHeight - (clientHeight / 2))
            ) {
                this.$emit('infinite-scroll')
            }
        },
        _checkClose (e) {
            if (!this.$el.contains(e.target)) {
                // console.log('Clicked outside l2 and logo-menu')
                this.local_on = false
            }
        },
        _close_empty () {
            if (this.closeOnClick) this.close()
        },
        open () {
            this.local_on = true
        },
        close () {
            this.local_on = false
        }
    },
    beforeUnmount () {
        this.stop()
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

.bxs-menu {
    position: relative;
    display: var(--menu-display);
    vertical-align: middle;

    &--activator {
    }

    &--menu {
        position: fixed;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(#fff, 0.25);
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;
        z-index: var(--layer-menu);

        &--content {
            position: relative;
            background-color: var(--menu-content-background-color);
            border-radius: var(--menu-content-border-radius);
            padding: var(--menu-content-padding-y) var(--menu-content-padding-x);

            &--header {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                overflow: hidden;
            }

            &--body {
                position: relative;
                max-height: calc(100vh - 96px);
                overflow: auto;
                background-color: var(--menu-content-background-color);

                @include mq($mq-static-breakpoint) {
                    position: absolute;
                    display: inline-block;
                    left: inherit;
                    bottom: inherit;
                    width: inherit;
                    right: 0;
                    border-radius: var(--radius);
                    min-width: var(--menu-content-min-width);
                    margin-top: var(--menu-content-top);
                    box-shadow: var(--menu-content-box-shadow);
                }

                > ul {
                    margin: 0;
                    padding: 0;

                    > li {
                        margin: 0;
                        padding: 0;
                    }
                }
            }

            &--footer {
                position: relative;
                overflow: hidden;
                background-color: var(--menu-content-background-color);
            }
        }
    }
}
</style>
<template>
    <div :class="['bxs-menu', {
        'bxs-menu-on': local_on,
        'bxs-menu-block': block,
        'bxs-menu-solo': solo
    }]">
        <!-- activator -->
        <div
        v-if="!!$slots.activator && !solo"
        class="bxs-menu--activator">
            <slot
            name="activator"
            :value="local_on"
            :on="{
                click: () => local_on = !local_on
            }"
            :attrs="{
                role: 'button',
                'aria-haspopup': true,
                'aria-expanded': false
            }" />
        </div>

        <div v-else-if="!$slots.activator && !solo">
            <bxs-btn
            v-bind="activatorProps"
            icon
            @click="open">
                <bxs-icon :name="activatorIcon" />
            </bxs-btn>
        </div>

        <!-- content -->
        <Teleport to="body">
            <div
            ref="menu"
            :class="['bxs-menu--menu', { 'bxs-menu--menu-on': local_on }]"
            @click.self="handleClickForeground">
                <bxs-layout
                :max-width="maxWidth"
                :min-height="minHeight"
                class="bxs-menu--menu--content bxs-elevation ma-0 pa-0">
                    <!-- header -->
                    <div ref="header">
                        <div class="bxs-menu--menu--content--header">
                            <p
                            v-if="title"
                            class="mb-0 text-500">{{ title }}</p>

                            <bxs-spacer v-if="closable"></bxs-spacer>

                            <bxs-icon
                            v-if="closable"
                            width="0.9em"
                            height="0.9em"
                            :name="$store.state.is_mobile ? 'chevron-down' : 'close'"
                            @click="close" />
                        </div>

                        <slot name="header" />
                    </div>

                    <!-- body -->
                    <div
                    ref="scroller"
                    class="bxs-menu--menu--content--body bxs-scrollable">
                        <slot />
                    </div>

                    <!-- footer -->
                    <div
                    v-if="$slots.actions"
                    ref="footer"
                    class="bxs-menu--menu--content--footer">
                        <!-- <bxs-list-item
                        v-if="closable"
                        prepend-icon="close"
                        @click="close">Chiudi</bxs-list-item> -->

                        <slot name="actions" />
                    </div>
                </bxs-layout>
            </div>
        </Teleport>
    </div>
</template>

<script>
export default {
    name: 'bxs-menu',
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false
        },
        title: {
            type: String,
            required: false,
            default: null
        },
        'max-width': {
            type: [String, Number],
            required: false,
            default: 440
        },
        'min-height': {
            type: [String, Number],
            required: false,
            default: null
        },
        'activator-props': {
            type: Object,
            required: false,
            default: null
        },
        'activator-icon': {
            type: String,
            required: false,
            default: 'three-dots-vertical'
        },
        solo: {
            type: Boolean,
            required: false,
            default: false
        },
        'close-on-click': {
            type: Boolean,
            required: false,
            default: false
        },
        closable: {
            type: Boolean,
            required: false,
            default: true
        },
        block: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: [
        'update:modelValue',
        'open',
        'close',
        'infinite-scroll'
    ],
    data () {
        return {
            local_on: false,
            body_h: 0
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

            this.$emit('update:modelValue', newVal)
        },
        modelValue (newVal) {
            this.local_on = newVal
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

            this.resize()
        },
        resize () {
            let h = this.$refs.header.clientHeight
            if (this.$refs.footer) h += this.$refs.footer.clientHeight
            this.body_h = (this.$refs.scroller.clientHeight - h) + 'px'
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
        handleClickForeground () {
            this.close()
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

.menu-enter-active,
.menu-leave-active {
    transition: transform 0.3s ease-out;
}

.menu-enter-from,
.menu-leave-to {
    transform: translateY(100%);
}

.bxs-menu {
    position: relative;
    vertical-align: middle;
    text-align: left;
    overflow: hidden;

    &.bxs-menu-block {
        display: block;
    }

    &.bxs-menu-solo {
    }

    &--activator {
    }

    &--menu {
        position: fixed;
        width: 100%;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        top: 0;
        left: 0;
        -webkit-backdrop-filter: var(--menu-foreground-backdrop-filter);
        backdrop-filter: var(--menu-foreground-backdrop-filter);

        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;

        z-index: var(--layer-menu);
        overflow: hidden;

        // trans
        pointer-events: none;
        transition: background-color 0.2s ease;

        @include mq($mq-static-breakpoint) {
            justify-content: flex-start;
            align-items: flex-end;

            > .bxs-layout {
                margin-right: 0;
            }
        }

        &.bxs-menu--menu-on {
            pointer-events: inherit;
            background-color: var(--menu-foreground-background-color);

            .bxs-menu--menu--content {
                transform: translateY(0);
                max-height: 95%;

                @include mq($mq-static-breakpoint) {
                    transform: translateX(0);
                    max-height: 100%;
                }
            }
        }

        &--content {
            position: relative;
            display: flex;
            flex-direction: column;
            background-color: var(--menu-content-background-color);
            padding: var(--menu-content-padding-y) var(--menu-content-padding-x);
            overflow: hidden;
            max-height: 95%;

            transform: translateY(100%);
            transition: transform 0.28s ease-out;

            @include mq($until: $mq-static-breakpoint) {
                max-width: 100% !important;
                border-radius: var(--menu-content-border-radius);
            }

            // desktop
            @include mq($mq-static-breakpoint) {
                border-top-right-radius: 0;
                height: 100% !important;
                max-height: 100% !important;
                transform: translateX(102.5%);
            }

            &--header {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: flex-end;
                justify-content: space-between;
                min-height: var(--navbar-min-height);
                padding-left: var(--size-layout);
                padding-right: var(--size-layout);
                // padding-top: calc(var(--navbar-padding-y) + (var(--size-ui) / 2));
                // padding-bottom: calc(var(--size-ui) / 1.5);
                border-bottom: 1px solid var(--divider-color);

                @include mq($until: $mq-static-breakpoint) {
                    &::before {
                        content: "";
                        position: absolute;
                        top: calc(var(--size-ui) / 2);
                        left: 0;
                        right: 0;
                        margin: auto;
                        width: 40px;
                        height: 4px;
                        border-radius: 4px;
                        background-color: var(--divider-color);
                    }
                }

                @include mq($mq-static-breakpoint) {
                    align-items: center;
                    // padding: var(--size-layout);
                }
            }

            &--body {
                position: relative;
                flex: 1;
                background-color: var(--menu-content-background-color);
                // padding-left: var(--size-layout);
                // padding-right: var(--size-layout);
            }

            &--footer {
                position: relative;
                overflow: hidden;
                margin-top: auto;
                background-color: var(--menu-content-background-color);
                min-height: var(--navbar-min-height);

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: var(--divider-color);
                }
            }
        }
    }
}
</style>
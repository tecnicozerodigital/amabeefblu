<template>
    <div :class="['bxs-drawer', {
        'bxs-drawer-inline': inline
    }]">
        <div
        v-if="$slots.activator"
        class="bxs-drawer--activator">
            <slot
            name="activator"
            :on="{
                click: () => local_on = !local_on
                // mouseenter: () => local_on = true
            }"
            :attrs="{
                role: 'button',
                'aria-haspopup': true,
                'aria-expanded': false
            }" />
        </div>

        <Teleport to="body">
            <div
            ref="drawer"
            :class="['bxs-drawer--drawer', { 'bxs-drawer--drawer-on': local_on }]"
            @click.self="_closeOut">
                <bxs-layout
                ref="container"
                class="bxs-drawer--drawer--container pa-0 ma-0"
                :max-width="maxWidth">
                    <!--  -->
                    <div
                    ref="header"
                    class="bxs-drawer--drawer--container--header">
                        <div class="bxs-drawer--drawer--container--header--container">
                            <div class="flex-1">
                                <h6
                                v-if="title"
                                class="mb-0">{{ title }}</h6>
                                <slot name="header-logo" />
                            </div>

                            <bxs-icon
                            name="close"
                            @click="close" />
                        </div>

                        <div
                        v-if="$slots.header"
                        class="bxs-drawer--drawer--container--header--container">
                            <slot
                            name="append-header"
                            v-on="{
                                click: close
                            }" />
                        </div>
                    </div>

                    <!--  -->
                    <div :class="['bxs-drawer--drawer--container--body', 'bxs-scrollable', {
                        'bxs-scrollable-scrollbar': !$store.state.is_mobile
                    }]">
                        <slot />
                    </div>

                    <!--  -->
                    <div
                    v-if="!!$slots.actions"
                    ref="actions"
                    class="bxs-drawer--drawer--container--actions">
                        <slot name="actions" />
                    </div>
                </bxs-layout>
            </div>
         </Teleport>
    </div>
</template>

<script>
export default {
    name: 'bxs-drawer',
    props: {
        modelValue: {
            type: Boolean,
            required: false,
            default: false
        },
        'max-width': {
            type: [String, Number],
            required: false,
            default: 440
        },
        'z-index': {
            type: [String, Number],
            required: false,
            default: null
        },
        title: {
            type: String,
            required: false,
            default: null
        },
        persistent: {
            type: Boolean,
            required: false,
            default: false
        },
        inline: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: [
        'update:modelValue',
        'click:close'
    ],
    data () {
        return {
            local_on: this.modelValue,
            header_h: 0,
            actions_h: 0
        }
    },
    mounted () {
        this.$nextTick(this.resize)
    },
    watch: {
        local_on (newVal) {
            this.$emit('update:modelValue', newVal)
        },
        modelValue (newVal) {
            this.local_on = newVal
        },
        $route () {
            this.local_on = false
        }
    },
    methods: {
        resize () {
            if (this.$refs.header) this.header_h = this.$refs.header.clientHeight
            this.actions_h = '10vh'

            if (this.$refs.actions) this.actions_h = this.$refs.actions.clientHeight
        },
        close () {
            this.local_on = false
            this.$emit('click:close')
        },
        _closeOut () {
            if (this.persistent) return
            this.close()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

.bxs-drawer {
    &.bxs-drawer-inline {
        display: inline-block;
    }

    &--activator {
        position: relative;
    }
}

.bxs-drawer--drawer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    display: flex;
    justify-content: flex-end;
    z-index: var(--layer-drawer);

    pointer-events: none;
    transition: background-color 0.2s ease;

    &.bxs-drawer--drawer-on {
        pointer-events: inherit;
        background-color: rgba(0, 0, 0, 0.65);

        .bxs-drawer--drawer--container {
            transform: translateX(0);
        }
    }

    &--container {
        position: relative;
        height: 100%;
        margin: inherit;
        padding: inherit;
        display: flex;
        flex-direction: column;
        background-color: var(--color-background);

        transform: translateX(100%);
        transition: transform 0.28s ease-out;

        @include mq($until: ml) {
            max-width: 100% !important;
        }

        &--header {
            z-index: 2;
            border-bottom: 1px solid var(--divider-color);

            &--container {
                min-height: var(--navbar-min-height);
                padding: 0 var(--size-layout);
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
            }
        }

        &--body {
            position: relative;
            flex: 1;
        }

        &--actions {
            margin-top: auto;
            z-index: 2;
            min-height: var(--list-item-min-height);
            border-top: 1px solid var(--divider-color);
        }
    }
}
</style>

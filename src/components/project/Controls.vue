<template>
    <div
    :class="[
        'controls-comp',
        'controls-comp-' + color,
        'controls-comp-align-' + align,
        { 'controls-comp-relative': relative }
    ]"
    :style="{
        top: top,
        bottom: bottom
    }">
        <span
        v-if="label"
        :class="['small', 'mr-ui', 'text-' + color]">{{ label }}</span>

        <button
        :disabled="disabledPrev"
        :class="{
            'controls-comp--button-disabled': disabledPrev
        }"
        class="mr-3"
        @click.prevent="$emit('prev')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.71 20.71a1 1 0 0 0 0-1.41l-7.29-7.29 7.29-7.29a.996 .996 0 1 0-1.41-1.41l-8.01 7.98c-.2.2-.29.45-.29.71s.1.51.29.71l8 8c.39.39 1.02.39 1.41 0Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="hide-icon"><path d="M15.71 20.71a1 1 0 0 0 0-1.41l-7.29-7.29 7.29-7.29a.996 .996 0 1 0-1.41-1.41l-8.01 7.98c-.2.2-.29.45-.29.71s.1.51.29.71l8 8c.39.39 1.02.39 1.41 0Z"></path></svg>
        </button>

        <button
        :disabled="disabledNext"
        :class="{
            'controls-comp--button-disabled': disabledNext
        }"
        @click.prevent="$emit('next')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.29 3.29a1 1 0 0 0 0 1.41l7.29 7.29-7.29 7.29a.996.996 0 1 0 1.41 1.41l8-8c.2-.2.29-.45.29-.71s-.1-.51-.29-.71L9.71 3.29a1 1 0 0 0-1.41 0Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="hide-icon"><path d="M8.29 3.29a1 1 0 0 0 0 1.41l7.29 7.29-7.29 7.29a.996.996 0 1 0 1.41 1.41l8-8c.2-.2.29-.45.29-.71s-.1-.51-.29-.71L9.71 3.29a1 1 0 0 0-1.41 0Z"></path></svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'project_controls_comp',
    props: {
        relative: {
            type: Boolean,
            required: false,
            default: false
        },
        align: {
            type: String,
            required: false,
            default: 'center'
        },
        label: {
            type: [String, Boolean],
            required: false,
            default: 'swipe to discover or'
        },
        bottom: {
            type: String,
            required: false,
            default: '-12.5px'
        },
        top: {
            type: String,
            required: false,
            default: 'unset'
        },
        color: {
            type: String,
            required: false,
            default: 'secondary'
        },
        'disabled-prev': {
            type: Boolean,
            required: false,
            default: false
        },
        'disabled-next': {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: [
        'prev',
        'next'
    ]
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/conf.scss';

.controls-comp {
    position: absolute;
    left: 0;
    width: 100%;
    // height: var(--navbar-heigth);
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    padding: 0 var(--size-ui);
    z-index: 1;
    // border: 1px solid red;
    
    &.controls-comp-align-center {
        justify-content: center;
    }

    &.controls-comp-align-end {
        justify-content: flex-end;
    }

    &.controls-comp-relative {
        position: relative;
        min-height: var(--navbar-heigth);
        top: unset; bottom: unset; left: unset;
    }

    > button {
        display: inline-flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        border: 1px solid var(--color-secondary);
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        transition: all 0.25s ease-out;

        &.controls-comp--button-disabled {
            pointer-events: none;
            opacity: 0.25;
        }

        @media (hover: hover) {
            &:hover {
                background-color: var(--color-primary);
                border-color: var(--color-primary);

                > svg {
                    transform: translateY(-100%) rotate(-90deg);

                    &.hide-icon {
                        transform: translateY(-50%) rotate(0);
                    }

                    path {
                        fill: var(--color-tertiary);
                    }
                }
            }
        }

        &:active {
            transform: scale(1.05);
        }

        > svg {
            height: 15px;
            transform: translateY(50%);
            transition: transform 0.3s ease-out;

            &.hide-icon {
                transform: translateY(150%) rotate(90deg);
                // border: 1px solid red;
            }

            path {
                fill: var(--color-secondary);
            }
        }
    }

    @each $key, $value in $colors {
        &.controls-comp-#{$key} {
             > button {
                border: 1px solid var(--color-#{$key});

                @media (hover: hover) {
                    &:hover {
                        background-color: var(--color-primary);
                        border-color: var(--color-primary);

                        > svg {
                            path {
                                fill: var(--color-tertiary);
                            }
                        }
                    }
                }

                > svg {
                    path {
                        fill: var(--color-#{$key});
                    }
                }
            }
        }
    }
}
</style>
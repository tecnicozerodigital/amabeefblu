<template>
    <button
    v-if="!to && !href"
    ref="button"
    :type="type"
    rel="noopener"
    :disabled="disabled"
    :role="role"
    :class="classes"
    :style="styles"
    :title="title">
        <bxs-icon
        v-if="prependIcon && !loading"
        :name="prependIcon"
        class="bxs-btn-icon-prepend" />

        <slot />

        <bxs-icon
        v-if="appendIcon && !loading"
        :name="appendIcon"
        class="bxs-btn-icon-append" />

        <!-- <div
        v-if="loading"
        class="loader loader--style2"
        title="1">
            <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
            style="enable-background:new 0 0 50 50;"
            xml:space="preserve">
                <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                    <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite" />
                </path>
            </svg>
        </div> -->

        <!-- Barra di loading in basso -->
        <div
        class="loading-bar"
        v-if="loading"></div>
    </button>

    <router-link
    v-else-if="!!to && !href"
    ref="button"
    :role="role"
    rel="noopener"
    :to="to"
    :disabled="disabled"
    :class="classes"
    :style="styles">
        <bxs-icon
        v-if="prependIcon"
        :name="prependIcon"
        class="bxs-btn-icon-prepend" />

        <slot />

        <bxs-icon
        v-if="appendIcon"
        :name="appendIcon"
        class="bxs-btn-icon-append" />
    </router-link>

    <a
    v-else-if="!to && !!href"
    ref="button"
    :href="href"
    rel="noopener"
    :target="target"
    :disabled="disabled"
    :class="classes"
    :style="styles">
        <bxs-icon
        v-if="prependIcon"
        :name="prependIcon"
        class="bxs-btn-icon-prepend" />

        <slot />

        <bxs-icon
        v-if="appendIcon"
        :name="appendIcon"
        class="bxs-btn-icon-append" />
    </a>
</template>

<script>
import { measurable, positionable } from '@/mixins'

export default {
    name: 'bxs-btn',
    mixins: [measurable, positionable],
    props: {
        title: {
            type: String,
            required: false,
            default: ''
        },
        type: {
            type: String,
            required: false,
            default: 'button'
        },
        role: {
            type: String,
            required: false,
            default: 'button'
        },
        block: {
            type: Boolean,
            required: false,
            default: false
        },
        text: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: null
        },
        href: {
            type: String,
            required: false,
            default: null
        },
        target: {
            type: String,
            required: false,
            default: '_blank'
        },
        color: {
            type: String,
            required: false,
            default: null
        },
        'prepend-icon': {
            type: String,
            required: false,
            default: null
        },
        'append-icon': {
            type: String,
            required: false,
            default: null
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        icon: {
            type: Boolean,
            required: false,
            default: false
        },
        fab: {
            type: Boolean,
            required: false,
            default: false
        },
        pill: {
            type: Boolean,
            required: false,
            default: true
        },
        'justify-between': {
            type: Boolean,
            required: false,
            default: false
        },
        between: {
            type: Boolean,
            required: false,
            default: false
        },
        small: {
            type: Boolean,
            required: false,
            default: false
        },
        'x-small': {
            type: Boolean,
            required: false,
            default: false
        },
        large: {
            type: Boolean,
            required: false,
            default: false
        },
        'text-align': {
            type: String,
            required: false,
            default: null
        },
        active: {
            type: Boolean,
            required: false,
            default: false
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        },
        tile: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        dark: {
            type: Boolean,
            required: false,
            default: false
        },
        light: {
            type: Boolean,
            required: false,
            default: false
        },
        uppercase: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            local_loading: this.loading
        }
    },
    computed: {
        classes () {
            return ['bxs-btn', {
                dark: this.dark,
                light: this.light,
                'text-uppercase': this.uppercase,
                'bxs-btn-block': this.block,
                'bxs-btn-text': this.text,
                'bxs-btn-icon': this.icon,
                'bxs-btn-fab': this.fab,
                'bxs-btn-pill': this.pill,
                'bxs-btn-tile': this.tile,
                'bxs-btn-justify-between': this.justifyBetween || this.between,
                ['bxs-btn-' + this.color]: !!this.color,
                'bxs-btn-small': this.small,
                'bxs-btn-x-small': this.xSmall,
                'bxs-btn-outlined': this.outlined,
                'bxs-btn-large': this.large,
                'bxs-btn-prepend-icon': this.prependIcon,
                'bxs-btn-append-icon': this.appendIcon,
                'bxs-btn-active': this.active,
                'bxs-btn-disabled': this.disabled,
                'bxs-btn-loading': this.loading,
                ['bxs-btn-text-align-' + this.textAlign]: this.textAlign,
                ...this.positionable_classes
            }]
        },
        styles () {
            return {
                ...this.measurable_styles,
                ...this.positionable_styles
            }
        }
    },
    watch: {
        loading (newVal) {
            this.local_loading = newVal
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/conf.scss';

.bxs-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-width: var(--button-min-width);
    min-height: var(--button-min-height);

    background-color: var(--button-background-color);
    color: var(--button-color);

    padding: var(--button-padding-y) var(--button-padding-x);

    border: var(--thickness) solid transparent;
    border-radius: var(--button-border-radius);

    font-family: var(--button-font-family);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    text-align: center;
    text-decoration: none !important;
    text-transform: var(--button-text-transform);
    line-height: normal;
    letter-spacing: var(--button-letter-spacing);

    vertical-align: middle;
    transform: transform 0.5s ease-out, background-color 0.25s ease, color 0.25s ease;

    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        background-color: var(--button-color);
    }

    &:hover {
        border-color: transparent !important;
        color: var(--button-color-active) !important;
        background-color: var(--button-hover-background-color) !important;

        // deprecated
        // &.bxs-btn-icon {
        //     background-color: transparent !important;
        //     color: var(--button-color-active) !important;
        // }

        &.bxs-btn-outlined {
            border-color: transparent;
            color: var(--button-color);
            background-color: var(--button-hover-background-color);
        }

        &.bxs-btn-icon,
        &.bxs-btn-text {
            border-color: transparent;
            background-color: var(--button-hover-background-color);
        }
    }

    // colors

    @each $key, $value in $colors {
        &.bxs-btn-#{$key} {
            background-color: var(--color-#{$key});

            // @if $key == primary {
            //     color: var(--color-white);
            // } @else {
            //     color: var(--color-typo);
            // }

            &.bxs-btn-text {
                color: var(--color-#{$key});

                &:hover {
                    border-color: var(--color-#{$key});
                    color: var(--color-#{$key});
                }
            }

            &.bxs-btn-outlined {
                color: var(--color-#{$key});
                border-color: var(--color-#{$key});
            }

            &.bxs-btn-icon {
                color: var(--color-#{$key});
            }
        }
    }

    &.bxs-btn-disabled {
        pointer-events: none !important;
        color: darken(map-get($colors, 'disabled'), 25%) !important;
    }

    // sizings

    &.bxs-btn-x-small {
        // min-width: inherit;
        // min-height: inherit;
        // font-size: calc(var(--button-font-size) / 1.4);
        // padding: calc(var(--button-padding-y) / 1.4) calc(var(--button-padding-x) / 1.4);

        // &.bxs-icon,
        // &.bxs-btn-fab {
        //     width: calc(var(--button-min-height) / 1.4);
        //     height: calc(var(--button-min-height) / 1.4);
        // }

        transform: scale(0.6);
    }

    &.bxs-btn-small {
        // min-width: inherit;
        // min-height: inherit;
        // font-size: calc(var(--button-font-size) / 1.2);
        // padding: calc(var(--button-padding-y) / 1.2) calc(var(--button-padding-x) / 1.2);

        // &.bxs-icon,
        // &.bxs-btn-fab {
        //     width: calc(var(--button-min-height) / 1.2);
        //     height: calc(var(--button-min-height) / 1.2);
        // }

        min-width: calc(var(--button-min-width) / 1.5);
        min-height: calc(var(--button-min-height) / 1.5);
    }

    &.bxs-btn-large {
        // font-size: calc(var(--button-font-size) * 1.4);
        // padding: calc(var(--button-padding-y) * 1.4) calc(var(--button-padding-x) * 1.4);

        // &.bxs-icon,
        // &.bxs-btn-fab {
        //     width: calc(var(--button-min-height) * 1.4);
        //     height: calc(var(--button-min-height) * 1.4);
        // }
    }

    //

    &.bxs-btn-outlined {
        background-color: transparent;
        border-color: var(--button-color);
        color: var(--button-color);
    }

    &.bxs-btn-tile {
        border-radius: 0 !important;
    }

    // &.router-link-active {
    //     &::before {
    //         height: var(--thickness);
    //     }
    // }

    // &.bxs-btn-active {
    // }

    &.bxs-btn-justify-between {
        justify-content: space-between;
    }

    &.bxs-btn-text-align-left {
        justify-content: flex-start;
        text-align: start;
    }

    &.bxs-btn-block {
        flex: 1;
        display: flex;
        width: 100%;
        max-width: 100%;
    }

    &.bxs-btn-text {
        background-color: transparent;
        // color: var(--color-typo);
        padding: 0;

        &.router-link-active {
            &::before {
                height: var(--thickness);
            }
        }
    }

    &.bxs-btn-fab {
        justify-content: center;
        width: var(--button-min-height);
        height: var(--button-min-height);
        min-width: auto;
        min-height: auto;
        padding: 0;
        border-radius: var(--pill);

        // &.router-link-active {
        //     &::before {
        //         background-color: transparent;
        //         border: var(--thickness) solid var(--button-color);
        //         height: 100%;
        //         border-radius: var(--pill);
        //     }
        // }

        > .bxs-icon {
            width: 50%;
            height: 50%;
        }
    }

    &.bxs-btn-pill {
        border-radius: var(--pill);
    }

    &.bxs-btn-icon {
        background-color: transparent;
        justify-content: center;
        width: var(--button-min-height);
        height: var(--button-min-height);
        min-width: auto;
        min-height: auto;
        padding: 0;
        color: var(--button-color);

        .bxs-icon {
            width: 45%;
            height: 45%;
        }
    }

    &.bxs-btn-prepend-icon {
    }
    &.bxs-btn-append-icon {
    }

    &.bxs-btn-loading {
        pointer-events: none;

        .loader{
            display: inline-block;
            position: absolute;
            right: 0;
            width: 2rem;
            height: 2rem;
            vertical-align: top;
            margin-left: var(--button-icon-margin-x);

            svg {
                width: 100%;
                height: 100%;
            }
        }

        /*
        Set the color of the icon
        */
        svg path,
        svg rect {
            fill: currentColor;
        }
    }

    > .bxs-icon {
        width: var(--icon-nest-size);
        height: var(--icon-nest-size);

        &.bxs-btn-icon-prepend {
            margin-right: var(--button-icon-margin-x);
        }

        &.bxs-btn-icon-append {
            margin-left: var(--button-icon-margin-x);
        }
    }
}

.loading-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: linear-gradient(
        90deg,
        var(--color-primary) 0%,
        var(--color-secondary) 100%
    );
    animation: loading 1.25s ease-in-out infinite;
    opacity: 0.25;
}

@keyframes loading {
  0% {
    left: -100%;
    right: 100%;
  }

  50% {
    left: 0;
    right: 0;
  }

  100% {
    left: 100%;
    right: -100%;
  }
}
</style>
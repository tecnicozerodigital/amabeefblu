<template>
    <a
    v-if="href"
    :id="id"
    :href="href"
    :target="target"
    :title="title"
    :name="title"
    :aria-label="title"
    :aria-pressed="false"
    :disabled="disabled"
    :aria-disabled="disabled"
    tabindex="0"
    :rel="rel"
    :class="['btn-comp', {
        'btn-comp-primary': primary,
        'btn-comp-block': block,
        'btn-comp-secondary': secondary,
        'btn-comp-tertiary': tertiary,
        'btn-comp-fourth': fourth,
        'btn-comp-outlined': outlined,
        'btn-comp-rounded': rounded,
        'btn-comp-icon': icon,
        'btn-comp-text': text,
        'btn-comp-small': small,
        'btn-comp-x-small': xSmall
    }]"
    @mouseenter="handleHover"
    @mouseleave="handleHover">
        <slot />

        <span v-if="!icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" class="icon" height="1.25em"><path d="M480 240A240 240 0 0 1 240 0 240 240 0 0 1 0 240a240 240 0 0 1 240 240 240 240 0 0 1 240-240Z" fill="#808"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" class="icon hide-icon" height="1.25em"><path d="M480 240A240 240 0 0 1 240 0 240 240 0 0 1 0 240a240 240 0 0 1 240 240 240 240 0 0 1 240-240Z" fill="#808"></path></svg>
        </span>

        <!--  -->
        <svg
        v-if="icon === 'phone'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <g fill="rgb(75 18 35)">
                <g>
                    <path d="M5 3.5v17A2.5 2.5 0 0 0 7.5 23h9a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 16.5 1h-9A2.5 2.5 0 0 0 5 3.5ZM16.5 21h-9a.5.5 0 0 1-.5-.5v-17c0-.28.22-.5.5-.5h9c.28 0 .5.22.5.5v17a.5.5 0 0 1-.5.5Z"></path>
                    <circle cx="12" cy="5" r="1.25"></circle>
                </g>
            </g>
        </svg>

        <svg
        v-else-if="icon === 'map'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M12 4a6 6 0 0 1 6 6c0 3.06-3 6.76-6 9.41C9 16.77 6 13.07 6 10a6 6 0 0 1 6-6m0 9c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3m0-11a8 8 0 0 0-8 8c0 4.96 5.47 9.93 7.36 11.49.37.3.9.31 1.26 0C14.51 19.93 20 14.96 20 10a8 8 0 0 0-8-8Zm0 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"
            fill="rgb(75 18 35)"></path>
        </svg>

        <svg
        v-else-if="icon === 'menu'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M19.99 9a1 1 0 0 0-.28-.71l-6-6a1 1 0 0 0-.71-.28H6.5A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V9ZM14 5.41 16.59 8H14V5.41Zm4 14.09a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-15c0-.28.22-.5.5-.5H12v5a1 1 0 0 0 1 1h5v9.5Z"
            fill="rgb(75 18 35)"></path>
        </svg>

        <svg
        v-else-if="icon === 'hamburger'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px"><g fill="#000"><g><circle cx="12" cy="5" r="2"></circle><circle cx="12" cy="19" r="2"></circle><circle cx="12" cy="12" r="2"></circle></g></g></svg>

        <svg
        v-else-if="icon === 'calendar'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M18.5 3H16c0-.55-.45-1-1-1s-1 .45-1 1h-4c0-.55-.45-1-1-1s-1 .45-1 1H5.5A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 3Zm.5 15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V10h14v8.5ZM19 8H5V5.5c0-.28.22-.5.5-.5H8c0 .55.45 1 1 1s1-.45 1-1h4c0 .55.45 1 1 1s1-.45 1-1h2.5c.28 0 .5.22.5.5V8ZM7 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-1.71-.7l-1 1A1 1 0 0 0 8 14v2a1 1 0 0 0-1 1ZM13 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-.62-.92 1 1 0 0 0-1.09.22l-1 1A1 1 0 0 0 14 14v2a1 1 0 0 0-1 1Z"
            fill="rgb(75 18 35)" />
        </svg>
    </a>

    <router-link
    v-else-if="to"
    :to="to"
    :id="id"
    :title="title"
    :name="title"
    :aria-label="title"
    :aria-pressed="false"
    :disabled="disabled"
    :aria-disabled="disabled"
    tabindex="0"
    :class="['btn-comp', {
        'btn-comp-primary': primary,
        'btn-comp-block': block,
        'btn-comp-secondary': secondary,
        'btn-comp-tertiary': tertiary,
        'btn-comp-fourth': fourth,
        'btn-comp-outlined': outlined,
        'btn-comp-rounded': rounded,
        'btn-comp-icon': icon,
        'btn-comp-text': text,
        'btn-comp-small': small,
        'btn-comp-x-small': xSmall
    }]"
    @mouseenter="handleHover"
    @mouseleave="handleHover">
        <slot />

        <span v-if="!icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" class="icon" height="1.25em"><path d="M480 240A240 240 0 0 1 240 0 240 240 0 0 1 0 240a240 240 0 0 1 240 240 240 240 0 0 1 240-240Z" fill="#808"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" class="icon hide-icon" height="1.25em"><path d="M480 240A240 240 0 0 1 240 0 240 240 0 0 1 0 240a240 240 0 0 1 240 240 240 240 0 0 1 240-240Z" fill="#808"></path></svg>
        </span>

        <!--  -->
        <svg
        v-if="icon === 'phone'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <g fill="rgb(75 18 35)">
                <g>
                    <path d="M5 3.5v17A2.5 2.5 0 0 0 7.5 23h9a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 16.5 1h-9A2.5 2.5 0 0 0 5 3.5ZM16.5 21h-9a.5.5 0 0 1-.5-.5v-17c0-.28.22-.5.5-.5h9c.28 0 .5.22.5.5v17a.5.5 0 0 1-.5.5Z"></path>
                    <circle cx="12" cy="5" r="1.25"></circle>
                </g>
            </g>
        </svg>

        <svg
        v-else-if="icon === 'map'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M12 4a6 6 0 0 1 6 6c0 3.06-3 6.76-6 9.41C9 16.77 6 13.07 6 10a6 6 0 0 1 6-6m0 9c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3m0-11a8 8 0 0 0-8 8c0 4.96 5.47 9.93 7.36 11.49.37.3.9.31 1.26 0C14.51 19.93 20 14.96 20 10a8 8 0 0 0-8-8Zm0 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"
            fill="rgb(75 18 35)"></path>
        </svg>

        <svg
        v-else-if="icon === 'menu'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M19.99 9a1 1 0 0 0-.28-.71l-6-6a1 1 0 0 0-.71-.28H6.5A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V9ZM14 5.41 16.59 8H14V5.41Zm4 14.09a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-15c0-.28.22-.5.5-.5H12v5a1 1 0 0 0 1 1h5v9.5Z"
            fill="rgb(75 18 35)"></path>
        </svg>

        <svg
        v-else-if="icon === 'hamburger'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px"><g fill="#000"><g><circle cx="12" cy="5" r="2"></circle><circle cx="12" cy="19" r="2"></circle><circle cx="12" cy="12" r="2"></circle></g></g></svg>

        <svg
        v-else-if="icon === 'calendar'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M18.5 3H16c0-.55-.45-1-1-1s-1 .45-1 1h-4c0-.55-.45-1-1-1s-1 .45-1 1H5.5A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 3Zm.5 15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V10h14v8.5ZM19 8H5V5.5c0-.28.22-.5.5-.5H8c0 .55.45 1 1 1s1-.45 1-1h4c0 .55.45 1 1 1s1-.45 1-1h2.5c.28 0 .5.22.5.5V8ZM7 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-1.71-.7l-1 1A1 1 0 0 0 8 14v2a1 1 0 0 0-1 1ZM13 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-.62-.92 1 1 0 0 0-1.09.22l-1 1A1 1 0 0 0 14 14v2a1 1 0 0 0-1 1Z"
            fill="rgb(75 18 35)" />
        </svg>
    </router-link>

    <button
    v-else
    :id="id"
    type="button"
    :title="title"
    :name="title"
    :aria-label="title"
    :aria-pressed="false"
    :disabled="disabled"
    :aria-disabled="disabled"
    tabindex="0"
    :class="['btn-comp', {
        'btn-comp-primary': primary,
        'btn-comp-block': block,
        'btn-comp-secondary': secondary,
        'btn-comp-tertiary': tertiary,
        'btn-comp-fourth': fourth,
        'btn-comp-outlined': outlined,
        'btn-comp-rounded': rounded,
        'btn-comp-icon': icon,
        'btn-comp-text': text,
        'btn-comp-small': small,
        'btn-comp-x-small': xSmall
    }]"
    @mouseenter="handleHover"
    @mouseleave="handleHover">
        <slot />

        <span v-if="!icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" class="icon" height="1.25em"><path d="M480 240A240 240 0 0 1 240 0 240 240 0 0 1 0 240a240 240 0 0 1 240 240 240 240 0 0 1 240-240Z" fill="#808"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" class="icon hide-icon" height="1.25em"><path d="M480 240A240 240 0 0 1 240 0 240 240 0 0 1 0 240a240 240 0 0 1 240 240 240 240 0 0 1 240-240Z" fill="#808"></path></svg>
        </span>

        <!--  -->
        <svg
        v-if="icon === 'phone'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <g fill="rgb(75 18 35)">
                <g>
                    <path d="M5 3.5v17A2.5 2.5 0 0 0 7.5 23h9a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 16.5 1h-9A2.5 2.5 0 0 0 5 3.5ZM16.5 21h-9a.5.5 0 0 1-.5-.5v-17c0-.28.22-.5.5-.5h9c.28 0 .5.22.5.5v17a.5.5 0 0 1-.5.5Z"></path>
                    <circle cx="12" cy="5" r="1.25"></circle>
                </g>
            </g>
        </svg>

        <svg
        v-else-if="icon === 'map'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M12 4a6 6 0 0 1 6 6c0 3.06-3 6.76-6 9.41C9 16.77 6 13.07 6 10a6 6 0 0 1 6-6m0 9c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3m0-11a8 8 0 0 0-8 8c0 4.96 5.47 9.93 7.36 11.49.37.3.9.31 1.26 0C14.51 19.93 20 14.96 20 10a8 8 0 0 0-8-8Zm0 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Z"
            fill="rgb(75 18 35)"></path>
        </svg>

        <svg
        v-else-if="icon === 'menu'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M19.99 9a1 1 0 0 0-.28-.71l-6-6a1 1 0 0 0-.71-.28H6.5A2.5 2.5 0 0 0 4 4.5v15A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V9ZM14 5.41 16.59 8H14V5.41Zm4 14.09a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-15c0-.28.22-.5.5-.5H12v5a1 1 0 0 0 1 1h5v9.5Z"
            fill="rgb(75 18 35)"></path>
        </svg>

        <svg
        v-else-if="icon === 'hamburger'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px"><g fill="#000"><g><circle cx="12" cy="5" r="2"></circle><circle cx="12" cy="19" r="2"></circle><circle cx="12" cy="12" r="2"></circle></g></g></svg>

        <svg
        v-else-if="icon === 'calendar'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        height="20px">
            <path
            d="M18.5 3H16c0-.55-.45-1-1-1s-1 .45-1 1h-4c0-.55-.45-1-1-1s-1 .45-1 1H5.5A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 18.5 3Zm.5 15.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V10h14v8.5ZM19 8H5V5.5c0-.28.22-.5.5-.5H8c0 .55.45 1 1 1s1-.45 1-1h4c0 .55.45 1 1 1s1-.45 1-1h2.5c.28 0 .5.22.5.5V8ZM7 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-1.71-.7l-1 1A1 1 0 0 0 8 14v2a1 1 0 0 0-1 1ZM13 17a1 1 0 0 0 1 1h2c.55 0 1-.45 1-1s-.45-1-1-1v-4a1 1 0 0 0-.62-.92 1 1 0 0 0-1.09.22l-1 1A1 1 0 0 0 14 14v2a1 1 0 0 0-1 1Z"
            fill="rgb(75 18 35)" />
        </svg>
    </button>
</template>

<script>
// import { gsap } from 'gsap'

export default {
    name: 'project_btn',
    props: {
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
        rel: {
            type: String,
            required: false,
            default: 'noopener noreferrer'
        },
        target: {
            type: String,
            required: false,
            default: '_blank'
        },
        title: {
            type: String,
            required: false,
            default: ''
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        block: {
            type: Boolean,
            required: false,
            default: false
        },
        primary: {
            type: Boolean,
            required: false,
            default: true
        },
        secondary: {
            type: Boolean,
            required: false,
            default: false
        },
        tertiary: {
            type: Boolean,
            required: false,
            default: false
        },
        fourth: {
            type: Boolean,
            required: false,
            default: false
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false
        },
        icon: {
            type: String,
            required: false,
            default: null
        },
        text: {
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
        }
    },
    data () {
        return {
            uid: `btn-${Math.random().toString(36).slice(2, 9)}`,
            path: null,
            pathLength: 0
        }
    },
    created () {
        this.id = Math.random()
    },
    mounted () {
        this.$nextTick(() => {
            // this.path = this.$refs.writingPath
            // if (!this.path) return
            // this.pathLength = this.path.getTotalLength()
            // this.path.style.strokeDasharray = this.pathLength
            // this.path.style.strokeDashoffset = this.pathLength
            // gsap.to(this.path, { duration: 0, strokeDashoffset: this.pathLength })
        })
    },
    methods: {
        handleHover (evt) {
            // console.log(this.path)

            // if (!this.path) return

            // gsap.to(this.path, {
            //     duration: 0.5,
            //     strokeDashoffset: evt.type === 'mouseleave' ? this.pathLength : 0,
            //     ease: evt.type === 'mouseleave' ? 'expo.out' : 'sine.out'
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$min-height: 40px;

.btn-comp {
    display: inline-flex !important;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    position: relative;
    min-height: $min-height;
    padding: 0 1.75rem;
    background-color: var(--color-primary);
    color: var(--color-tertiary);
    letter-spacing: 1.5px;
    font-size: $font-size;
    text-decoration: none;
    border-bottom-right-radius: 20px;
    z-index: 1;
    overflow: hidden;
    transition: all 0.3s ease-out;

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scaleY(0);
        transform-origin: bottom left;
        background-color: var(--color-secondary);
        transition: transform 0.25s ease-in-out;
        z-index: -1;
    }

    > span {
        display: flex;
        flex-flow: column nowrap;

        .icon {
            display: inline-block;
            height: 1.25em;
            transform: translateY(50%);
            transition: transform 0.3s ease-out;
            margin-left: 0.5rem;

            &.hide-icon {
                transform: translateY(200%) rotate(90deg);
                // border: 1px solid red;
            }

            path {
                fill: var(--color-tertiary);
            }
        }
    }

    // .hover-icon {
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    //     display: flex;
    //     flex-flow: row nowrap;
    //     align-items: center;
    //     justify-content: flex-end;
    //     z-index: 1;
    //     pointer-events: none;

    //     svg {
    //         width: 90%;
    //         height: 90%;
    //         backface-visibility: hidden;
    //     }
    // }

    @media (hover: hover) {
        &:hover {
            border-bottom-right-radius: 0;
            transform: scale(1.05);

            &::after {
                transform: scaleY(1);
                transform-origin: top left;
            }

            .icon {
                transform: translateY(-150%) rotate(-90deg);

                &.hide-icon {
                    transform: translateY(-50%) rotate(0);
                }
            }
        }
    }

    //

    &.btn-comp-block {
        display: flex;
        width: 100%;
    }

    //

    &.btn-comp-small {
        font-size: calc($font-size / 1.5);
        padding: 0 calc(1.75rem / 1.5);
        min-height: calc($min-height / 1.5);
    }

    &.btn-comp-x-small {
        font-size: calc($font-size / 1.75);
        padding: 0 calc(1.75rem / 1.75);
        min-height: calc($min-height / 1.75);
    }

    //

    &.btn-comp-outlined {  
        background: transparent !important;
        background-color: transparent !important;
        border: 1px solid var(--color-primary);
        color: var(--color-primary);
    }

    &.btn-comp-rounded {
        border-radius: var(--radius);
    }

    &.btn-comp-icon {
        display: inline-block;
        position: relative;
        background: transparent !important;
        background-color: transparent !important;
        border: none;
        width: 20px;
        height: 20px;
        padding: 0;
        margin: 0;
        border-radius: 0;
        // border: 1px solid red;

        svg {
            display: inline-block;
            height: 100%;
        }

        &::after {
            display: none;
        }
    }

    &.btn-comp-text {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        padding: 0;
        color: var(--color-primary);
    }

    &.btn-comp-secondary {
        border: 1px solid var(--color-secondary);
        background-color: var(--color-secondary);
        color: var(--color-tertiary);

        &.btn-comp-outlined {  
            border: 1px solid var(--color-secondary);
            color: var(--color-secondary);
        }
    }

    &.btn-comp-tertiary {
        border: 1px solid var(--color-tertiary);
        background-color: var(--color-tertiary);
        color: var(--color-primary);

        &.btn-comp-outlined {  
            border: 1px solid var(--color-tertiary);
            color: var(--color-tertiary);
        }
    }
    
    &.btn-comp-fourth {  
        border: 1px solid var(--color-fourth);
        background-color: var(--color-fourth);
        color: var(--color-tertiary);

        &.btn-comp-outlined {  
            border: 1px solid var(--color-fourth);
            color: var(--color-fourth);
        }
    }

    // svg {
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //     width: 100%;
    //     transform: rotate(90deg);

    //     path {
    //         fill: var(--color-tertiary);
    //     }
    // }
}
</style>
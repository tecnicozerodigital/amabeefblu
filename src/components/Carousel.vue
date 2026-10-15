<template>
    <div class="bxs-carousel">
        <!-- :navigation="navigation" -->
        <swiper
        ref="swiper"
        :breakpoints="{
            ...local_breakpoints,
            ...breakpoints
        }"
        :autoplay="autoplay"
        :speed="speed"
        :direction="direction"
        :modules="modules"
        :slides-per-view="itemsPerView"
        :space-between="itemsSpaceBetween"
        :centered-slides="centered"
        :loop="loop"
        :freemode="{
            enable: freemode,
            minimumVelocity: 0.02,
            sticky: false,
            momentum: true
        }"
        :allowTouchMove="allowTouchMove"
        :mousewheel="mousewheel"
        :pagination="pagination"
        :scrollbar="scrollbar"
        :lazy="false"
        :preload-images="false"
        :initial-slide="startAt"
        :grabCursor="grabCursor || allowTouchMove"
        :class="clip"
        @swiper="getRef">
            <!-- width: itemWidth, -->
            <swiper-slide
            v-if="$slots['item.prepend']"
            :class="{
                actived: hovered_i === 'prepend',
                deactived: hovered_i !== null && hovered_i !== 'prepend'
            }"
            :style="itemWidth ? { width: itemWidth } : {}"
            @mouseenter="hovered_i = 'prepend'"
            @mouseleave="hovered_i = null">
                <slot name="item.prepend" />
            </swiper-slide>

            <swiper-slide
            v-for="(item, i) in items"
            :key="i"
            :class="{
                actived: hovered_i === i,
                deactived: hovered_i !== null && hovered_i !== i
            }"
            :style="itemWidth ? { width: itemWidth } : {}"
            @mouseenter="hovered_i = i"
            @mouseleave="hovered_i = null">
                <slot
                name="item"
                :item="item"
                :index="i" />
            </swiper-slide>
        </swiper>

        <slot
        name="controls"
        :next="next"
        :prev="prev"
        :to="to"
        :index="instance ? instance.activeIndex : 0"
        :isEnd="instance ? instance.isEnd : false" />
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
    Pagination,
    // Navigation,
    Scrollbar,
    Mousewheel,
    FreeMode,
    Autoplay
} from 'swiper/modules'

import 'swiper/css'
// import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default {
    name: 'carousel',
    props: {
        items: {
            type: Array,
            required: false,
            default: () => []
        },
        'items-per-view': {
            type: [String, Number],
            required: false,
            default: 'auto'
        },
        'items-space-between': {
            type: Number,
            required: false,
            default: 0
        },
        'item-width': {
            type: String,
            required: false,
            default: null
        },
        'start-at': {
            type: Number,
            required: false,
            default: 0
        },
        autoplay: {
            type: [Boolean, Object],
            required: false,
            default: false
        },
        pagination: {
            type: [Boolean, Object],
            required: false,
            default: false
        },
        navigation: {
            type: Boolean,
            required: false,
            default: false
        },
        scrollbar: {
            type: [Boolean, Object],
            required: false,
            default: false
            // {
            //     hide: false,
            //     enabled: scrollbar,
            //     draggable: true
            // }
        },
        freemode: {
            type: [Boolean, Object],
            required: false,
            default: false
        },
        mousewheel: {
            type: [Boolean, Object],
            required: false,
            default: () => {
                return {
                    // Imposta su true per forzare i movimenti della rotellina del mouse sull'asse. Quindi in modalità orizzontale la rotellina del mouse funzionerà solo con lo scorrimento orizzontale della rotellina del mouse e solo con lo scorrimento verticale in modalità verticale.
                    forceToAxis: true,
                    invert: false,
                    // Impostato su true e lo swiper rilascerà l'evento della rotellina del mouse e consentirà lo scorrimento della pagina quando lo swiper si trova sulle posizioni del bordo (all'inizio o alla fine)
                    releaseOnEdges: false,
                    // Moltiplicatore dei dati della rotellina del mouse, consente di modificare la sensibilità della rotellina del mouse
                    sensitivity: 0.5,
                    // Delta minimo di scorrimento della rotellina del mouse per attivare il cambio di diapositiva del cursore,
                    thresholdDelta: 50,
                    // Delta minimo del tempo di scorrimento della rotellina del mouse (in ms) per attivare il cambio di diapositiva dello swiper
                    thresholdTime: null
                }
            }
        },
        breakpoints: {
            type: Object,
            required: false,
            default: () => {}
        },
        direction: {
            type: String,
            required: false,
            default: 'horizontal'
        },
        speed: {
            type: Number,
            required: false,
            default: 500
        },
        centered: {
            type: Boolean,
            required: false,
            default: false
        },
        loop: {
            type: Boolean,
            required: false,
            default: false
        },
        'grab-cursor': {
            type: Boolean,
            required: false,
            default: false
        },
        'allow-touch-move': {
            type: Boolean,
            required: false,
            default: true
        },
        clip: {
            type: String,
            required: false,
            default: null
        }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    data () {
        return {
            instance: null,
            modules: [
                Autoplay,
                Pagination,
                // Navigation,
                Scrollbar,
                Mousewheel,
                FreeMode
            ],
            local_breakpoints: {
                // // when window width is >= 0
                // 0: {
                //     slidesPerView: 1,
                //     spaceBetween: this.itemsSpaceBetween
                // },
                // // when window width is >= 320px
                // 319: {
                //     slidesPerView: 2,
                //     spaceBetween: this.itemsSpaceBetween
                // },
                // // when window width is >= 767
                // 767: {
                //     slidesPerView: 3,
                //     spaceBetween: this.itemsSpaceBetween
                // },
                // // when window width is >= 1023
                // 959: {
                //     slidesPerView: this.itemsPerView,
                //     spaceBetween: this.itemsSpaceBetween
                // }
            },
            hovered_i: null
        }
    },
    methods: {
        getRef (instance) {
            this.instance = instance
            // console.log(this.instance)
        },
        next () {
            this.instance.slideNext()
        },
        prev () {
            this.instance.slidePrev()
        },
        to (i, speed) {
            this.instance.slideTo(i, speed)
        },
        update () {
            this.instance.update()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/mq.scss';

$swiper-btn-size: 30px;

.swiper {
    width: 100%;
    height: 100%;

    &:hover {
        .swiper-button-prev,
        .swiper-button-next {
            opacity: 1;
            pointer-events: auto;
        }
    }

    .swiper-wrapper {
        // transition-timing-function: linear !important;
    }

    .swiper-slide {
        // width: auto;
        // height: 100%;
        // border: 1px solid red;
    }

    //
    .swiper-button-prev,
    .swiper-button-next {
        width: $swiper-btn-size;
        height: $swiper-btn-size;
        border-radius: var(--radius);
        background-color: var(--color-secondary);
        color: #fff;
        pointer-events: none;
        opacity: 0;
        transition: background-color 0.25s ease-out, opacity 0.25s ease-out;
        box-shadow: 0px 1px 4px -1px rgba(#000, 0.5);
        cursor: pointer;

        &::after {
            font-size: 70% !important;
        }

        &.swiper-button-disabled {
            pointer-events: none !important;
            background-color: var(--color-disabled);
            color: var(--color-mute);
        }

        &:hover {
            background-color: var(--color-secondary);
        }
    }

    .swiper-button-prev {
        left: var(--size-ui);
    }

    .swiper-button-next {
        right: var(--size-ui);
    }

    //
    .swiper-pagination {
        bottom: var(--size-ui);
        width: 100%;
        z-index: 1;

        .swiper-pagination-bullet {
            opacity: 1;
            width: 12px;
            height: 12px;
            background: transparent;
            border: 1px solid var(--color-white);
            transition: border 0.25s ease-out, background-color 0.25s ease-out;

            &.swiper-pagination-bullet-active,
            &:hover {
                opacity: 1;
                background-color: var(--color-secondary);
                border: none;
            }
        }
    }

    //
    .swiper-scrollbar {
        position: relative !important;
        display: block;
        height: 10px;
        left: 0;
        width: 100%;
        margin: 0 auto;
        margin-top: var(--size-ui);
        background-color: rgba(#000, 0.15);
        border-radius: var(--radius);
        transform: scaleY(0.15);
        transform-origin: left center;
        transition: transform 0.25s ease-out;

        &:hover {
            transform: scaleY(1);
            cursor: grab;
        }

        > div {
            background-color: var(--color-secondary);
            border-radius: var(--radius);
        }
    }
}
</style>
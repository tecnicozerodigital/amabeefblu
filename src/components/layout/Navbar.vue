<template>
    <header :class="['bxs-navbar', {
        'bxs-navbar-on': on,
        'bxs-navbar-hide': hide
    }]">
        <div class="background-layer">
            <!-- <p-section-divider color="tertiary" /> -->
        </div>

        <bxs-layout fluid>
            <div class="bxs-navbar--logo-box">
                <logo style="transform: translateY(-2.5px);" />
                <!-- <logo src="/img/ristorante-amabeef-logo-logotipo-2.png" /> -->
            </div>

            <nav
            v-if="$mq.from('ds')"
            aria-label="Navigazione principale"
            class="bxs-navbar--nav-box">
                <ul>
                    <li>
                        <a role="button" @click="$root.scrollTo('#menu')">Menu</a>
                    </li>
                    <li>
                        <router-link to="/offerte">Offerte</router-link>
                    </li>
                    <!-- <li>
                        <a role="button" @click="to('#carne')">Carne</a>
                    </li> -->
                    <!-- <li>
                        <a role="button" @click="to('#gintoneria')">Gintoneria</a>
                    </li> -->
                    <li>
                        <!-- <a role="button" @click="to('#chi-siamo')">Chi siamo</a> -->
                        <a role="button" @click="$root.scrollTo('#chi-siamo')">Chi siamo</a>
                    </li>
                    <!-- <li>
                        <router-link to="/galleria-immagini">Galleria</router-link>
                    </li> -->
                    <!-- <li>
                        <router-link to="/news">News</router-link>
                    </li> -->
                    <li>
                        <a role="button" @click="$root.scrollTo('#contatti')">Contatti</a>
                    </li>
                </ul>
            </nav>
            <nav class="sr-only">
                <ul>
                    <li>
                        <a role="button" @click="$root.scrollTo('#menu')">Menu</a>
                    </li>
                    <li>
                        <router-link to="/offerte">Offerte</router-link>
                    </li>
                    <!-- <li>
                        <a role="button" @click="to('#carne')">Carne</a>
                    </li> -->
                    <!-- <li>
                        <a role="button" @click="to('#gintoneria')">Gintoneria</a>
                    </li> -->
                    <!-- Ancore alle sezioni della home, non rotte a se' stanti:
                         questa nav deve rispecchiare quella visibile, che scorre
                         alla sezione. Galleria e News non hanno un equivalente
                         in pagina e restano fuori finche' non esistono davvero. -->
                    <li>
                        <a href="#chi-siamo">Chi siamo</a>
                    </li>
                    <li>
                        <a href="#contatti">Contatti</a>
                    </li>
                </ul>
            </nav>

            <div class="bxs-navbar--cta-box">
                <btn
                small
                primary
                class="mr-ui text-uppercase"
                @click="$root.scrollTo('#menu')">Menu</btn>

                <btn
                href="https://amabeef.plateform.app"
                icon="calendar"
                class="mr-4"></btn>

                <btn
                href="tel:+393475048825"
                target=""
                icon="phone"
                class="mr-4"></btn>

                <btn
                href="https://www.google.com/maps/dir//Via+Alessandro+Manzoni,+34,+22071+Cadorago+CO/@45.7178517,8.956321,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4786854995c5b0d7:0x6012dcc0d598b482!2m2!1d9.0387216!2d45.7178813?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D"
                icon="map"
                class="mr-4"></btn>

                <!-- <btn icon="hamburger"></btn> -->
            </div>
        </bxs-layout>
    </header>
</template>

<script>
export default {
    name: 'bxs-navbar',
    props: {
        on: {
            type: Boolean,
            required: false,
            default: false
        },
        hide: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

.bxs-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--navbar-height) / 1.25);
    font-size: var(--navbar-font-size);
    // background-color: var(--navbar-background-color);
    background-color: transparent;
    z-index: var(--layer-navbar);
    // mix-blend-mode: multiply;
    transition: all 0.75s ease-out;

    @include mq($mq-static-breakpoint) {
        height: var(--navbar-height);
    }

    &.bxs-navbar-on {
        // height: calc(var(--navbar-height) * 1.5);

        .background-layer {
            transform: translateY(0);
        }
    }

    &.bxs-navbar-hide {
        transform: translateY(-100%);
    }

    .background-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-tertiary);
        transform: translateY(-150%);
        transition: transform 0.5s ease-out;
        // display: flex;
        // flex-flow: row nowrap;
        // align-items: flex-end;

        svg {
            position: absolute;
            left: 0;
            bottom: -25%;
            // transform: rotate(180deg);
        
            path {
                fill: var(--color-tertiary);
            }
        }
    }

    .bxs-layout {
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        > div,
        > nav {
            // flex: 1;
        }
    }

    &--logo-box {
    }

    &--nav-box {
        flex: 1;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        // border: 1px solid red;

        > ul {
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            > li {
                color: var(--color-primary);
                margin-right: var(--size-ui);
                &:last-child { margin-right: 0; }
            }
        }
    }

    &--cta-box {
        text-align: end;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>
<template>
    <div class="index--view">
        <hero
        data-scroll-anim="parallax-hero"
        data-scroll-anim-y="-25"
        id="hero"
        :imgs="[
            { src: '/img/cibo-persone/cibo-persone-carne-cotta-1.jpeg', alt: '' },
            { src: '/img/preparazione-cocktail-1.jpg', alt: '' },
            { src: '/img/hamburger-cucinato-1.jpg', alt: '' },
            { src: '/img/piatto-cucinato-1.jpg', alt: '' },
            { src: '/img/sala/sala-9.jpeg', alt: '' }
        ]"
        :slides-to-show="$mq.from('ds') ? 2 : 1">
            <img
            data-scroll-anim-reveal="fade"
            src="/img/ristorante-amabeef-logo-logotipo-2.png"
            alt="Logo logotipo ristorante AmaBeef Cadorago Como"
            style="max-width: 80px;"
            class="mb-2">

            <h1
            data-scroll-anim-reveal="text"
            class="h2 text-secondary">Steakhouse & Gintoneria <br> a Cadorago, Como</h1>

            <p-divider
            width="160px"
            color="secondary"
            class="sr-only-mobile mb-ui" />

            <h2
            data-scroll-anim-reveal="text"
            class="p text-ui text-secondary text-letter-spacing-normal sr-only-mobile"
            style="font-size: 1rem; line-height: normal;">Carni pregiate selezionate dalla <a href="#chi-siamo">Famiglia Amabile</a> <br> e oltre 150 etichette di gin da tutto il mondo.</h2>

            <btn
            data-scroll-anim-reveal="fade"
            primary
            href="https://amabeef.plateform.app"
            target="_blank"
            title="Prenota un tavolo alla steakhouse AmaBeef a Cadorago, Como">Prenota il tuo tavolo</btn>
        </hero>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            il locale
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="locale"
        class="section-end-fill pb-0">
            <bxs-layout max-cols="10">
                <bxs-row
                align="end"
                class="mb-ui">
                    <bxs-col cols="12" ds="5">
                        <!-- data-scroll-anim-reveal="text" -->
                        <p
                        class="text-uppercase small text-o-mute text-600">Il locale</p>
                        <!-- data-scroll-anim-reveal="text" -->
                        <h2>Il ristorante a <a href="https://www.google.com/maps/dir//Via+Alessandro+Manzoni,+34,+22071+Cadorago+CO/@45.7178517,8.956321,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x4786854995c5b0d7:0x6012dcc0d598b482!2m2!1d9.0387216!2d45.7178813?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" class="link-actived">Cadorago</a> dove vivere esperienze autentiche</h2>
                    </bxs-col>

                    <bxs-col cols="12" ds="5">
                        <!-- data-scroll-anim-reveal="text" -->
                        <p>AmaBeef è molto più di una steakhouse: è un luogo moderno ed elegante, situato a pochi minuti da Como, dove la passione per la carne incontra la ricercatezza del gin. Le nostre sale accoglienti e il nostro team attento e professionale ti faranno sentire subito a casa.</p>
                    </bxs-col>
                </bxs-row>
            </bxs-layout>

            <bxs-layout max-cols="9">
                <bxs-carousel
                ref="carouselMenu"
                :items="[
                    '/img/sala/sala-1.jpeg',
                    '/img/sala/sala-2.jpeg',
                    '/img/sala/sala-3.jpeg',
                    '/img/sala/sala-4.jpeg',
                    '/img/sala/sala-5.jpeg',
                    '/img/sala/sala-6.jpeg',
                    '/img/sala/sala-7.jpeg',
                    '/img/sala/sala-8.jpeg',
                    '/img/sala/sala-9.jpeg',
                    '/img/sala/insegna.jpeg'
                ]"
                items-per-view="1"
                :items-space-between="0"
                :mousewheel="false"
                :breakpoints="{
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 40
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    }
                }"
                clip="clip-1"
                :style="{ height: $mq.from('ds') ? '100vh' : '75vh' }">
                    <template #item="{ item }">
                        <bxs-figure-v2
                        :src="item"
                        fullHeight
                        ratio="2-3" />
                    </template>

                    <template #controls="{ index, isEnd }">
                        <p-controls
                        color="tertiary"
                        :label="false"
                        :disabled-next="isEnd"
                        :disabled-prev="!index"
                        @prev="$refs.carouselMenu.prev()"
                        @next="$refs.carouselMenu.next()" />
                    </template>
                </bxs-carousel>
            </bxs-layout>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            menu
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="menu"
        class="fourth text-tertiary highlighted-section pt-0">
            <bxs-layout max-cols="7">
                <bxs-row>
                    <bxs-col
                    cols="12"
                    ds="8"
                    offset-ds="2"
                    class="text-center">
                        <p-divider width="50%" color="tertiary" class="mb-ui" />
                        <p
                        data-scroll-anim-reveal="text"
                        class="text-uppercase text-o-mute small text-600">Menu</p>
                        <h2
                        data-scroll-anim-reveal="text"
                        class="h3">Non esiste un solo menù, ma un viaggio nei sapori</h2>
                    </bxs-col>
                </bxs-row>

                <bxs-row>
                    <bxs-col cols="12" ds="4">
                        <p data-scroll-anim-reveal="text">Da AmaBeef trovi diversi menù alla carta pensati per ogni esperienza: dalla carne selezionata agli hamburger gourmet, fino alla carta dei gin e alla cantina dei vini.</p>
                    </bxs-col>

                    <bxs-col cols="12" ds="4">
                        <p-card
                        title="Menu alla carta ristorante"
                        text="Tagli di carne selezionati, specialità stagionali, contorni freschi e piatti unici che raccontano la tradizione della Famiglia Amabile."
                        src="/img/carne-cotta-3.png"
                        overlay-text-color="tertiary"
                        overlay-bg-color="fourth"
                        href="/files/amabeef-cadorago-como-menu-ristorante.pdf" />
                    </bxs-col>

                    <bxs-col cols="12" ds="4">
                        <p-card
                        title="Menu hamburger gourmet"
                        text="Pane artigianale, carni pregiate e abbinamenti creativi per hamburger che uniscono gusto e qualità."
                        src="/img/hamburger-cucinato-2.jpg"
                        overlay-text-color="tertiary"
                        overlay-bg-color="fourth"
                        href="/files/amabeef-cadorago-como-menu-hamburger.pdf" />
                    </bxs-col>

                    <bxs-col cols="12" ds="4" offset-ds="4">
                        <p-card
                        title="Carta dei gin & drink list"
                        text="Oltre 150 etichette di gin italiani e internazionali, cocktail classici e signature per un’esperienza da gintoneria unica in provincia di Como."
                        src="/img/gin.jpg"
                        overlay-text-color="tertiary"
                        overlay-bg-color="fourth"
                        href="/files/amabeef-cadorago-como-menu-gin-drink-list.pdf" />
                    </bxs-col>

                    <bxs-col cols="12" ds="4">
                        <p-card
                        title="Cantina dei vini"
                        text="Una selezione curata di vini italiani e internazionali, dalle etichette più note a bottiglie ricercate per accompagnare al meglio le nostre carni."
                        src="/img/piatto-cucinato-2.jpg"
                        overlay-text-color="tertiary"
                        overlay-bg-color="fourth"
                        href="/files/amabeef-cadorago-como-menu-carta-dei-vini.pdf" />
                    </bxs-col>

                    <bxs-col
                    cols="12" ds="8" offset-ds="4"
                    class="mt-ui">
                        <p data-scroll-anim-reveal="text">AmaBeef è la steakhouse & gintoneria di Como dove famiglie, giovani e coppie trovano il loro posto.</p>
                        <p data-scroll-anim-reveal="text">Spazi accoglienti e un menù che soddisfa grandi e piccoli (dalle carni selezionate agli hamburger gourmet), ambiente moderno e conviviale per aperitivi con cocktail, gin tonic e drink signature, e un’atmosfera intima e ricercata perfetta per una cena romantica con servizio attento e cantina dei vini.</p>
                        <p data-scroll-anim-reveal="text">Che si tratti di pranzo in famiglia, aperitivo con gli amici o serata a due, da AmaBeef vivi un’esperienza completa tra cucina di qualità e miscelazione d’eccellenza.</p>
                    </bxs-col>
                </bxs-row>
            </bxs-layout>

            <p-section-divider color="fourth"></p-section-divider>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            offerte
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="offerte"
        class="section-test-2">
            <div
            data-scroll-anim="scale"
            class="section-test-2-img"
            :style="{ backgroundImage: 'url(/img/hamburger-cucinato-5.jpg)' }"></div>
            <div class="overlay"></div>

            <bxs-layout
            max-cols="6"
            class="centerized text-center text-tertiary">
                <p
                data-scroll-anim-reveal="text"
                class="text-uppercase small text-o-mute text-600">Offerte</p>
                <!-- l’esperienza autentica della carne -->
                <h2 data-scroll-anim-reveal="text">Le nostre offerte e promozioni</h2>
                <p data-scroll-anim-reveal="text">Da AmaBeef trovi offerte aggiornate per ogni momento: pranzo business con proposte dedicate, aperitivo con drink premium e taglieri, menù carne e hamburger gourmet a prezzo speciale, Gin Experience con degustazioni e cocktail signature. Scopri le promozioni attive a Cadorago, in provincia di Como.</p>
                <btn
                data-scroll-anim-reveal="fade"
                to="/offerte">Scopri le nostre offerte</btn>
            </bxs-layout>

            <p-section-divider color="fourth" pos="top"></p-section-divider>
            <p-section-divider color="tertiary"></p-section-divider>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            prenota
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="prenota-1"
        class="tertiary"
        style="height: 75vh;">
            <bxs-layout
            max-cols="8"
            class="centerized-flex">
                <div class="text-center">
                    <!-- <p class="text-uppercase text-o-mute small text-600">Da AmaBeef puoi vivere il locale in tanti momenti diversi della giornata</p> -->
                    <h2 data-scroll-anim-reveal="text">Il locale perfetto per ogni occasione</h2>
                    <p data-scroll-anim-reveal="text">Che tu stia cercando il posto dove cenare in coppia, il locale per l’aperitivo con gli amici <br> o un pranzo rilassato in famiglia, AmaBeef ti accoglie sempre con lo stesso calore.</p>
                    <btn
                    href="https://amabeef.plateform.app"
                    target="_blank"
                    data-scroll-anim-reveal="fade">Prenota il tuo tavolo</btn>
                </div>
            </bxs-layout>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            carne
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="carne"
        class="fifth">
            <!-- <p-section-divider pos="top" color="tertiary"></p-section-divider> -->

            <bxs-layout max-cols="7">
                <bxs-row align="center">
                    <bxs-col cols="12" ds="6">
                        <bxs-figure-v2
                        src="/img/cibo/cibo-crudo/cibo-crudo-carne-1.jpeg"
                        ratio="2-3"
                        class="clip-8"
                        :style="$mq.from('ds') ? 'transform: translateY(-25%);' : null"></bxs-figure-v2>
                    </bxs-col>

                    <bxs-col cols="12" ds="6">
                        <h2
                        data-scroll-anim-reveal="text"
                        class="h3 text-tertiary">La carne in tutte le sue forme</h2>
                    </bxs-col>

                    <bxs-col cols="12" ds="7">
                        <p
                        data-scroll-anim-reveal="text"
                        class="h5 text-o-mute text-tertiary">Dal taglio di carne più classico al pezzo più ricercato, AmaBeef propone un menu che celebra la carne in tutte le sue forme.</p>
                    </bxs-col>
                </bxs-row>
            </bxs-layout>

            <bxs-layout max-cols="7">
                <bxs-figure-v2
                src="/img/cibo-persone/cibo-persone-carne-cotta-1.jpeg"
                ratio="2-3" />
                <p-section-divider pos="top" color="fifth"></p-section-divider>
                <p-section-divider color="fifth"></p-section-divider>
            </bxs-layout>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            gintoneria
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="gintoneria"
        class="fifth">
            <bxs-layout
            max-cols="7"
            class="mb-24">
                <bxs-row align="center">
                    <bxs-col cols="12" ds="6">
                        <bxs-figure-v2
                        src="/img/bere/bere-4.jpeg"
                        ratio="2-3"
                        class="clip-8 mx-auto" />
                        <!-- <p-section-divider pos="top" color="tertiary"></p-section-divider> -->
                    </bxs-col>

                    <bxs-col cols="12" ds="6">
                        <h2
                        data-scroll-anim-reveal="text"
                        class="h3 text-tertiary">Gintoneria con oltre 150 etichette da tutto il mondo</h2>
                    </bxs-col>

                    <bxs-col cols="12" ds="6">
                        <p
                        data-scroll-anim-reveal="text"
                        class="h5 text-o-mute text-tertiary">Concludi la tua cena scegliendo tra una selezione unica di gin italiani e internazionali, abbinati alle migliori toniche per un’esperienza sensoriale esclusiva. Da AmaBeef troverai sempre nuove etichette da scoprire e gustare.</p>
                    </bxs-col>
                </bxs-row>
            </bxs-layout>

            <bxs-layout max-cols="7">
                <div class="grid">
                    <div class="col col-2 mb-2">
                        <bxs-figure-v2
                        src="/img/preparazione-cocktail-1.jpg"
                        ratio="2-3" />
                        <p-section-divider pos="top" color="fifth"></p-section-divider>
                        <p-section-divider color="fifth"></p-section-divider>
                    </div>
                </div>
            </bxs-layout>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            prenota
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="prenota-2"
        class="fifth text-tertiary pt-0">
            <bxs-layout
            max-cols="8"
            class="centerized-flex">
                <div
                class="text-center">
                    <p :class="$mq.from('ds') ? 'h5' : 'h6'">Il punto d’incontro ideale per chi ama la buona cucina, <br> il bere di qualità e i momenti da condividere</p>
                    <btn
                    href="https://amabeef.plateform.app"
                    target="_blank">Prenota il tuo tavolo</btn>
                </div>
            </bxs-layout>

            <p-section-divider color="fifth" pos="top" dir="bottom"></p-section-divider>
            <p-section-divider color="fifth"></p-section-divider>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            ig section
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="instagram"
        class="fifth">
            <bxs-layout
            class="centerized-flex text-center"
            style="z-index: 1;">
                <h2
                class="text-uppercase text-secondary text-no-wrap"
                style="font-size: 12.5vh;">Seguici su instagram</h2>
                <btn
                href="https://www.instagram.com/amabeefrestaurant"
                target="_blank"
                data-scroll-anim-reveal="fade">Vai su instagram</btn>
            </bxs-layout>

            <div
            class="section-test"
            :style="{ backgroundImage: 'url(/img/cibo-persone/cibo-carne-cruda-cameriere-1.jpeg)' }"></div>

            <!-- <p-section-divider color="tertiary" pos="top" dir="bottom"></p-section-divider> -->
            <p-section-divider color="fifth"></p-section-divider>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section>
            <bxs-carousel
            :items="[
                '/img/cibo/amabeef-20.jpeg',
                '/img/cibo/amabeef-23.jpeg',
                '/img/cibo/amabeef-71.jpeg',
                '/img/cibo/amabeef-63.jpeg',
                '/img/cibo/amabeef-153.jpeg',
                '/img/cibo/amabeef-112.jpeg',
                '/img/cibo/amabeef-102.jpeg',
                '/img/cibo/amabeef-112.jpeg',
                '/img/cibo/amabeef-140.jpeg',
                '/img/cibo/amabeef-153.jpeg',
                '/img/cibo/amabeef-243.jpeg',
                '/img/cibo/IMG_0400.jpeg',
                '/img/cibo/IMG_0404.jpeg',
                '/img/carne-cotta-1.jpg',
                '/img/carne-cotta-3.png',
                '/img/hamburger-cucinato-3.jpg',
                '/img/hamburger-cucinato-4.jpg',
                '/img/cibo-persone/cibo-persone-2.jpeg'
            ]"
            items-per-view="1"
            :items-space-between="20"
            navigation
            loop
            :breakpoints="{
                1024: {
                    slidesPerView: 3
                }
            }">
                <template #item="{ item }">
                    <bxs-figure-v2
                    :src="item"
                    ratio="2-3" />
                </template>

                <template #controls="{ index, isEnd, next, prev }">
                    <p-controls
                    relative
                    align="end"
                    :disabled-next="isEnd"
                    :disabled-prev="!index"
                    @prev="prev()"
                    @next="next()" />
                </template>
            </bxs-carousel>

            <p-section-divider color="tertiary"></p-section-divider>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            chi siamo
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <section
        id="chi-siamo"
        class="section-test-2">
            <div
            data-scroll-anim="scale"
            class="section-test-2-img"
            :style="{ backgroundImage: 'url(/img/cibo-persone/cibo-carne-cruda-dennis-1.jpeg)' }"></div>
            <div class="overlay"></div>

            <bxs-layout
            max-cols="6"
            class="centerized-flex text-center text-tertiary">
                <!-- <p class="text-uppercase text-o-mute small text-600">Chi siamo</p> -->
                <h2 class="h6 text-ui text-300">Dal 1960, con la Masseria Amabile, la nostra famiglia alleva bestiame con passione e rispetto. Oggi portiamo la stessa tradizione a tavola, unendo la nostra esperienza con la cucina creativa dello Chef Donato, per offrirti un’esperienza unica tra qualità, storia e innovazione.</h2>
            </bxs-layout>

            <p-section-divider color="tertiary"></p-section-divider>
        </section>

        <!-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            dicono di noi
        -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -->
        <!-- <section id="dicono-di-noi">
            <bxs-layout>
                <div>
                    <p class="text-uppercase text-o-mute small text-600">Recensioni</p>
                    <h2 class="h3">Cosa dicono di noi</h2>
                </div>
                
                <bxs-carousel
                :items="reviews"
                items-per-view="1"
                :items-space-between="20"
                :breakpoints="{
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }">
                    <template #item="{ item }">
                        <div>
                            <div style="min-height: 200px;">
                                <p class="small">{{ item.message }}</p>
                            </div>

                            <div class="flex nowrap align-center pl-1">
                                <img
                                :src="`/img/logo-${item.platform}.png`"
                                alt=""
                                style="width: 25px; height: 25px;"
                                class="mr-4">

                                <span class="small">{{ item.from_name }}</span>
                            </div>
                        </div>
                    </template>

                    <template #controls="{ index, isEnd, prev, next }">
                        <p-controls
                        color="white"
                        relative
                        :label="false"
                        :disabled-next="isEnd"
                        :disabled-prev="!index"
                        class="mt-12"
                        @prev="prev()"
                        @next="next()" />
                    </template>
                </bxs-carousel>
            </bxs-layout>
        </section> -->
    </div>
</template>

<script>
import Hero from '@/components/project/Hero.vue'

export default {
    name: 'home',
    components: {
        hero: Hero
        // 'images-ui': ImagesUi
        // 'home-carousel': HomeCarousel
    },
    data () {
        return {
            reviews: [
                {
                    platform: 'google',
                    from_name: 'Alessandro',
                    message: 'Mi sono recato qua un sabato sera per una cena con amici, siamo stati trattati davvero bene, il cibo è ottimo dagli antipasti alle carni, il servizio davvero preciso con camerieri che sanno fare il loro lavoro, una cosa che ho davvero apprezzato è la distanza tra un tavolo e l\'altro che garantisce quel po di privacy in più, il conto è in linea con il posto e con quanto mangiato e bevuto. Bravi davvero'
                },
                {
                    platform: 'google',
                    from_name: 'Alessandro',
                    message: 'Ottima esperienza di cena con amici. Piatti molto buoni, bella location, attenzione verso il cliente e il fatto che sia anche una gintoneria con una ampissima scelta è un ottimo plus. Ci tornerò senz\'altro'
                },
                {
                    platform: 'google',
                    from_name: 'Alberto',
                    message: 'AmaBeef propone principalmente portate di carne e hamburger, insieme a un paio di proposte di primi e un piccolo menu bimbi, un\'ampia carta vini e soprattutto un\'ampissima carta di gin. Abbiamo trovato personale cordiale e cibo buonissimo, prezzi nella media per il tipo di proposta di elevata qualita. Torneremo sicuramente!'
                }
            ]
        }
    }
}
</script>
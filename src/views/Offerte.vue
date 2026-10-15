<template>
    <div class="offerte--view">
        <section>
            <bxs-layout max-cols="10">
                <div>
                    <h1>Le nostre offerte</h1>
                    <p class="h6">Da AmaBeef trovi offerte aggiornate per ogni momento: pranzo business con proposte dedicate, aperitivo con drink premium e taglieri, menù carne e hamburger gourmet a prezzo speciale, Gin Experience con degustazioni e cocktail signature.</p>
                    <p>Scopri le promozioni attive a Cadorago, in provincia di Como.</p>
                </div>

                <bxs-row>
                    <bxs-col cols="12" ds="6">
                        <img src="/img/offerte/offerta-menu-romano-171025.jpeg" alt="Offerta Amabeef menu romano da Ottobre 2025">
                    </bxs-col>

                    <!-- <bxs-col cols="12" ds="6">
                        <img src="/img/offerte/6.jpeg" />
                    </bxs-col> -->

                    <bxs-col cols="12" ds="6">
                        <img src="/img/offerte/7.jpeg" />
                    </bxs-col>

                    <!-- <bxs-col cols="12" ds="4">
                        <img src="/img/offerte/3.jpg" />
                    </bxs-col> -->

                    <!-- <bxs-col cols="12" ds="4">
                        <img src="/img/offerte/4.jpg" />
                    </bxs-col> -->

                    <!-- <bxs-col cols="12" ds="4">
                        <img src="/img/offerte/5.jpg" />
                    </bxs-col> -->
                </bxs-row>
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
                    <btn>Prenota il tuo tavolo</btn>
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
                <btn data-scroll-anim-reveal="fade">Vai su instagram</btn>
            </bxs-layout>

            <div
            class="section-test"
            :style="{ backgroundImage: 'url(/img/cibo-persone/cibo-carne-cruda-cameriere-1.jpeg)' }"></div>

            <!-- <p-section-divider color="tertiary" pos="top" dir="bottom"></p-section-divider> -->
            <p-section-divider color="fifth"></p-section-divider>
        </section>
    </div>
</template>

<script>
export default {
    name: 'offerte'
}
</script>
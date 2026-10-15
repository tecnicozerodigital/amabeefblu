<template>
    <footer
    class="app--footer bxs-footer secondary text-tertiary"
    id="footer"
    role="contentinfo">
        <p-section-divider color="tertiary" pos="top"></p-section-divider>

        <!-- DOVE SIAMO -->
        <section id="contatti" class="text-center">
            <bxs-layout>
                <p
                data-scroll-anim-reveal="text"
                class="text-uppercase text-o-mute small text-600">
                    Dove siamo
                </p>

                <h2
                data-scroll-anim-reveal="text"
                class="h3">Vieni a trovarci a Cadorago (Como)</h2>

                <p data-scroll-anim-reveal="text">AmaBeef è a pochi minuti da Como: steakhouse & gintoneria con carni selezionate, hamburger gourmet e gin & cocktail.</p>

                <!-- NAP semantico -->
                <address class="mt-ui not-italic">
                    <p class="mb-0">Via Alessandro Manzoni, 34 – 22071 Cadorago (CO)</p>
                    <p class="mb-0">
                        <a
                        href="tel:+393475048825"
                        aria-label="Chiama AmaBeef al numero 347 50 48 825">+39 347 50 48 825</a>
                        ·
                        <a
                        href="mailto:amabeefrestaurant@gmail.com"
                        aria-label="Invia una mail a info chiocciola amabeef restaurant punto it">amabeefrestaurant@gmail.com</a>
                    </p>

                    <!-- Orari (compila se disponibili) --> 
                    <ul class="small mt-6">
                        <li class="mb-3">
                            <p class="mb-0">Mar - Ven</p>
                            <time datetime="12:00">12:00</time>–<time datetime="15:00">15:00</time>,
                            <time datetime="18:30">18:30</time>–<time datetime="00:00">00:00</time>
                        </li>
                        <li class="mb-3">
                            <p class="mb-0">Sab</p>
                            <time datetime="18:30">18:30</time>–<time datetime="00:00">00:00</time>
                        </li>
                        <li class="mb-3">
                            <p class="mb-0">Dom</p>
                            <time datetime="18:30">18:30</time>–<time datetime="00:00">00:00</time>
                            <!-- <time datetime="18:00">18:00</time>–<time datetime="23:00">23:00</time> -->
                        </li>
                        <li>
                            <p class="mb-0">Lun</p>
                            <p class="text-uppercase">Chiuso</p>
                        </li>
                    </ul>
                </address>

                <bxs-btn
                class="mt-8"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.google.com/maps/place/Via+Alessandro+Manzoni,+34,+22071+Cadorago+CO"
                aria-label="Apri le indicazioni stradali su Google Maps per AmaBeef a Cadorago, Como"
                title="Indicazioni stradali su Google Maps">Apri Maps</bxs-btn>
            </bxs-layout>
        </section>

        <!--  -->
        <bxs-layout
        max-cols="7"
        class="mt-12">
            <bxs-row>
                <bxs-col cols="12" ds="4">
                    <logo max-width="80" />
                    <p class="mb-ui text-uppercase mt-ui">AmaBeef © DNA S.R.L.</p>
                    <p class="mb-0">P.IVA 04196700134</p>
                    <p class="mb-0">© {{ new Date().getFullYear() }} · Tutti i diritti riservati</p>
                </bxs-col>

                <!-- Contatti rapidi -->
                <bxs-col cols="12" ds="4">
                    <p class="mb-ui text-o-mute text-uppercase">Contatti</p>

                    <ul>
                        <li class="mb-1">
                            <a
                            href="tel:+393475048825"
                            aria-label="Chiama AmaBeef: 347 50 48 825">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 24 24" class="mr-ui">
                                    <path
                                    d="M5 3.5v17A2.5 2.5 0 0 0 7.5 23h9a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 16.5 1h-9A2.5 2.5 0 0 0 5 3.5Z M16.5 21h-9a.5.5 0 0 1-.5-.5v-17c0-.28.22-.5.5-.5h9c.28 0 .5.22.5.5v17a.5.5 0 0 1-.5.5Z"
                                    fill="var(--color-tertiary)" />
                                </svg>
                                <span>347 50 48 825</span>
                            </a>
                        </li>
                        <li class="mb-1">
                            <a
                            href="https://www.google.com/maps/place/Via+Alessandro+Manzoni,+34,+22071+Cadorago+CO"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Apri Google Maps: Via Alessandro Manzoni 34, Cadorago, Como">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1em" class="mr-ui">
                                    <path
                                    d="M12 4a6 6 0 0 1 6 6c0 3.06-3 6.76-6 9.41C9 16.77 6 13.07 6 10a6 6 0 0 1 6-6m0 9c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3"
                                    fill="var(--color-tertiary)" />
                                </svg>
                                <span>Via A. Manzoni, 34 · Cadorago (CO)</span>
                            </a>
                        </li>
                        <li>
                            <a
                            href="mailto:amabeefrestaurant@gmail.com"
                            aria-label="Scrivi a amabeefrestaurant@gmail.com">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1em" class="mr-ui">
                                    <path
                                    d="M19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 19.5 4ZM12 12 4 8.67V6.5c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v2.17l-8 3.32Z"
                                    fill="var(--color-tertiary)" />
                                </svg>
                                <span>amabeefrestaurant@gmail.com</span>
                            </a>
                        </li>
                    </ul>
                </bxs-col>

                <!-- Navigazione footer 1 -->
                <bxs-col cols="6" ds="4">
                    <nav aria-label="Link principali footer">
                        <p class="mb-ui text-o-mute text-uppercase">Parti da qui</p>
                        <ul>
                            <li class="mb-4">
                                <router-link to="/">Home</router-link>
                            </li>
                            <li class="mb-4">
                                <a
                                title="Menù steakhouse, hamburger, gin, vini a Cadorago, Como"
                                role="button"
                                @click="$root.scrollTo('#menu')">Menù</a>
                            </li>
                            <li class="mb-4">
                                <router-link to="/offerte" title="Offerte e promozioni ristorante a Cadorago">Offerte</router-link>
                            </li>
                            <li class="mb-4">
                                <a
                                role="button"
                                title="La storia della Famiglia Amabile"
                                @click="$root.scrollTo('#chi-siamo')">Chi siamo</a>
                            </li>
                        </ul>
                    </nav>
                </bxs-col>

                <!-- Navigazione footer 2 -->
                <!-- <bxs-col cols="6" ds="4">
                    <nav aria-label="Altri link footer">
                        <p class="mb-ui text-o-mute text-uppercase">Poi continua</p>

                        <ul>
                            <li class="mb-4">
                                <router-link to="/news">News</router-link>
                            </li>
                            <li class="mb-4">
                                <router-link
                                to="/galleria-immagini"
                                title="Galleria fotografica ristorante e gintoneria">Galleria</router-link>
                            </li>
                            <li class="mb-4">
                                <router-link to="/contatti">Contatti</router-link>
                            </li>
                            <li class="mb-4">
                                <router-link to="/domande-frequenti" title="Domande frequenti su prenotazioni, menu e orari">Domande frequenti</router-link>
                            </li>
                        </ul>
                    </nav>
                </bxs-col> -->
            </bxs-row>

            <div class="text-o-mute mt-12 small">
                <ul class="flex nowrap">
                    <li class="mr-ui">
                        <router-link to="/policies/privacy-policy">Privacy Policy</router-link>
                    </li>
                    <li class="mr-ui">
                        <router-link to="/policies/cookie-policy">Cookie Policy</router-link>
                    </li>
                    <li>
                        <a href="https://webwild.it" target="_blank" rel="noopener noreferrer">Credits</a>
                    </li>
                </ul>
            </div>
        </bxs-layout>
    </footer>
</template>

<script>
export default {
    name: 'bxs-footer'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mq.scss';

footer {
    position: relative;
    width: 100%;
    min-height: 50vh;
    color: var(--footer-color);
    z-index: var(--layer-navbar);
    transition: transform 0.5s ease-out;
    font-size: var(--footer-font-size);
    padding-top: var(--size-ui);
    padding-bottom: var(--size-ui);

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
}
</style>
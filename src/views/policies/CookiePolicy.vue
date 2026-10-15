<template>
    <div class="cookie-policy--view policy--view">
        <section>
            <bxs-layout>
                <div class="block">
                    <h5>Cookie Policy</h5>
                    <p>AmaBeef</p>
                    <p>{{ new Date().getMonth() }}/{{ new Date().getFullYear() }}</p>
                </div>
            </bxs-layout>
        </section>

        <hr>

        <!-- ------------------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------------ -->
        <section>
            <bxs-layout>
                <p>Questo documento contiene informazioni in merito alle tecnologie che consentono a questa Applicazione di raggiungere gli scopi descritti di seguito. Tali tecnologie permettono al Titolare di raccogliere e salvare informazioni (per esempio tramite l’utilizzo di Cookie) o di utilizzare risorse (per esempio eseguendo uno script) sul dispositivo dell’Utente quando quest’ultimo interagisce con questa Applicazione.</p>
                <p>Per semplicità, in questo documento tali tecnologie sono sinteticamente definite “Strumenti di Tracciamento”, salvo vi sia ragione di differenziare. Per esempio, sebbene i Cookie possano essere usati in browser sia web sia mobili, sarebbe fuori luogo parlare di Cookie nel contesto di applicazioni per dispositivi mobili, dal momento che si tratta di Strumenti di Tracciamento che richiedono la presenza di un browser. Per questo motivo, all’interno di questo documento il termine Cookie è utilizzato solo per indicare in modo specifico quel particolare tipo di Strumento di Tracciamento.</p>
                <p>Alcune delle finalità per le quali vengono impiegati Strumenti di Tracciamento potrebbero, inoltre richiedere il consenso dell’Utente. Se viene prestato il consenso, esso può essere revocato liberamente in qualsiasi momento seguendo le istruzioni contenute in questo documento.</p>
                <p>Questa Applicazione utilizza Strumenti di Tracciamento gestiti direttamente dal Titolare (comunemente detti Strumenti di Tracciamento “di prima parte”) e Strumenti di Tracciamento che abilitano servizi forniti da terzi (comunemente detti Strumenti di Tracciamento “di terza parte”). Se non diversamente specificato all’interno di questo documento, tali terzi hanno accesso ai rispettivi Strumenti di Tracciamento. Durata e scadenza dei Cookie e degli altri Strumenti di Tracciamento simili possono variare a seconda di quanto impostato dal Titolare o da ciascun fornitore terzo. Alcuni di essi scadono al termine della sessione di navigazione dell’Utente. In aggiunta a quanto specificato nella descrizione di ciascuna delle categorie di seguito riportate, gli Utenti possono ottenere informazioni più dettagliate ed aggiornate sulla durata, così come qualsiasi altra informazione rilevante - quale la presenza di altri Strumenti di Tracciamento - nelle privacy policy dei rispettivi fornitori terzi (tramite i link messi a disposizione) o contattando il Titolare.</p>
            </bxs-layout>
        </section>

        <hr>

        <!-- ------------------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------------ -->
        <section>
            <bxs-layout>
                <div class="block">
                    <h5>Attività strettamente necessarie a garantire il funzionamento di questa Applicazione e la fornitura del Servizio</h5>
                    <p>Questa Applicazione utilizza Cookie comunemente detti “tecnici” o altri Strumenti di Tracciamento analoghi per svolgere attività strettamente necessarie a garantire il funzionamento o la fornitura del Servizio.</p>
                </div>

                <div class="block">
                    <h6>Strumenti di Tracciamento di prima parte</h6>
                    <p>Durata di archiviazione:</p>
                    <a
                    role="button"
                    @click="$emit('click:cookie-settings')">visualizzare i servizi cookie</a>
                </div>

                <div class="block">
                    <h6>Altre attività che prevedono l’utilizzo di Strumenti di Tracciamento</h6>

                    <!-- <div class="block">
                        <h6>Esperienza</h6>
                        <p>Questa Applicazione utilizza Strumenti di Tracciamento per migliorare la qualità della user experience e consentire le interazioni con contenuti, network e piattaforme esterni.</p>

                        <bxs-collapse-item label="Visualizzazione di contenuti da piattaforme esterne">
                            <p>Questo tipo di servizi permette di visualizzare contenuti ospitati su piattaforme esterne direttamente dalle pagine di questa Applicazione e di interagire con essi. Tali servizi sono spesso definiti widget, ovvero piccoli elementi inseriti in un sito web o in un'applicazione. Forniscono informazioni specifiche o svolgono una funzione particolare e spesso consentono l'interazione con l'utente. Questo tipo di servizio potrebbe comunque raccogliere dati sul traffico web relativo alle pagine dove il servizio è installato, anche quando gli utenti non lo utilizzano.</p>
                            <h6>Google Fonts</h6>
                            <p>Google Fonts è un servizio di visualizzazione di stili di carattere gestito da Google LLC oppure da Google Ireland Limited, a seconda di come il Titolare gestisce il trattamento dei Dati, che permette a questa Applicazione di integrare tali contenuti all’interno delle proprie pagine.</p>
                            <p>Dati Personali trattati: Dati di utilizzo e Strumenti di Tracciamento.</p>
                            <p>Luogo del trattamento: Stati Uniti – <a href="https://business.safety.google/privacy/" target="_blank">Privacy Policy</a>; Irlanda – <a href="https://business.safety.google/privacy/" target="_blank">Privacy Policy</a></p>
                        </bxs-collapse-item>
                    </div> -->

                    <div class="block">
                        <h6>Misurazione</h6>
                        <p>Questa Applicazione utilizza Strumenti di Tracciamento per misurare il traffico e analizzare il comportamento degli Utenti per migliorare il Servizio.</p>

                        <bxs-collapse-item label="Servizi di statistica anonimizzata">
                            <div class="pa-ui">
                                <p>I servizi in questa sezione permettono al Titolare di elaborare e gestire statistiche in forma anonima grazie all’uso di Strumenti di Tracciamento di prima parte.</p>
                                <h6>Google Analytics (Universal Analytics) con IP anonimizzato</h6>
                                <p>Google Analytics (Universal Analytics) è un servizio di analisi web fornito da Google LLC oppure da Google Ireland Limited, a seconda di come il Titolare gestisce il trattamento dei Dati, (“Google”). Google utilizza i Dati Personali raccolti allo scopo di tracciare ed esaminare l’utilizzo di questa Applicazione, compilare report e condividerli con gli altri servizi sviluppati da Google. Google potrebbe utilizzare i Dati Personali per contestualizzare e personalizzare gli annunci del proprio network pubblicitario. Questa integrazione di Google Analytics rende anonimo il tuo indirizzo IP. L'anonimizzazione funziona abbreviando entro i confini degli stati membri dell'Unione Europea o in altri Paesi aderenti all'accordo sullo Spazio Economico Europeo l'indirizzo IP degli Utenti. Solo in casi eccezionali, l'indirizzo IP sarà inviato ai server di Google ed abbreviato all'interno degli Stati Uniti.</p>
                                <p>Per una comprensione dell'utilizzo dei dati da parte di Google, si prega di consultare le norme per i partner di Google.</p>
                                <p>Dati Personali trattati: Dati di utilizzo e Strumenti di Tracciamento.</p>
                                <p>Luogo del trattamento: Stati Uniti – <a href="https://business.safety.google/privacy/" target="_blank">Privacy Policy</a> – <a href="https://tools.google.com/dlpage/gaoptout?hl=it" target="_blank">Opt Out</a>; Irlanda – <a href="https://business.safety.google/privacy/" target="_blank">Privacy Policy</a> – <a href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank">Opt Out</a>.</p>
                                <p>Durata di archiviazione:</p>
                                <ul>
                                    <li>AMP_TOKEN: 1 ora</li>
                                    <li>_ga: 2 anni</li>
                                    <li>_gac*: 3 mesi</li>
                                    <li>_gat: 1 minuto</li>
                                    <li>_gid: 1 giorno</li>
                                </ul>
                            </div>
                        </bxs-collapse-item>
                    </div>

                    <div class="block">
                        <h6>Misurazione</h6>
                        <p>Questa Applicazione utilizza Strumenti di Tracciamento per misurare il traffico e analizzare il comportamento degli Utenti per migliorare il Servizio.</p>

                        <bxs-collapse-item label="Statistica">
                            <div class="pa-ui">
                                <p>I servizi contenuti nella presente sezione permettono al Titolare del Trattamento di monitorare e analizzare i dati di traffico e servono a tener traccia del comportamento dell’Utente.</p>
                                <h6>Google Analytics (Universal Analytics)</h6>
                                <p>Google Analytics (Universal Analytics) è un servizio di analisi web fornito da Google LLC oppure da Google Ireland Limited, a seconda di come il Titolare gestisce il trattamento dei Dati, (“Google”). Google utilizza i Dati Personali raccolti allo scopo di tracciare ed esaminare l’utilizzo di questa Applicazione, compilare report e condividerli con gli altri servizi sviluppati da Google. Google potrebbe utilizzare i Dati Personali per contestualizzare e personalizzare gli annunci del proprio network pubblicitario.</p>
                                <p>Per una comprensione dell'utilizzo dei dati da parte di Google, si prega di consultare le norme per i partner di Google.</p>
                                <p>Dati Personali trattati: Dati di utilizzo e Strumenti di Tracciamento.</p>
                                <p>Luogo del trattamento: Stati Uniti – <a href="https://business.safety.google/privacy/" target="_blank">Privacy Policy</a> – <a href="https://tools.google.com/dlpage/gaoptout?hl=it" target="_blank">Opt Out</a>; Irlanda – <a href="https://business.safety.google/privacy/" target="_blank">Privacy Policy</a> – <a href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank">Opt Out</a>.</p>
                                <p>Durata di archiviazione</p>
                                <ul>
                                    <li>AMP_TOKEN: 1 ora</li>
                                    <li>_ga: 2 anni</li>
                                    <li>_gac*: 3 mesi</li>
                                    <li>_gat: 1 minuto</li>
                                    <li>_gid: 1 giorno</li>
                                </ul>
                            </div>
                        </bxs-collapse-item>
                    </div>
                </div>
            </bxs-layout>
        </section>

        <hr>

        <!-- ------------------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------------ -->
        <section>
            <bxs-layout>
                <div class="block">
                    <h5>Come gestire le preferenze</h5>
                </div>

                <div class="block">
                    <p>Esistono vari modi per gestire le preferenze relative agli Strumenti di Tracciamento:</p>
                    <p>Gli Utenti possono gestire le preferenze relative agli Strumenti di Tracciamento direttamente tramite le impostazioni dei propri dispositivi - per esempio, possono impedire l’uso o l’archiviazione di Strumenti di Tracciamento.</p>
                    <p>In aggiunta, l’Utente può impostare le proprie preferenze all’interno dell’informativa sui cookie o aggiornando tali preferenze tramite il widget privacy per le preferenze, se presente.</p>
                    <p>Grazie ad apposite funzioni del browser o del dispositivo è anche possibile rimuovere Strumenti di Tracciamento precedentemente salvati, inclusi quelli utilizzati per il salvataggio delle preferenze relative al consenso inizialmente espresse dall'Utente.</p>
                    <p>Altri Strumenti di Tracciamento presenti nella memoria locale del browser possono essere rimossi cancellando la cronologia di navigazione.</p>
                    <p>Per quanto riguarda Strumenti di Tracciamento di terza parte, gli Utenti possono gestire le proprie preferenze visitando il relativo link di opt out (qualora disponibile), utilizzando gli strumenti descritti nella privacy policy della terza parte o contattando quest'ultima direttamente.</p>
                </div>

                <div class="block">
                    <h6>Individuare le impostazioni relative agli Strumenti di Tracciamento</h6>
                    <p>Gli Utenti possono, per esempio, trovare informazioni su come gestire i Cookie in alcuni dei browser più diffusi ai seguenti indirizzi:</p>
                    <ul>
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=it&p=cpn_cookies" target="_blank">Google Chrome</a></li>
                        <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank">Mozilla Firefox</a></li>
                        <li><a href="https://support.apple.com/it-it/guide/safari/manage-cookies-and-website-data-sfri11471/" target="_blank">Apple Safari</a></li>
                        <li><a href="http://windows.microsoft.com/it-it/windows-vista/block-or-allow-cookies" target="_blank">Microsoft Internet Explorer</a></li>
                        <li><a href="https://support.microsoft.com/it-it/help/4027947" target="_blank">Microsoft Edge</a></li>
                        <li><a href="https://support.brave.com/hc/articles/360022806212-How-do-I-use-Shields-while-browsing" target="_blank">Brave</a></li>
                        <li><a href="https://help.opera.com/latest/web-preferences/#cookies" target="_blank">Opera</a></li>
                    </ul>
                    <p>Gli Utenti possono inoltre gestire alcuni Strumenti di Tracciamento per applicazioni mobili disattivandoli tramite le apposite impostazioni del dispositivo, quali le impostazioni di pubblicità per dispositivi mobili o le impostazioni relative al tracciamento in generale (gli Utenti possono consultare le impostazioni del dispositivo per individuare quella pertinente).</p>
                </div>

                <div class="block">
                    <h6>Conseguenze legate al rifiuto dell'utilizzo di Strumenti di Tracciamento</h6>
                    <p>Gli Utenti sono liberi di decidere se permettere o meno l'utilizzo di Strumenti di Tracciamento. Tuttavia, si noti che gli Strumenti di Tracciamento consentono a questa Applicazione di fornire agli Utenti un'esperienza migliore e funzionalità avanzate (in linea con le finalità delineate nel presente documento). Pertanto, qualora l'Utente decida di bloccare l'utilizzo di Strumenti di Tracciamento, il Titolare potrebbe non essere in grado di fornire le relative funzionalità.</p>
                </div>
            </bxs-layout>
        </section>

        <hr>

        <!-- ------------------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------------ -->
        <section>
            <bxs-layout>
                <div class="block">
                    <h5>Titolare del Trattamento dei Dati</h5>
                </div>

                <div class="block">
                    <p class="mb-1">AmaBeef © DNA S.R.L.</p>
                    <p class="mb-1">Via Alessandro Manzoni, 34</p>
                    <p class="mb-1">22071 Cadorago (CO)</p>
                    <p class="mb-1">P.IVA 04196700134</p>
                    <p><b>Indirizzo email del Titolare:</b> <a href="mailto:amabeefrestaurant@gmail.com">amabeefrestaurant@gmail.com</a></p>
                </div>

                <div class="block">
                    <p>Dal momento che l’uso di Strumenti di Tracciamento di terza parte su questa Applicazione non può essere completamente controllato dal Titolare, ogni riferimento specifico a Strumenti di Tracciamento di terza parte è da considerarsi indicativo. Per ottenere informazioni complete, gli Utenti sono gentilmente invitati a consultare la privacy policy dei rispettivi servizi terzi elencati in questo documento.</p>
                    <p>Data l'oggettiva complessità di identificazione delle tecnologie di tracciamento, gli Utenti sono invitati a contattare il Titolare qualora volessero ricevere ulteriori informazioni in merito all'utilizzo di tali tecnologie su questa Applicazione.</p>
                </div>
            </bxs-layout>
        </section>

        <hr>

        <!-- ------------------------------------------------------------------------------------------------------------------------------
        ------------------------------------------------------------------------------------------------------------------------------ -->
        <section>
            <bxs-layout>
                <bxs-collapse-item label="Definizioni e riferimenti legali">
                    <div class="pa-ui">
                        <div class="block">
                            <h6>Dati Personali (o Dati)</h6>
                            <p>Costituisce dato personale qualunque informazione che, direttamente o indirettamente, anche in collegamento con qualsiasi altra informazione, ivi compreso un numero di identificazione personale, renda identificata o identificabile una persona fisica.</p>
                        </div>

                        <div class="block">
                            <h6>Dati di Utilizzo</h6>
                            <p>Sono le informazioni raccolte automaticamente attraverso questa Applicazione (anche da applicazioni di parti terze integrate in questa Applicazione), tra cui: gli indirizzi IP o i nomi a dominio dei computer utilizzati dall’Utente che si connette con questa Applicazione, gli indirizzi in notazione URI (Uniform Resource Identifier), l’orario della richiesta, il metodo utilizzato nell’inoltrare la richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta dal server (buon fine, errore, ecc.) il paese di provenienza, le caratteristiche del browser e del sistema operativo utilizzati dal visitatore, le varie connotazioni temporali della visita (ad esempio il tempo di permanenza su ciascuna pagina) e i dettagli relativi all’itinerario seguito all’interno dell’Applicazione, con particolare riferimento alla sequenza delle pagine consultate, ai parametri relativi al sistema operativo e all’ambiente informatico dell’Utente.</p>
                        </div>

                        <div class="block">
                            <h6>Utente</h6>
                            <p>L'individuo che utilizza questa Applicazione che, salvo ove diversamente specificato, coincide con l'Interessato.</p>
                        </div>

                        <div class="block">
                            <h6>Interessato</h6>
                            <p>La persona fisica cui si riferiscono i Dati Personali.</p>
                        </div>

                        <div class="block">
                            <h6>Responsabile del Trattamento (o Responsabile)</h6>
                            <p>La persona fisica, giuridica, la pubblica amministrazione e qualsiasi altro ente che tratta dati personali per conto del Titolare, secondo quanto esposto nella presente privacy policy.</p>
                        </div>

                        <div class="block">
                            <h6>Titolare del Trattamento (o Titolare)</h6>
                            <p>La persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali e gli strumenti adottati, ivi comprese le misure di sicurezza relative al funzionamento ed alla fruizione di questa Applicazione. Il Titolare del Trattamento, salvo quanto diversamente specificato, è il titolare di questa Applicazione.</p>
                        </div>

                        <div class="block">
                            <h6>Questa Applicazione</h6>
                            <p>Lo strumento hardware o software mediante il quale sono raccolti e trattati i Dati Personali degli Utenti.</p>
                        </div>

                        <div class="block">
                            <h6>Servizio</h6>
                            <p>Il Servizio fornito da questa Applicazione così come definito nei relativi termini (se presenti) su questo sito/applicazione.</p>
                        </div>

                        <div class="block">
                            <h6>Unione Europea (o UE)</h6>
                            <p>Salvo ove diversamente specificato, ogni riferimento all’Unione Europea contenuto in questo documento si intende esteso a tutti gli attuali stati membri dell’Unione Europea e dello Spazio Economico Europeo.</p>
                        </div>

                        <div class="block">
                            <h6>Cookie</h6>
                            <p>I Cookie sono Strumenti di Tracciamento che consistono in piccole porzioni di dati conservate all'interno del browser dell'Utente.</p>
                        </div>

                        <div class="block">
                            <h6>Strumento di Tracciamento</h6>
                            <p>Per Strumento di Tracciamento s’intende qualsiasi tecnologia - es. Cookie, identificativi univoci, web beacons, script integrati, e-tag e fingerprinting - che consenta di tracciare gli Utenti, per esempio raccogliendo o salvando informazioni sul dispositivo dell’Utente.</p>
                        </div>

                        <div class="block">
                            <h6>Riferimenti legali</h6>
                            <p>La presente informativa privacy è redatta sulla base di molteplici ordinamenti legislativi.</p>
                            <p>Ove non diversamente specificato, questa informativa privacy riguarda esclusivamente questa Applicazione.</p>
                        </div>
                    </div>
                </bxs-collapse-item>
            </bxs-layout>
        </section>
    </div>
</template>

<script>
export default {
    name: 'cookie_policy'
}
</script>
import { gsap } from 'gsap'
import animations from '@/assets/libs/animations'

export default {
    mounted(el, bind) {
        const vue = bind.instance

        vue.$nextTick(() => {
            const is_anim_from_set = typeof bind.value === 'string' && bind.value !== 'trigger'
            const is_custom_anim = typeof bind.value === 'object'
            const has_scroll_trigger = Object.keys(bind.modifiers)[0] === 'trigger'

            const def_anim = {
                autoAlpha: 0,
                y: 40,
                duration: 1,
                ease: 'expo.out'
            }

            const trigger = {
                scrollTrigger: {
                    trigger: el,
                    // If true, the ScrollTrigger will kill() itself as soon as the end position is reached once. This causes it to stop listening for scroll events and it becomes eligible for garbage collection. This will only call onEnter a maximum of one time as well. It does not kill the associated animation. It's perfect for times when you only want an animation to play once when scrolling forward and never get reset or replayed. It also sets the toggleActions to "play none none none".
                    once: !has_scroll_trigger,
                    start: 'top center', // dx global
                    end: 'bottom center',
                    /*
                        L'impostazione pin: truefarà sì che venga bloccato l' triggerelemento
                        Attenzione: non animare l'elemento aggiunto stesso perché ciò annullerebbe le misurazioni (ScrollTrigger è altamente ottimizzato per le prestazioni e precalcola il più possibile). Invece, potresti annidare le cose in modo tale da animare solo gli elementi ALL'INTERNO dell'elemento bloccato.
                        Nota: se stai bloccando qualcosa che è nidificato all'interno di un altro elemento anch'esso bloccato , assicurati di definire a pinnedContainerin modo che ScrollTrigger sappia spostare le posizioni di inizio/fine di conseguenza.
                    */
                    pin: false,
                    /*
                        Booleano - Se , l'elemento bloccato verrà riassegnato mentre è attivamente bloccato in modo che possa sfuggire a qualsiasi blocco contenente antenato. Se noti un comportamento strano durante il blocco (come l'elemento bloccato che si sposta improvvisamente e poi si sposta con lo scorrimento), probabilmente hai un elemento antenato o su un elemento antenato che interrompe il comportamento (è una cosa del browser, non ScrollTrigger). È meglio impostare il tuo progetto per evitarli perché la riqualificazione può essere costosa, ma può salvarti se non puoi evitarli. Utilizza questa funzione solo se necessario.true<body>transformwill-change position: fixedpinReparent: true
                        Avvertenza: se disponi di regole CSS che si basano su nidificazioni specifiche che sarebbero influenzate dal reparenting, queste non funzioneranno. Ad esempio, una regola CSS come .section .panel p {color: white}non si applicherebbe più al nidificato <p>se si blocca l' .panelelemento pinReparent: trueperché durante il pin non sarebbe più all'interno di <section>, quindi assicurati di scrivere le regole CSS per soddisfare il reparenting.
                    */
                    // pinReparent: true,
                    scrub: has_scroll_trigger,
                    markers: false,
                    // onEnter, onLeave, onEnterBack, onLeaveBack
                    // play pause resume reset none complete
                    toggleActions: 'play none none none'
                },
                ease: has_scroll_trigger ? 'none' : null
            }

            if (is_anim_from_set && animations.has(bind.value)) {
                animations.get(bind.value)(el, trigger)
            } else {
                gsap.from(
                    el,
                    is_custom_anim ? { ...bind.value, ...trigger } : { ...def_anim, ...trigger }
                )
            }
        })
    },
    unmounted(el) {
    }
}
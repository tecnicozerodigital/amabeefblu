import { gsap } from 'gsap'

const transitions = new Map()

// ------------------------------------------------------------------------------------------------------
const fallback = (el, direction, next) => {
    const isIn = direction === 'in'

    const tl = gsap.timeline({
        onComplete: next
    })

    tl
        .addLabel('start')
        .fromTo(el, {
            autoAlpha: isIn ? 0 : 1,
            y: isIn ? 40 : 0
        }, {
            autoAlpha: isIn ? 1 : 0,
            y: isIn ? 0 : 40,
            duration: 2,
            ease: 'expo.out'
        })
}

// ------------------------------------------------------------------------------------------------------
const page = (el, direction, next) => {
    const isIn = direction === 'in'

    const tl = gsap.timeline({
        onComplete: next
    })

    tl
        .addLabel('start')
        .fromTo(el, {
            autoAlpha: isIn ? 0 : 1
            // y: isIn ? 40 : 0
        }, {
            autoAlpha: isIn ? 1 : 0,
            // y: isIn ? 0 : 40,
            duration: 1,
            ease: 'expo.out'
        })
}

// ------------------------------------------------------------------------------------------------------

const layer = (el, direction, next) => {
    const isIn = direction === 'in'
    const header = document.querySelector('.bxs-navbar')

    const tl = gsap.timeline({
        onComplete: next
    })

    tl
        .addLabel('start')
        .to(header, {
            autoAlpha: 0,
            daratio: 0.5,
            ease: 'expo.out'
        })
        .fromTo(el, {
            clipPath: isIn ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 0%)',
            webkitClipPath: isIn ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 0%)',
            // scale: isIn ? 1.5 : 1
        }, {
            clipPath: isIn ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
            webkitClipPath: isIn ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)',
            // scale: isIn ? 1 : 1.5,
            duration: 1.25,
            ease: 'expo.inOut'
        })
        .to(header, {
            autoAlpha: 1,
            duration: 0.25,
            ease: 'expo.out'
        }, 'start+=1.25')
}

// ------------------------------------------------------------------------------------------------------

[{
    key: 'fallback',
    timeline: fallback
}, {
    key: 'page',
    timeline: page
}, {
    key: 'layer',
    timeline: layer
}].forEach((item) => {
    transitions.set(
        item.key,
        (ctx, direction) => new Promise(resolve => item.timeline(ctx, direction, resolve))
    )
})

export default transitions
import { gsap } from 'gsap'
// gsap.config({
//     pres
// })
import SplitText from 'gsap/SplitText'

const animations = new Map()

// anim on scroll reveal ------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------

animations.set('fade-set', (el, val) => {
    const anim = gsap.set(el, {
        autoAlpha: 0,
        y: 40
    })

    return anim
})

animations.set('fade-in', (el, val = {}) => {
    const anim = gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: 'expo.out',
        ...val
    })

    return anim
})

// ------------------------------------------------------------------------------------------------------

animations.set('text-set', (el, val = {}) => {
    const split = SplitText.create(el, {
        type: 'words, lines', // only split into words and lines (not characters)
        mask: 'lines', // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
        linesClass: 'line',
        wordsClass: 'word'
    })

    const anim = gsap.set(split.lines, {
        autoAlpha: 0,
        yPercent: 100,
        rotateY: 10,
        ...val
    })

    return anim
})

animations.set('text-in', (el, val = {}) => {
    const lines = Array.from(el.querySelectorAll('.line'))

    const anim = gsap.to(lines, {
        autoAlpha: 1,
        yPercent: 0,
        rotateX: 0,
        stagger: 0.1,
        duration: 1.5,
        delay: 0.5,
        ease: 'expo.out',
        ...val
    })

    return anim
})

// ------------------------------------------------------------------------------------------------------

animations.set('clip-set', (el, val) => {
    const anim = gsap.set(el, {
        clipPath: 'inset(0% 100% 0% 0%)',
        webkitClipPath: 'inset(0% 100% 0% 0%)',
        ...val
    })
    return anim
})

animations.set('clip-in', (el, val = {}) => {
    const anim = gsap.to(el, {
        clipPath: 'inset(0% 0% 0% 0%)',
        webkitClipPath: 'inset(0% 0% 0% 0%)',
        ease: 'expo.inOut',
        duration: 1.5,
        ...val
    })

    return anim
})

// anim on scroll ------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------

animations.set('scale', (el, val = {}) => {
    const anim = gsap.to(el, {
        scale: 1.75,
        ease: 'none',
        ...val
    })

    return anim
})

// ------------------------------------------------------------------------------------------------------

animations.set('parallax', (el, val = {}) => {
    const y = el.dataset.scrollAnimY || -25
    const anim = gsap.to(el, {
        yPercent: y,
        ease: 'none',
        ...val
    })

    return anim
})

// ------------------------------------------------------------------------------------------------------

animations.set('parallax-hero', (el, val = {}) => {
    const y = el.dataset.scrollAnimY || -25
    const anim = gsap.to(el, {
        yPercent: y,
        ease: 'none',
        ...val
    })

    return anim
})

// ------------------------------------------------------------------------------------------------------

export default animations
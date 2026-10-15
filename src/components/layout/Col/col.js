import {
    computed,
    h,
    defineComponent
} from 'vue'

const upperFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const breakpoints = ['ms', 'mm', 'ml', 'ds', 'dm', 'dl']

const breakpointProps = (() => {
    return breakpoints.reduce((props, val) => {
        props[val] = {
            type: [Boolean, String, Number],
            default: false
        }
        return props
    }, {})
})()

const offsetProps = (() => {
    return breakpoints.reduce((props, val) => {
        props['offset' + upperFirst(val)] = {
            type: [String, Number],
            default: null
        }
        return props
    }, {})
})()

const orderProps = (() => {
    return breakpoints.reduce((props, val) => {
        props['order' + upperFirst(val)] = {
            type: [String, Number],
            default: null
        }
        return props
    }, {})
})()

// console.log(orderProps)

const propMap = {
    col: Object.keys(breakpointProps),
    offset: Object.keys(offsetProps),
    order: Object.keys(orderProps)
}

function breakpointClass(type, prop, val) {
    let className = type

    if (val == null || val === false) return undefined

    if (prop) {
        const breakpoint = prop.replace(type, '')
        className += `-${breakpoint}`
    }

    if (type === 'col' && (val === '' || val === true)) return className.toLowerCase()

    // .order-md-6
    className += `-${val}`
    return className.toLowerCase()
}

// const cache = new Map()

export const col = defineComponent({
    name: 'col-comp',
    props: {
        cols: {
            type: [Boolean, String, Number],
            default: false
        },
        ...breakpointProps,
        offset: {
            type: [String, Number],
            default: null
        },
        ...offsetProps,
        order: {
            type: [String, Number],
            default: null
        },
        ...orderProps,
        'align-self': {
            type: String,
            default: null,
            validator: (str) => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    setup(props, { slots }) {
        // // Super-fast memoization based on props, 5x faster than JSON.stringify
        // let cacheKey = ''
        // for (const prop in props) cacheKey += String((props)[prop])
        // let classList = cache.get(cacheKey)

        // if (!classList) {
        //     classList = []
        //     let type

        //     for (type in propMap) {
        //         propMap[type].forEach(prop => {
        //             const value = props[prop]
        //             const className = breakpointClass(type, prop, value)
        //             if (className) classList.push(className.startsWith('col') ? 'bxs-' + className : 'bxs-col-' + className)
        //         })
        //     }

        //     const hasColClasses = classList.some(className => className.startsWith('bxs-col-'))

        //     classList.push({
        //         'bxs-col': !hasColClasses || !props.cols,
        //         [`bxs-col-${props.cols}`]: props.cols,
        //         [`bxs-col-offset-${props.offset}`]: props.offset,
        //         [`bxs-col-order-${props.order}`]: props.order,
        //         [`align-self-${props.alignSelf}`]: props.alignSelf
        //     })

        //     cache.set(cacheKey, classList)
        // }

        // return h(props.tag, mergeData(data, { class: classList }), children)

        const classes = computed(() => {
            const classList = []
            let type

            for (type in propMap) {
                propMap[type].forEach(prop => {
                    const value = props[prop]
                    const className = breakpointClass(type, prop, value)
                    if (className) classList.push(className.startsWith('col') ? 'bxs-' + className : 'bxs-col-' + className)
                })
            }

            const hasColClasses = classList.some(className => className.startsWith('bxs-col-'))

            classList.push({
                'bxs-col': !hasColClasses || !props.cols,
                [`bxs-col-${props.cols}`]: props.cols,
                [`bxs-col-offset-${props.offset}`]: props.offset,
                [`bxs-col-order-${props.order}`]: props.order,
                [`align-self-${props.alignSelf}`]: props.alignSelf
            })

            return classList
        })

        return () => h(props.tag, {
            class: classes.value
        }, slots.default?.())
    }
})

export default col

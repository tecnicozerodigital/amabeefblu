import {
    computed,
    h,
    defineComponent
} from 'vue'

const upperFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const breakpoints = ['xs', 's', 'm', 'l', 'xl', 'xxl']

const ALIGNMENT = ['start', 'end', 'center']

function makeProps(prefix, def) {
    return breakpoints.reduce((props, val) => {
        props[prefix + upperFirst(val)] = def()
        return props
    }, {})
}

const alignValidator = (str) => [...ALIGNMENT, 'baseline', 'stretch'].includes(str)
const alignProps = makeProps('align', () => ({
    type: String,
    default: null,
    validator: alignValidator
}))

const justifyValidator = (str) => [...ALIGNMENT, 'between', 'around'].includes(str)
const justifyProps = makeProps('justify', () => ({
    type: String,
    default: null,
    validator: justifyValidator
}))

const alignContentValidator = (str) => [...ALIGNMENT, 'between', 'around', 'stretch'].includes(str)
const alignContentProps = makeProps('alignContent', () => ({
    type: String,
    default: null,
    validator: alignContentValidator
}))

const propMap = {
    align: Object.keys(alignProps),
    justify: Object.keys(justifyProps),
    alignContent: Object.keys(alignContentProps)
}

const classMap = {
    align: 'align',
    justify: 'justify',
    alignContent: 'align-content'
}

function breakpointClass(type, prop, val) {
    let className = classMap[type]

    if (val == null) return undefined

    if (prop) {
        // alignSm -> Sm
        const breakpoint = prop.replace(type, '')
        className += `-${breakpoint}`
    }

    // .align-items-sm-center
    className += `-${val}`
    return className.toLowerCase()
}

// const cache = new Map()

export const row = defineComponent({
    name: 'bxs-row',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        dense: Boolean,
        'no-gutters': {
            type: Boolean,
            required: false,
            default: false
        },
        align: {
            type: String,
            default: null,
            validator: alignValidator
        },
        ...alignProps,
        justify: {
            type: String,
            default: null,
            validator: justifyValidator
        },
        ...justifyProps,
        alignContent: {
            type: String,
            default: null,
            validator: alignContentValidator
        },
        ...alignContentProps
    },
    setup(props, { slots }) {
        // // Super-fast memoization based on props, 5x faster than JSON.stringify
        // let cacheKey = ''
        // for (const prop in props) {
        //     cacheKey += String(props[prop])
        // }
        // let classList = cache.get(cacheKey)

        // if (!classList) {
        //     classList = []
        //     // Loop through `align`, `justify`, `alignContent` breakpoint props
        //     let type
        //     for (type in propMap) {
        //         propMap[type].forEach(prop => {
        //             const value = props[prop]
        //             const className = breakpointClass(type, prop, value)
        //             if (className) classList.push(className)
        //         })
        //     }

        //     classList.push({
        //         'mk-row-no-gutters': props.noGutters,
        //         'row--dense': props.dense,
        //         [`align-${props.align}`]: props.align,
        //         [`justify-${props.justify}`]: props.justify,
        //         [`align-content-${props.alignContent}`]: props.alignContent
        //     })

        //     cache.set(cacheKey, classList)
        // }

        // return h(
        //     props.tag,
        //     mergeData(data, {
        //         staticClass: 'mk-row',
        //         class: classList
        //     }),
        //     children
        // )

        const classes = computed(() => {
            const classList = []
            let type

            for (type in propMap) {
                propMap[type].forEach(prop => {
                    const value = props[prop]
                    const className = breakpointClass(type, prop, value)
                    if (className) classList.push(className)
                })
            }

            classList.push({
                'bxs-row-no-gutters': props.noGutters,
                'bxs-row-dense': props.dense,
                [`align-${props.align}`]: props.align,
                [`justify-${props.justify}`]: props.justify,
                [`align-content-${props.alignContent}`]: props.alignContent
            })

            return classList
        })

        return () => h(props.tag, {
            class: ['bxs-row', classes.value]
        }, slots.default?.())
    }
})

export default row

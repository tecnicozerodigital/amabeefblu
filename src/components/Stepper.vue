<template>
    <div class="bxs-stepper">
        <div class="bxs-stepper--header">
            <bxs-chip-group
            class="mb-ui"
            style="padding-right: 50%; padding-left: 50%; overflow-y: hidden;">
                <bxs-chip
                v-for="(step, i) in items"
                :key="i"
                ref="nav_scroller_items"
                :color="local_index === i ? 'white' : null"
                :dark="local_index === i"
                min-width="120"
                class="bxs-pointer mr-6"
                @click="to(i)">{{ step.text || 'Step' }}</bxs-chip>
            </bxs-chip-group>
        </div>

        <div class="bxs-stepper--body">
            <ul ref="steps_scroller">
                <li
                v-for="step in items"
                :key="step.value"
                ref="steps_scroller_items">
                    <slot
                    :name="'item.' + step.value"
                    :items="local_items"
                    :item="local_items[local_index]"
                    :header="step"
                    :index="local_index"
                    :to="to" />
                </li>
            </ul>
        </div>

        <div class="bxs-stepper--footer">
            <div
            v-if="errors.length > 0 && showErrorsConditions"
            class="mb-ui bxs-alert bxs-pin-left">
                <div>
                    <bxs-icon
                    name="exclamation-triangle-fill"
                    width="1rem"
                    height="1rem"></bxs-icon>
                </div>

                <div class="flex-1 px-ui">
                    <p v-for="(e, i) in errors" :key="i">{{ e }}</p>
                </div>

                <div>
                    <bxs-icon
                    name="close"
                    width="1rem"
                    height="1rem"
                    @click="errors = []"></bxs-icon>
                </div>
            </div>

            <slot
            name="actions"
            :is_last_step="is_last_step"
            :is_first_step="is_first_step"
            :to="to"
            :index="local_index"
            :next="next"
            :prev="prev"
            :errors="errors" />
        </div>
    </div>
</template>

<script>
// import { gsap } from 'gsap'

export default {
    name: 'bxs_stepper',
    props: {
        modelValue: {
            type: Number,
            required: false,
            default: 0
        },
        items: {
            type: Array,
            required: false,
            default: () => []
        },
        conditions: {
            type: Object,
            required: false,
            default: null
        },
        'show-errors-conditions': {
            type: Boolean,
            required: false,
            default: false
        },
        debug: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    emits: [
        'update:modelValue',
        'change:before',
        'change:after'
    ],
    data () {
        return {
            local_items: this.items,
            local_index: this.modelValue,
            steps_scroller_total_w: 0,
            step_w: 0,
            errors: []
        }
    },
    computed: {
        steps_count () {
            return this.local_items.length
        },
        step () {
            return this.local_items[this.local_index]
        },
        is_first_step () {
            return !this.local_index
        },
        is_last_step () {
            return this.local_index >= this.local_items.length - 1
        }
    },
    watch: {
        // local_index (newVal, oldVal) {
        //     if (this.debug) console.log('stepper watch local_index', oldVal, newVal)
        // },
        modelValue (newVal, oldVal) {
            if (this.debug) console.log('stepper watch modelValue', oldVal, newVal)
            this.local_index = newVal
            this.resize()
        }
    },
    mounted () {
        this.$nextTick(this.play)
    },
    methods: {
        play () {
            this.steps_scroller_el = this.$el.querySelector('.bxs-stepper--body > ul')
            this.resize()
        },
        resize () {
            this.step_w = this.steps_scroller_el.querySelector('li').clientWidth
            this.steps_scroller_total_w = this.step_w * this.steps_count
            this.move()
        },
        validate () {
            if (this.debug) console.log('stepper validate', this.conditions)
            const errors = []

            if (this.conditions && Object.keys(this.conditions).length > 0) {
                for (const k in this.conditions) {
                    if (k === this.step.value) {
                        const conds = this.conditions[k]
                        conds.forEach((cond) => {
                            // (cond.test && typeof cond.test === 'function' && !cond.test())
                            if (cond && typeof cond === 'function' && !cond()) {
                                errors.push(cond.message ? cond.message : (errors.length + 1))
                            }
                        })
                    }
                }
            }

            if (this.debug) console.log(errors)

            return { messages: errors, is_valid: !errors.length }
        },
        move () {
            this.steps_scroller_el.scrollLeft = this.step_w * this.local_index

            if (this.$refs.nav_scroller_items[this.local_index]) {
                this.$refs.nav_scroller_items[this.local_index].$el.scrollIntoView({
                    block: 'center', // Defines vertical alignment
                    inline: 'center', // Defines horizontal alignment
                    behavior: 'smooth'
                })
            }
        },
        to (i) {
            if (this.debug) console.log('stepper to', this.local_index, i)

            if (
                i === this.local_index ||
                (this.is_first_step && i < 0) ||
                (this.is_last_step && i > this.steps_count - 1)
            ) return

            this.$emit('change:before')

            const { messages, is_valid } = this.validate()
            if (i > this.local_index && !is_valid) {
                this.errors = messages
                return
            }

            this.local_index = i
            this.move()
            this._updateValue()
            this.$emit('change:after')
        },
        next () {
            if (this.debug) console.log('stepper next', this.local_index)
            this.to(this.local_index + 1)
        },
        prev () {
            if (this.debug) console.log('stepper prev', this.local_index)
            this.to(this.local_index - 1)
        },
        _updateValue () {
            if (this.debug) console.log('stepper _updateValue', this.local_index)
            this.$emit('update:modelValue', this.local_index)
        }
    }
}
</script>

<style lang="scss" scoped>
.bxs-stepper {
    position: relative;
    display: block;
    width: 100%;
    // background-color: var(--color-secondary);
    border-radius: var(--radius);

    &--body {
        position: relative;

        > ul {
            position: relative;
            flex: 1;
            display: flex;
            flex-flow: row nowrap;
            white-space: nowrap;
            overflow: hidden;
            scroll-behavior: smooth;

            > li {
                position: relative;
                flex: 0 0 100%;
                width: 100%;
                height: 100%;
                display: inline-block;
                white-space: normal;
                padding-left: var(--size-layout);
                padding-right: var(--size-layout);
                transition: transform 0.75s ease-in-out;
            }
        }
    }
}
</style>
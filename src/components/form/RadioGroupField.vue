<template>
    <div class="tsm-radio-group">
        <bxs-radio-field
        v-for="item in local_items"
        :key="item.id"
        v-model="item.model"
        :id="item.id"
        :name="item.id || item.name"
        :disabled="item.disabled"
        :label="item.label"
        :value="item.value">{{ item.label }}</bxs-radio-field>
    </div>
</template>

<script>
export default {
    name: 'tsm_radio_group',
    props: {
        modelValue: {
            type: Array,
            required: false,
            default: () => []
        },
        items: {
            type: Array,
            required: false,
            default: () => []
        }
    },
    emits: [
        'update:modelValue'
    ],
    data () {
        return {
            local_value: this.modelValue || [],
            local_items: this.items
        }
    },
    mounted () {
        this.$nextTick(this.start)
    },
    watch: {
        modelValue (newVal) {
            this.local_value = newVal
        },
        items () {
            this.start()
        },
        local_items: {
            deep: true,
            handler () {
                this._updateModel()
            }
        }
    },
    methods: {
        start () {
            this.local_items = this.items.map((item) => {
                return {
                    ...item,
                    model: this.local_value.includes(item.value) ? item.value : null
                }
            })
        },
        _updateModel () {
            const v = []

            this.local_items.forEach((item) => {
                if (item.model) {
                    v.push(item.value)
                }
            })

            this.local_value = v

            this.$emit('update:modelValue', v)
        }
    }
}
</script>
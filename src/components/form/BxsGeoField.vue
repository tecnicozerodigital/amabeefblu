<template>
    <div class="bxs-geo-field">
        <bxs-menu
        v-model="on"
        title="Seleziona la tua città">
            <template #activator="{ on }">
                <bxs-text-field
                :value="local_value.label"
                :label="label"
                :required="required"
                :placeholder="placeholder"
                readonly
                v-on="on" />
            </template>

            <div class="px-layout py-ui">
                <bxs-field
                v-model="keywords"
                placeholder="Cerca la tua città"
                append-icon="search"
                clearable
                outlined
                hide-details
                autofocus>
                    <template #default="{ modelValue, ...attrs }">
                        <bxs-text-field
                        v-bind="attrs"
                        :value="modelValue" />
                    </template>
                </bxs-field>
            </div>

            <bxs-list>
                <bxs-list-item
                v-for="item in items"
                :key="item.id"
                link
                divider
                :prepend-icon="local_value.id === item.id ? 'check-cirlce-fill' : null"
                @click="select(item)">{{ item.label }}</bxs-list-item>
            </bxs-list>
        </bxs-menu>
    </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
    name: 'bxs_geo_field',
    props: {
        modelValue: { type: [String, Object] },
        value: [String, Object],
        label: String,
        required: Boolean,
        placeholder: String
    },
    emits: [
        'update:modelValue',
        'update:model-value'
    ],
    data () {
        return {
            local_value: {
                label: null,
                id: null
            },
            on: false,
            keywords: null,
            items: []
        }
    },
    watch: {
        keywords () {
            this.getData()
        },
        value () {
            this.start()
        }
    },
    mounted () {
        this.$nextTick(this.start)
    },
    methods: {
        start () {
            if (this.value) {
                if (typeof this.value === 'string') {
                    this.$api.geo.doc(this.value.id ? this.value.id : this.value, {
                        select: ['label']
                    }).then((doc) => {
                        this.local_value = doc
                        this.items = [doc]
                    })
                } else {
                    this.local_value = this.value
                    this.items = [this.value]
                    this.$emit('update:modelValue', this.local_value.id)
                }
            }
        },
        receiveEventFromParent (message) {
            console.log('child receiveFromParent', message)

            if (message === 'reset') {
                this.deselect()
            }
        },
        getData: debounce(async function () {
            try {
                this.items = await this.$api.geo.list({
                    keywords: this.keywords
                });
            } catch (error) {
                console.error("Errore nel recupero dei dati: ", error)
            }
        }, 500),
        select (item) {
            if (this.local_value.id === item.id) {
                this.local_value = {
                    label: null,
                    id: null
                }

                return this.$emit('update:modelValue', null)
            }

            this.local_value = item
            this.on = false
            this.$emit('update:modelValue', item.id)
        },
        deselect () {
            this.local_value = {
                label: null,
                id: null
            }
            this.$emit('update:modelValue', null)
        }
    }
}
</script>
<template>
    <div :class="['bxs-file-uploader-field', {
        'bxs-file-uploader-field-inline': inline
    }]">
        <slot
        name="activator"
        :on="{
            click: click
        }"
        :value="files" />

        <div v-if="!$slots.activator">
            <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                toolbar
            ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->
            <div
            v-if="label || !solo"
            class="mb-1">
                <p class="bxs-input-label mb-0 mr-4">{{ label }}</p>
            </div>

            <!-- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                files
            ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ -->
            <div class="bxs-file-uploader-field--uploader-zone">
                <div
                v-if="!preloaded"
                class="text-center">
                    <bxs-loader></bxs-loader>
                </div>

                <div
                v-else
                class="flex wrap"
                :style="{ minHeight: itemMaxWidth + 'px' }"
                @click.self="click()">
                    <ul
                    v-if="files.length > 0"
                    :disabled="files.length <= 1"
                    ghost-class="row-ghost"
                    group="files"
                    item-key="id"
                    :animation="500"
                    tag="ul"
                    class="flex-1 d-inline-flex flex-wrap align-center ma-0 pa-0"
                    style="display: inline-flex;"
                    @change="_updateValue">
                        <li
                        v-for="element in files"
                        :key="element.id"
                        :class="['ma-1', {
                            dragging: !element.__uploading && files.length > 1
                        }]">
                            <bxs-card
                            :width="itemMaxWidth"
                            :height="itemMaxWidth"
                            no-padding
                            class="overflow-hidden ma-1"
                            style="position: relative;">
                                <bxs-loader v-if="element.__uploading"></bxs-loader>

                                <bxs-figure
                                v-else
                                :src="element.url"
                                :ratio="itemRatio" />

                                <!-- <bxs-btn
                                v-if="!element.__uploading"
                                class="uploader--item--btn-remove ma-0 pa-0"
                                @click="remove(element)">
                                    <bxs-icon name="close"></bxs-icon>
                                </bxs-btn> -->

                                <!-- <v-icon
                                v-if="multiple && files.length > 1 && !solo"
                                class="uploader--item--drag-icon">drag_indicator</v-icon> -->
                            </bxs-card>
                        </li>
                    </ul>

                    <bxs-card
                    v-if="!solo && multiple"
                    :width="itemMaxWidth"
                    :height="itemMaxWidth"
                    class="flex nowrap align-center justify-center tertiary ma-1"
                    @click="click()">
                        <bxs-icon
                        width="21px"
                        heigth="21px"
                        name="plus" />
                    </bxs-card>
                </div>
            </div>
        </div>

        <input
        ref="fileInput"
        class="hidden"
        type="file"
        :name="name"
        :id="'file-input-' + name"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="_handleFileInput" />
    </div>
</template>

<script>
import dotObj from 'dot-object'
import { getGcd } from '@/assets/libs/utils'
import {
  getMimeTypeFromBase64DataURI,
  getBase64FromFile,
  getDimensionFromFile,
  getBytesToSize,
  getExtensionFromFilename,
  getFilenameWithoutExtension,
  resetFileInput
} from '@/assets/libs/file'

const getUID = (length = 10) => Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1)

export default {
    name: 'bxs_uploader_field',
    props: {
        modelValue: {
            type: [Array, String, Object],
            required: false,
            default: null
        },
        'item-value': {
            type: String,
            required: false,
            default: 'id'
        },
        label: {
            type: String,
            required: false,
            default: null
        },
        'return-object': {
            type: Boolean,
            required: false,
            default: false
        },
        solo: {
            type: Boolean,
            required: false,
            default: false
        },
        block: {
            type: Boolean,
            required: false,
            default: true
        },
        inline: {
            type: Boolean,
            required: false,
            default: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        },
        name: {
            type: String,
            required: false,
            default: ''
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        'item-ratio': {
            type: String,
            required: false,
            default: '1'
        },
        'check-type': {
            type: Boolean,
            required: false,
            default: true
        },
        'max-size-file': {
            type: Number,
            required: false,
            default: 1000000 // 1M
        },
        dimension: {
            type: Object,
            required: false,
            default: null
        },
        accept: {
            type: String,
            required: false,
            // image/tiff, application/pdf
            default: 'image/png, image/jpeg, image/jpg'
        },
        placeholder: {
            type: String,
            required: false,
            default: null
        },
        tag: {
            type: [String, Object],
            required: false,
            default: null
        },
        'show-files': {
            type: Boolean,
            required: false,
            default: true
        },
        immediate: {
            type: Boolean,
            required: false,
            default: true
        },
        'custom-props': {
            type: Object,
            required: false,
            default: null
        },
        debug: {
            type: Boolean,
            required: false,
            default: false
        },
        'item-max-width': {
            type: [String, Number],
            required: false,
            default: 200
        },
        'upload-fn': {
            type: Function,
            required: false,
            default: () => {}
        }
    },
    emits: [
        'update:modelValue',
        'change',
        'add',
        'add-error',
        'change',
        'added',
        'completed',
        'upload',
        'before-add'
    ],
    data () {
        return {
            dotObj,
            tab: 'upload',
            tabs: ['upload', 'storage'],
            files: [],
            preloaded: false,
            loading: false,
            localReturnObject: this.returnObject || !this.immediate,
            //
            tags: [],
            search_items: [],
            seach_loading: false,
            show_storage: false,
            search_keywords: null,
            search_tags: [],
            //
            uploading: {
                resolved: 0,
                counts: 0
            }
        }
    },
    computed: {
        available_types () {
            return this.accept.split(',').map((v) => v.replaceAll(' ', ''))
        },
        item_values () {
            const v = []

            this.files.forEach((i) => {
                if (dotObj.pick(this.itemValue, i)) {
                    v.push(dotObj.pick(this.itemValue, i))
                }
            })

            return v
        },
        uploading_progress () {
            const progress = (100 / this.uploading.counts) * this.uploading.resolved
            return Math.round(progress)
        }
    },
    created () {
        if (this.debug) console.log('uploader created')
        this.start()
    },
    watch: {
        returnObject (newVal) {
            this.localReturnObject = newVal
        },
        value (newVal) {
            if (this.debug) console.log('%c uploader value change: ' + newVal, 'background: #222; color: #bada55')
            this._populate()
        },
        search_keywords () {
            this.getItems()
        },
        search_tags () {
            this.getItems()
        },
        show_storage (newVal) {
            if (newVal) {
                this.$api.distinct('File', 'tags').then((items) => {
                    this.tags = items
                })
            }
        }
    },
    methods: {
        // ------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------------------------------------------------------------------
        async start () {
            if (this.debug) console.log('uploader start')

            await this._populate()
            this.preloaded = true
        },
        async getItems () {
            this.items = []

            if (!this.search_keywords && !this.search_tags.length) return

            this.seach_loading = true
            const filters = {}

            if (this.search_keywords && this.search_keywords.length >= 3) {
                filters.name = this.search_keywords
            }

            if (this.search_tags.length > 0) {
                filters.tags = '[]|' + this.search_tags.join(',')
            }

            const docs = await this.$api.files.list({
                pagination: false,
                filters: filters,
                sort: {
                    name: 1
                }
            })

            this.search_items = docs
            this.seach_loading = false
        },
        // -------------------------------------------------------------------------------------------------------------------
        // publics ------------------------------------------------------------------------------------------------------------
        async add (file) {
            this.$emit('add', file)

            if (this.debug) console.log('uploader add', file)

            this.loading = true

            let item = {}
            item.__selected = false
            item.__expanded = false
            item.__uploading = true
            item.__loading = false
            item.__errors = []
            item.__show_tags = false

            // check mimetype
            if (this.checkType && !this.available_types.includes(file.type)) {
                this.$toast.error(`File '${file.name}' non supportato`)
                this.$emit('add-error', `File '${file.name}'' non supportato`)
                item.__errors.push(`File '${file.name}'' non supportato`)
            }

            item.uid = getUID()
            item.id = item.uid
            item.file = file
            item.name = getFilenameWithoutExtension(file.name, true)
            item.folder = null
            item.alt = item.name
            item.url = null
            item.size = getBytesToSize(file.size)
            item.extension = getExtensionFromFilename(file.name)

            item = this.push(item)

            try {
                item.base64 = await getBase64FromFile(file)
                item.mimetype = getMimeTypeFromBase64DataURI(item.base64)
            } catch (_err) {
                console.error(_err)
            }

            try {
                item.dimension = await getDimensionFromFile(file)

                // ratio
                const r = getGcd(item.dimension.w, item.dimension.h)
                item.aspect_ratio = `${parseInt(item.dimension.w / r)}/${parseInt(item.dimension.h / r)}`
            } catch (_err) {
                console.error(_err)
            }

            //
            if (this.customProps && Object.keys(this.customProps).length > 0) {
                item = {
                    ...item,
                    ...this.customProps
                }
            }

            // clear inut
            this.$refs.fileInput.value = ''
            resetFileInput(this.$refs.fileInput)

            // controls
            const __errors = this.controls(item)

            if (__errors.length > 0) {
                this.$emit('add-error', __errors)

                __errors.forEach((err) => {
                    item.__errors.push(err)
                    this.$toast.error(err)
                })
            }

            try {
                if (this.immediate && !item.__errors.length) {
                    item = await this.upload(item)
                }
            } catch (_err) {
                console.error(_err)
            }

            item.__errors = []
            item.__selected = false
            item.__expanded = false
            item.__uploading = false
            item.__loading = false
            item.__show_tags = false
            item = this.replace(item)

            this.uploading.resolved += 1

            this._updateValue()

            this.$emit('change', this.multiple ? this.item_values : this.item_values[0])
            this.$emit('added', item, this.uploading_progress)

            if (this.uploading_progress >= 100) {
                setTimeout(() => {
                    this.uploading.counts = 0
                    this.uploading.resolved = 0
                    this.$emit('completed')
                }, 1000)
            }

            this.loading = false

            return item
        },
        async upload (item) {
            this.$emit('upload', item)

            if (this.debug) console.log('uploader upload')

            try {
                const docs = await this.$api.files.create({
                    files: [item]
                })

                // const docs = await this.uploadFn(item)

                return docs[0]
            } catch (err) {
                throw new Error(err.message || err.name)
            }
        },
        pushById (id) {
            if (this.debug) console.log('pushById', id)

            if (!id) return

            this.$api.files.doc(id).then((d) => {
                if (d) {
                    this.push(d)
                    this._updateValue()
                }
            })
        },
        push (item) {
            if (!item) return

            if (this.multiple) {
                if (!this.item_values.includes(dotObj.pick(this.itemValue, item))) {
                    if (this.debug) console.log('uploader push', item)
                    this.files.push(JSON.parse(JSON.stringify(item)))
                }
            } else {
                if (this.debug) console.log('uploader push', item)
                this.files = [JSON.parse(JSON.stringify(item))]
            }

            return item
        },
        replace (item) {
            if (this.debug) console.log('uploader replace')

            const index = this.files.findIndex(i => i.uid === item.uid)
            this.files.splice(index, 1)
            this.files.push(JSON.parse(JSON.stringify(item)))
            return item
        },
        controls (item, callback) {
            if (this.debug) console.log('uploader controls')

            const err = []

            // size
            // if (item.size.bytes > this.max.size) {
            //     err.push(`File ${item.name} troppo pesante, massimo 20 Megabyte`)
            // }

            // // check min dimension w
            // if (item.dimension.w < this.min.w || item.dimension.h < this.min.h) {
            //     err.push(`File ${item.name} inferiore alle dimensioni minime consentite`)
            // }

            if (callback && typeof callback === 'function') return callback(err)

            return err
        },
        click () {
            return this.$refs.fileInput.click()
        },
        remove (item) {
            if (this.debug) console.log('uploader remove', item)

            const index = this.files.findIndex(i => i.uid === item.uid)
            this.files.splice(index, 1)
            this.$emit('remove', { item, index })

            this._updateValue()
        },
        // privates
        _handleFileInput (evt) {
            const files = [...evt.target.files]
            this.uploading.counts += files.length
            this.$emit('before-add', this.uploading.counts)
            files.forEach(this.add)
        },
        async _populate () {
            if (this.modelValue && this.modelValue.length > 0) {
                let vals = []
                const isArrOfObjs = this.multiple && Array.isArray(this.modelValue) && this.modelValue.every(i => typeof i === 'object')

                if (isArrOfObjs) {
                    this.modelValue.forEach((item) => {
                        vals.push(dotObj.pick(this.itemValue, item))
                    })
                } else {
                    vals = this.multiple ? this.modelValue : [this.modelValue]
                }

                if (this.files.length > 0) {
                    vals = vals.filter(v => this.files.some(_v => dotObj.pick(this.itemValue, _v) !== v))
                }

                if (vals.length > 0) {
                    const files = await this.$api.files.list({
                        pagination: false,
                        filters: {
                            id: '[]|' + vals.join(',')
                        }
                    })

                    if (this.debug) console.log('uploader _populate', vals)

                    vals.forEach((val) => {
                        const item = files.find(i => dotObj.pick(this.itemValue, i) === val)

                        if (item) {
                            item.__errors = []
                            item.__selected = false
                            item.__expanded = false
                            item.__uploading = false
                            item.__loading = false
                            item.__show_tags = false
                            this.push(item)
                        }
                    })

                    this._updateValue()
                }
            } else {
                this.files = []
            }
        },
        _updateValue () {
            if (this.debug) console.log('%c _updateValue', 'background: #222; color: #bada55', this.item_values)

            this.$nextTick(() => {
                if (!this.localReturnObject) {
                    return this.$emit('update:modelValue', this.multiple ? this.item_values : this.item_values[0])
                }

                return this.$emit('update:modelValue', this.multiple ? this.files : this.files[0])
            })
        }
    }
}
</script>

<style lang="scss" scoped>
ul,
li {
    margin: 0;
    padding: 0;
    list-style: none;
}

.uploader--item--btn-remove {
    position: absolute;
    top: 5px;
    right: 10px;
    width: 10%;
    height: 20%;
    max-width: unset;
    max-height: unset;
    min-width: unset;
    min-height: unset;
    z-index: 1;
    padding: 0;
    margin: 0;
    background: transparent;
    color: red;

    i {
        font-size: 1.25rem;
    }
}

.uploader--item--drag-icon {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 1;
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
    color: white;
}

.bxs-file-uploader-field {
    position: relative;
    flex: 1;
    box-shadow: none ;
    background: transparent ;
    background-color: transparent;

    &.bxs-file-uploader-field-inline {
        display: inline-block;
        flex: unset;
    }

    &:hover {
        .bxs-file-uploader-field--uploader-zone {
            border-color: var(--input-color-focused);
        }
    }

    &--uploader-zone {
        border-radius: var(--radius);
        background-color: var(--input-background-color);
        border: 1px dashed rgba(#fff, 0.4);
    }
}

.hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    word-wrap: normal;
}
</style>

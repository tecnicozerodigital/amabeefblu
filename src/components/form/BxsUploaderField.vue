<template>
    <div class="bxs-file-uploader" :class="{ 'file-uploader--compact': compact }">
        <!--  -->
        <!-- Modalità "avatar": solo inline preview, click per cambiare -->
        <div
        v-if="compact && !multiple"
        class="file-uploader-avatar">
            <input
            ref="fileInput"
            type="file"
            :accept="accept"
            @change="onFilesSelected"
            class="file-uploader-input" />

            <div
            class="avatar-card"
            @click="triggerFileInput">
                <img
                v-if="files[0] && files[0].mimetype.includes('image')"
                :src="files[0].url || files[0].previewUrl"
                class="avatar-img"
                alt="Avatar" />

                <div v-else class="avatar-placeholder">
                    <span>+</span>
                </div>

                <button
                v-if="files[0]"
                class="avatar-remove"
                title="Rimuovi"
                @click.prevent.stop="removeFile(files[0])">×</button>
            </div>
        </div>

        <div
        v-else
        class="file-uploader-dropzone"
        :class="{
            'file-uploader-dropzone--active': dragActive,
            'file-uploader-dropzone--compact': compact
        }"
        @dragover.prevent="dragActive = true"
        @dragleave.prevent="dragActive = false"
        @drop.prevent="onDrop"
        @click="triggerFileInput">
            <input
            ref="fileInput"
            type="file"
            :accept="accept"
            :multiple="multiple"
            @change="onFilesSelected"
            class="file-uploader-input" />

            <span v-if="!compact">Trascina i file qui oppure <span class="file-uploader-link">clicca</span> per selezionarli</span>
            <span v-else>
                <span class="file-uploader-link">Carica</span>
            </span>

            <!-- IMMAGINE SINGOLA/COMPATTA -->
            <div v-if="compact && files.length">
                <div class="file-uploader-inline-preview">
                <img
                v-if="files[0].previewType === 'image'"
                :src="files[0].url || files[0].previewUrl"
                class="file-uploader-img-small" />

                <span
                v-else-if="files[0].previewType === 'pdf'"
                class="file-uploader-icon file-uploader-icon--pdf">PDF</span>

                <span
                v-else
                class="file-uploader-icon">FILE</span>

                <button
                @click.prevent.stop="removeFile(files[0])"
                class="file-uploader-remove file-uploader-remove--small"
                title="Rimuovi file">×</button>

                <div
                v-if="files[0].uploading"
                class="file-uploader-progress-bar file-uploader-progress-bar--small">
                    <div class="file-uploader-progress-bar-inner" :style="{ width: files[0].progress + '%' }"></div>
                </div>
                </div>
            </div>
        </div>

        <!-- LISTA SOLO SE NON COMPATTO -->
        <div
        v-if="!compact && files.length"
        class="file-uploader-list">
            <div
            v-for="(file, i) in files"
            :key="i"
            class="file-uploader-card">
                <!--  -->
                <button
                @click.prevent.stop="removeFile(file)"
                class="file-uploader-remove"
                title="Rimuovi file">×</button>

                <div class="file-uploader-preview">
                    <img
                    v-if="file.previewType === 'image'"
                    :src="file.url || file.previewUrl"
                    class="file-uploader-img" />

                    <span
                    v-else-if="file.previewType === 'pdf'"
                    class="file-uploader-icon file-uploader-icon--pdf small">PDF</span>

                    <span
                    v-else
                    class="file-uploader-icon small">FILE</span>
                </div>

                <!--  -->
                <div class="file-uploader-info">
                    <div
                    class="file-uploader-name small"
                    :title="file.filename">{{ file.filename || file.name }}</div>

                    <div
                    v-if="file.size"
                    class="file-uploader-size">{{ file.size }}</div>

                    <div
                    v-if="file.created_at"
                    class="small">{{ $filters.toHumanDate(file.created_at) }}</div>

                    <div
                    v-if="file.uploading"
                    class="file-uploader-progress">
                        <div class="file-uploader-progress-bar">
                            <div
                            class="file-uploader-progress-bar-inner"
                            :style="{ width: file.progress + '%' }"></div>
                        </div>

                        <div class="file-uploader-progress-label">Uploading {{ file.progress }}%</div>
                    </div>

                    <div
                    v-else-if="file.error"
                    class="file-uploader-error">
                        {{ file.error }}
                        <button @click.prevent="retryFile(file)" class="file-uploader-retry">Riprova</button>
                    </div>

                    <div v-else-if="!file.error && progress < 100" class="file-uploader-success">Caricato!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */

import { ref, watch, onMounted, reactive, getCurrentInstance } from 'vue'

// Helper per convertire file in base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result)
    reader.onerror = e => reject(e)
    reader.readAsDataURL(file)
  })
}

const props = defineProps({
  modelValue: {
    type: [String, Array, Object],
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false
  },
  accept: {
    type: String,
    default: 'image/jpeg,image/png,image/jpg,image/gif'
  },
  'user-field': {
    tyep: String,
    required: false,
    default: null
  },
  'user-field-type': {
    tyep: String,
    required: false,
    default: 'string'
  },
  compact: { type: Boolean, default: false }
})

const instance = getCurrentInstance()
const emit = defineEmits(['update:modelValue', 'change'])
const files = ref([])
const dragActive = ref(false)
const fileInput = ref(null)
let $api = instance.proxy.$api

function triggerFileInput() {
  fileInput.value?.click()
}
function onDrop(e) {
  dragActive.value = false
  handleFiles(e.dataTransfer.files)
}
function onFilesSelected(e) {
  handleFiles(e.target.files)
  e.target.value = null
}

function handleFiles(fileList) {
    const selectedFiles = Array.from(fileList).filter(isAccepted)

    if (!props.multiple) {
        // files.value = []
        // if (selectedFiles.length) uploadFile(selectedFiles[0])
        uploadFile(selectedFiles[0])
    } else {
        for (const file of selectedFiles) uploadFile(file)
    }

    emit('change', files.value)
}

function getPreviewType(mimetypeOrExtension) {
  if (!mimetypeOrExtension) return 'other'
  if (typeof mimetypeOrExtension === 'string') {
    if (mimetypeOrExtension.startsWith('image/') || /\.(jpe?g|png|gif|webp)$/i.test(mimetypeOrExtension)) return 'image'
    if (mimetypeOrExtension === 'application/pdf' || /pdf$/i.test(mimetypeOrExtension)) return 'pdf'
  }
  return 'other'
}

async function fetchFilesByIds(ids) {
    if (!ids || !ids.length) return []

    try {
        const arr = Array.isArray(ids) ? ids : [ids]
        const data = await $api.files.list({
            pagination: false,
            id: '[]|' + arr.join(',')
        })

        // Mappatura schema documento
        return data.map(doc => ({
            id: doc.id,
            filename: doc.name,
            url: doc.url,
            previewType: getPreviewType(doc.mimetype || doc.extension),
            uploading: false,
            progress: 100,
            error: null,
            size: doc.size?.human,
        }))
    } catch (e) {
        return []
    }
}

function isAccepted(file) {
    // accetta sia mimetype che estensione
    const accepted = props.accept.split(',').map(x => x.trim().toLowerCase()).filter(Boolean)
    if (!accepted.length) return true
    const mime = (file.type || '').toLowerCase()
    const ext = '.' + (file.name || '').split('.').pop().toLowerCase()
    return accepted.some(a => mime === a || (a.startsWith('.') && ext === a) || (a.includes('/') && mime === a))
}

function isFileObject(obj) {
  return obj && (obj.url || obj.previewUrl) && (obj.name || obj.filename)
}

async function loadInitialModel(val) {
    console.log('loadInitialModel', val)

    files.value = []
    if (!val) return

    if (Array.isArray(val)) {
        // 1. Split
        const filesObjs = val.filter(isFileObject)
        const ids = val.filter(v => !isFileObject(v))
        // console.log('arr objs', filesObjs)
        // console.log('strings', ids)

        // 2. Copia oggetti file già pronti
        files.value = filesObjs.map(f => ({ ...f, uploading: false, progress: 0 }))

        // 3. Fetch ids, se ce ne sono
        if (ids.length > 0) {
            const fetched = await fetchFilesByIds(ids)

            if (fetched.length > 0) {
                files.value = [
                    ...files.value,
                    ...fetched.map(f => ({ ...f, uploading: false, progress: 0 }))
                ]
            }
        }
    } else if (typeof val === 'object' && val !== null) {
        files.value = [{ ...val, uploading: false, progress: 0 }]
    } else if (typeof val === 'string') {
        const fetched = await fetchFilesByIds([val])
        files.value = fetched ? fetched.map(f => ({ ...f, uploading: false, progress: 0 })) : []
    }
}

onMounted(() => {
    const instance = getCurrentInstance()
    $api = instance.proxy.$api

    // loadInitialModel(props.modelValue)

    // Solo al primo montaggio
    // if (props.modelValue && props.modelValue.length > 0) {
        // fetchFilesByIds(props.modelValue).then(res => files.value = res)
    // }
})

watch(
  () => props.modelValue,
  async (newVal) => {
    if (newVal && (Array.isArray(newVal) ? newVal.length : true)) {
      await loadInitialModel(newVal)
    }
  },
  { immediate: true }
)

// watch(files, (newVal) => {
//     console.log('array files mutato', newVal)
// }, { deep: true })

function updateModel() {
    const ids = files.value.filter(f => f.id).map(f => f.id)
    emit('update:modelValue', props.multiple ? ids : ids[0])
}

async function uploadFile(file, retryObj = null) {
    const localId = `${file.name}-${file.lastModified || Date.now()}-${Math.random()}`
    let obj = retryObj

    if (!obj) {
        const previewUrl = await fileToBase64(file)
        obj = {
            localId,
            filename: file.name,
            url: null,
            previewUrl,
            previewType: getPreviewType(file),
            uploading: true,
            progress: 0,
            error: '',
            size: (file.size/1024/1024).toFixed(2) + " MB",
            file: file
        }
        files.value.push(obj)
    } else {
        obj.uploading = true
        obj.error = ''
        obj.progress = 0
    }

    try {
        // const base64 = await fileToBase64(file)
        const form = new FormData()
        if (props.userField) form.append('user_field', props.userField)
        if (props.userFieldType) form.append('user_field_type', props.userFieldType)
        form.append('file', file)
        // form.append('base64', base64)

        // const access_token = sessionStorage.getItem('swissstart_a_t') || null
        // const resp = await axios.post('http://localhost:5000/v1/files', form, {
        //     withCredentials: true,
        //     headers: {
        //         Authorization: `Bearer ${access_token}`,
        //         'x-app-id': 'swissstart'
        //     },
        //     onUploadProgress: (evt) => {
        //         // console.log('progress ' + obj.filename, obj.progress)
        //         if (evt.lengthComputable) {
        //             obj.progress = Math.round((evt.loaded / evt.total) * 100)
        //         }
        //     }
        // })

        const resp = await $api.files.upload(form, (evt) => {
            if (evt.lengthComputable) {
                obj.progress = Math.round((evt.loaded / evt.total) * 100)
            }
        })
        const data = resp.data[0]

        obj.id = data.id || obj.localId
        obj.filename = data.name
        obj.url = data.url
        // obj.previewType = getPreviewType(data.mimetype || data.extension)
        obj.uploading = false
        obj.progress = 100
        obj.error = null
        obj.size = data.size?.human || obj.size

        updateModel()
    } catch (err) {
        console.error('Errore caricamento file', err)
        obj.uploading = false
        obj.error = 'Errore upload'
        obj.progress = 0
    }
}

function retryFile(fileObj) {
    // Se il file oggetto NON ha File originale, non si può ritentare
    if (fileObj.id) return

    // Ricrea il file da input utente
    const file = findOriginalFile(fileObj.filename, fileObj.size)
    if (file) uploadFile(file, fileObj)
}

// Helper per trovare il file originale dall'input (quando retry)
function findOriginalFile(filename, sizeMb) {
    // Non possiamo risalire al file originale dopo reload pagina.
    // In un sistema reale, dovresti salvare il file in obj.file!
    // Qui, se serve, puoi passare obj.file direttamente a uploadFile nel retry.
    return null
}

async function removeFile(file) {
    await $api.files.remove(file.id)
    files.value = files.value.filter(f => f !== file)
    updateModel()
}
</script>

<style lang="scss">
// === Variabili colore ===
$border: var(--color-mute);
$border-active: #4788f0;
$bg: #f7f7fa;
$bg-active: #eaf2fe;
$link: #4788f0;
$shadow: #0001;
$remove-hover: #f24d4d;
$preview-bg: #f0f0f2;
$icon-pdf: #d22;
$progress-bg: #e5e7eb;
$progress-bar: #4788f0;
$error: #d22;
$error-hover: #a00;
$success: #44a747;

// === Dropzone ===
.file-uploader-dropzone {
  border: 1px dashed $border;
  border-radius: 14px;
  padding: 28px 20px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $bg;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
  font-size: 16px;
  color: #555;

  &--active {
    border-color: $border-active;
    background: $bg-active;
  }
  &--compact {
    padding: 8px 12px;
    min-height: 38px;
    font-size: 14px;
    border-radius: 8px;
    margin-bottom: 0;
    justify-content: flex-start;
  }
}
.file-uploader--compact .file-uploader-dropzone { @extend .file-uploader-dropzone--compact; }

// === Input nascosto e link ===
.file-uploader-input { display: none; }
.file-uploader-link { text-decoration: underline; color: $link; cursor: pointer; }

// === Lista ===
.file-uploader-list {
}

// === Card file ===
.file-uploader-card {
    display: block;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 3px 10px 0 $shadow;
  padding: 16px 16px 16px 70px;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

// === Remove button ===
.file-uploader-remove {
  position: absolute;
  right: 13px;
  top: 12px;
  background: none;
  border: none;
  color: #bbb;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  z-index: 3;
  transition: color 0.15s;

  &:hover { color: $remove-hover; }

  &--small {
    font-size: 18px;
    margin-left: 2px;
    top: auto;
    right: auto;
    position: static;
    color: #c44;
  }
}

// === Anteprima file ===
.file-uploader-preview {
  position: absolute;
  left: 18px;
  top: 16px;
  width: 44px; height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $preview-bg;
  border-radius: 8px;
  overflow: hidden;
  z-index: 2;
}
.file-uploader-img, .file-uploader-img-small {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 7px;
  display: block;
}
.file-uploader-img-small {
  width: 38px; height: 38px; border: 1px solid #ddd; border-radius: 7px;
}

// === Icona e testo ===
.file-uploader-icon {
  font-weight: bold;
  font-size: 15px;
  color: #777;

  &--pdf { color: $icon-pdf; }
}

// === Info file ===
.file-uploader-info {
    flex: 1;
    min-width: 0;
    padding-right: 1rem;
}

.file-uploader-name {
  font-weight: 600;
  font-size: 15px;
//   max-width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.file-uploader-size { color: #888; font-size: 13px; margin-top: 2px; }

// === Progress & stato ===
.file-uploader-progress { margin-top: 10px; }
.file-uploader-progress-bar, .file-uploader-progress-bar--small {
  background: $progress-bg;
  border-radius: 5px;
  height: 8px; overflow: hidden;
}
.file-uploader-progress-bar--small {
  width: 38px; height: 4px; margin-left: 5px; border-radius: 2px;
}
.file-uploader-progress-bar-inner {
  background: $progress-bar; height: 8px; width: 0;
  transition: width 0.35s;
}
.file-uploader-progress-label { color: #888; font-size: 12px; margin-top: 3px; }

// === Errori, retry, success ===
.file-uploader-error {
  color: $error;
  font-size: 13px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.file-uploader-retry {
  margin-left: 7px;
  background: #f8f8fa;
  border: 1px solid $error;
  color: $error;
  padding: 3px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  &:hover { background: #fff; color: $error-hover; }
}
.file-uploader-success { color: $success; font-size: 13px; margin-top: 10px; }

// === Inline preview compatta ===
.file-uploader-inline-preview {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
}

.file-uploader-avatar {
  display: inline-block;
  position: relative;

  .avatar-card {
    width: calc(var(--avatar-size) * 2);
    height: calc(var(--avatar-size) * 2);
    border-radius: 50%;
    background: #f7f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 6px 0 #0001;
    position: relative;
    // overflow: hidden;
    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 4px 14px 0 #0002;
    }
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #bbb;
    font-size: 36px;
    font-weight: bold;
    border-radius: 50%;
    background: #f0f0f2;
    transition: background 0.2s;
  }

  .avatar-remove {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    top: 5px;
    right: 5px;
    background: #fff;
    border: none;
    color: #d22;
    font-size: 20px;
    line-height: 100%;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    z-index: 2;
    transition: background 0.18s, color 0.18s;

    &:hover {
      background: #fee;
      color: #a00;
    }
  }
}
</style>

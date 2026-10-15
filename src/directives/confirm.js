/* eslint-disable */

import { createApp, h, nextTick } from 'vue'

const PopoverConfirm = {
    props: ['message', 'onConfirm', 'onCancel', 'coords'],
    emits: ['close'],
    data() { return { visible: true } },
    methods: {
        doConfirm() { this.visible = false; this.onConfirm && this.onConfirm(); this.$emit('close') },
        doCancel() { this.visible = false; this.onCancel && this.onCancel(); this.$emit('close') }
    },
    mounted() { setTimeout(() => { document.addEventListener('click', this.handleOutside, true) }, 1) },
    beforeUnmount() { document.removeEventListener('click', this.handleOutside, true) },
    methods: {
        doConfirm() { this.visible = false; this.onConfirm && this.onConfirm(); this.$emit('close') },
        doCancel() { this.visible = false; this.onCancel && this.onCancel(); this.$emit('close') },
        handleOutside(e) {
            // se clicchi fuori dal popover, chiudi
            if (!this.$el.contains(e.target)) this.doCancel()
        }
    },
    render() {
        if (!this.visible) return null
        // posiziona con coords (top/left)
        return h('div', {
            class: 'popover-confirm',
            style: {
                position: 'fixed',
                top: (this.coords.top + this.coords.height + 8) + 'px', // 8px sotto
                left: (this.coords.left) + 'px',
                zIndex: 9999,
                minWidth: '210px',
                maxWidth: '320px'
            }
        }, [
            h('div', { class: 'popover-content' }, [
                h('div', { class: 'popover-message' }, this.message || 'Sei sicuro?'),
                h('div', { class: 'popover-actions' }, [
                    h('button', { class: 'popover-btn', onClick: this.doCancel }, 'Annulla'),
                    h('button', { class: 'popover-btn btn-danger', onClick: this.doConfirm }, 'Elimina')
                ])
            ])
        ])
    }
}

export default {
    mounted(el, binding) {
        el.__popoverConfirmHandler__ = e => {
            e.stopPropagation()
            e.preventDefault()
            // Trova posizione elemento nella viewport
            const rect = el.getBoundingClientRect()
            // Chiudi popover già esistenti
            if (window.__currentPopover__) {
                window.__currentPopover__.app.unmount()
                document.body.removeChild(window.__currentPopover__.container)
                window.__currentPopover__ = null
            }
            // Costruisci app Vue con popover
            const container = document.createElement('div')
            document.body.appendChild(container)
            const app = createApp(PopoverConfirm, {
                message: typeof binding.value === 'string'
                    ? binding.value
                    : (binding.value?.message || 'Sei sicuro di voler continuare?'),
                onConfirm: typeof binding.value === 'function'
                    ? binding.value
                    : (binding.value?.onConfirm || (() => { })),
                onCancel: typeof binding.value === 'object' && binding.value?.onCancel
                    ? binding.value.onCancel
                    : (() => { }),
                coords: rect
            })
            // Chiudi alla fine
            app._instance?.exposed?.close
            app.mount(container)
            window.__currentPopover__ = { app, container }
        }
        el.addEventListener('click', el.__popoverConfirmHandler__)
    },
    unmounted(el) {
        el.removeEventListener('click', el.__popoverConfirmHandler__)
    }
}

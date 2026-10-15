<template>
  <transition name="fade">
    <div v-if="visible" class="confirm-overlay" @click.self="onCancel">
      <div class="confirm-float">
        <div class="confirm-message">
          <slot>
            Sei sicuro di voler eliminare?
          </slot>
        </div>
        <div class="confirm-actions">
          <button class="btn" @click="onCancel">Annulla</button>
          <button class="btn btn-danger" @click="onConfirm">Elimina</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */

export default {
  name: 'FloatConfirmDialog',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  computed: {
    visible() {
      return this.modelValue
    }
  },
  methods: {
    onCancel() {
      this.$emit('update:modelValue', false)
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('update:modelValue', false)
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-float {
  background: #fff;
  border-radius: 16px;
  padding: 2em 2em 1.5em 2em;
  min-width: 240px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  animation: floatin .2s cubic-bezier(.44,2,.57,.86);
}
@keyframes floatin {
  from { transform: translateY(20px) scale(0.98); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
.confirm-message {
  font-size: 1.1em;
  margin-bottom: 1em;
  text-align: center;
}
.confirm-actions {
  display: flex;
  gap: 1.5em;
  justify-content: center;
}
.btn {
  border: none;
  background: #eee;
  padding: 0.6em 1.6em;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background .18s;
}
.btn:hover {
  background: #ddd;
}
.btn-danger {
  background: #fd6262;
  color: #fff;
}
.btn-danger:hover {
  background: #d91d1d;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .15s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

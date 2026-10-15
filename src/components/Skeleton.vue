<template>
  <div :class="['skeleton-block', { 'skeleton-circle': circle }]" :style="{ width, height }">
    <div class="skeleton-shimmer"></div>
  </div>
</template>

<script setup>
/* eslint-disable */

const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '1em' },
  circle: { type: Boolean, default: false },
})
</script>

<style scoped>
.skeleton-block {
  position: relative;
  background-color: #e0e0e0;
  overflow: hidden;
  border-radius: 4px;
}
.skeleton-circle { border-radius: 50%; }
.skeleton-shimmer {
  position: absolute;
  top: 0; left: -150%;
  height: 100%; width: 150%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer { to { transform: translateX(150%); } }
</style>

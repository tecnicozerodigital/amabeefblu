<template>
    <input
    v-bind="$attrs"
    class="bxs-field-input bxs-field-input-text"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @click="$emit('click', $event)">
</template>

<script>
export default {
    name: 'bxs_text_field',
    inheritAttrs: false,
    emits: [
        'update:modelValue',
        'update:model-value',
        'change',
        'focus',
        'blur',
        'click'
    ]
}
</script>
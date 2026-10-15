<template>
    <textarea
    v-bind="$attrs"
    class="bxs-field-input bxs-field-input-textarea"
    cols="30"
    rows="5"
    style="resize: none;"
    @change="$emit('change', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @click="$emit('click', $event)"></textarea>
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
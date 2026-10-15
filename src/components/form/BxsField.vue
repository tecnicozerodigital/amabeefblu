<template>
    <div
    :class="classes"
    :style="styles">
        <!--  -->
        <div
        v-if="label"
        class="bxs-field--label-content">
            <label
            v-if="label"
            ref="label"
            :for="name">{{ required ? '* ' + label : label }}</label>
        </div>

        <!--  -->
        <div
        ref="fieldContent"
        :class="['bxs-field--content', colorable.class, content_class]"
        @click="handleClick">
            <div
            v-if="$slots.prepend"
            class="bxs-field--content--prepend-content">
                <slot name="prepend" />
            </div>

            <!-- text-truncate -->
            <div class="bxs-field--content--input-content">
                <slot
                v-bind="{
                    ref: (el) => inputRef = el,  // Assegna la ref all'input
                    modelValue,
                    id: id || name,
                    class: colorable.class,
                    style: colorable.style,

                    title,
                    optionTitle,
                    lang,
                    dir,

                    type: internalType,
                    name,
                    value,
                    disabled,
                    readonly,
                    required,
                    placeholder,
                    autocomplete,
                    autofocus,
                    checked,

                    min,
                    max,
                    minLength,
                    maxLength,
                    maxSelectable,
                    step,
                    pattern,
                    multiple,
                    suggestions,
                    options,

                    ariaLabel,
                    spellcheck,
                    inputmode,
                    hideSearch,

                    'onUpdate:modelValue': (value) => $emit('update:modelValue', value),
                    onChange: handleChange,
                    onInput: handleInput
                }" />
                <!-- onFocus: (event) => handleFocus(true, event),
                onBlur: (event) => handleFocus(false, event),
                onClick: handleClick, -->
            </div>

            <div
            v-if="$slots.append || appendIcon || clearable"
            class="bxs-field--content--append-content">
                <slot
                v-if="$slots.append"
                name="append"
                :value="showPass"
                :on="{
                    click: () => showPass = !showPass
                }"
                :attrs="{
                    role: 'button',
                    'aria-haspopup': true,
                    'aria-expanded': false
                }" />

                <bxs-icon
                v-if="clearable && cacheValue && cacheValue.length > 0"
                name="close"
                class="ml-2"
                width="1.1em"
                height="1.1em"
                link
                @click="reset"></bxs-icon>

                <bxs-icon
                v-if="appendIcon"
                :name="appendIcon"
                :disabled="disabled" />
            </div>
        </div>

        <!-- footer -->
        <div
        v-if="!hideDetails"
        class="bxs-field--footer-content">
            <div
            v-if="hint || minLength || maxLength"
            class="bxs-field--hint flex-1">
                <div>
                    <span>{{ hint }}</span>
                </div>

                <!-- <bxs-spacer v-if="!hideCounter && (minLength || maxLength)"></bxs-spacer> -->

                <div v-if="!hideCounter">
                    <!-- <span v-if="minLength">min. {{ minLength }}</span> -->

                    <span v-if="minLength && maxLength" class="mx-1">-</span>

                    <span v-if="maxLength">{{ charsCount }}</span>
                    <span v-if="maxLength" style="margin: 0 1px;">/</span>
                    <span v-if="maxLength">{{ maxLength }}</span>
                </div>
            </div>

            <!--  -->
            <div class="bxs-field--error">
                <ul>
                    <li
                    v-for="(error, i) in cacheErrors"
                    :key="i">. {{ error }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { inputable } from '@/mixins'

export default {
    name: 'bxs_field',
    mixins: [inputable]
}
</script>
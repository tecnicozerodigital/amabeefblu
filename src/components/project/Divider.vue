<template>
    <svg
    data-scroll-anim-reveal="clip"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 100"
    :width="width"
    :class="marginY ? `my-${marginY}` : null">
        <path
        :fill="color ? `var(--color-${color})` : null"
        d="M990 45H535.5A35.2 35.2 0 0 1 500 11.6 35.2 35.2 0 0 1 464.5 45H10v10h454.5A35.2 35.2 0 0 1 500 88.4 35.2 35.2 0 0 1 535.5 55H990V45Z"></path>
    </svg>

    <!-- <svg
    :width="width"
    height="1"
    viewBox="0 0 20 1"
    xmlns="http://www.w3.org/2000/svg">
        <path
        d="M1 0.5C0.867392 0.5 0.740215 0.447322 0.646447 0.353553C0.552678 0.259785 0.5 0.132608 0.5 0C0.5 0.132608 0.447322 0.259785 0.353553 0.353553C0.259785 0.447322 0.132608 0.5 0 0.5C0.132608 0.5 0.259785 0.552678 0.353553 0.646447C0.447322 0.740215 0.5 0.867392 0.5 1C0.5 0.867392 0.552678 0.740215 0.646447 0.646447C0.740215 0.552678 0.867392 0.5 1 0.5Z"
        :fill="color ? `var(--color-${color})` : null" />
    </svg> -->
</template>

<script>
export default {
    name: 'project_divider',
    props: {
        color: {
            type: String,
            required: false,
            default: null
        },
        'margin-y': {
            type: [String, Number],
            required: false,
            default: null
        },
        width: {
            type: [String, Number],
            required: false,
            default: 'auto'
        }
    }
}
</script>

<style lagn="scss" scoped>
svg {
    display: inline-block;
    opacity: 0.25;
    pointer-events: none;
}
</style>
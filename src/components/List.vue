<template>
    <div class="bxs-list">
        <ul>
            <slot />
        </ul>
    </div>
</template>

<script>
export default {
    name: 'bxs-list'
}
</script>

<style lang="scss" scoped>
.bxs-list {
    position: relative;

    > ul {
        position: relative;
    }
}
</style>
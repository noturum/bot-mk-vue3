<template>
    <button class="btn btn-custom mt-4" @click="emits('click')">
        <slot />
    </button>
</template>

<script setup lang="ts">
const emits = defineEmits<{
    click:[]
}>()
</script>
<style scoped></style>
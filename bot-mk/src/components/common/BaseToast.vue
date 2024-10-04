<template>
    <div class="notify toast align-items-center position-absolute w-auto start-50 translate-middle-x mt-4 z-2"
        role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
    click:[]
}>()
</script>
<style scoped></style>
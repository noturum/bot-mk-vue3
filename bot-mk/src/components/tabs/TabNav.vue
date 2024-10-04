<template>
    <li class="nav-item">
        <a class="nav-link" :class="{ active: isActive }" @click="emits('click')">
            <slot />
        </a>
    </li>
</template>
<script setup lang="ts">
const props = defineProps<{
    isActive: boolean
}>()
const emits = defineEmits<{
    click: []
}>()
</script>
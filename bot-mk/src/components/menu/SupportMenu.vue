<template>
    <nav class="reviews-actions d-flex flex-column text-white fw-normal p-2">
        <button class="btn btn-custom mt-4" @click="emits('click')">Пожаловаться на пользователя</button>
        <button class="btn btn-custom mt-4" @click="emits('click')">Написать админу: @asap_delivery </button>
    </nav>

</template>

<script setup lang="ts">
const emits = defineEmits<{
    click: []
}>()
</script>
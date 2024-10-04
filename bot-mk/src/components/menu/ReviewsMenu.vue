<template>
    <nav class="reviews-actions d-flex flex-column text-white fw-normal p-2">
        <button class="btn btn-custom mt-4" @click="menues['review']=233">Написать отзыв</button>
        <button class="btn btn-custom mt-4" @click="emits('click')">Проверить пользователя</button>
        <button class="btn btn-custom mt-4" @click="emits('click')">Мои отзывы</button>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emits = defineEmits<{
    click: []
}>()
const props = defineProps<{
    menues: { [key: string]: any }
}>()
const menuList = ref(props.menues)
</script>
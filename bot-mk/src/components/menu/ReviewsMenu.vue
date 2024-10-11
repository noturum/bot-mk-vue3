<template>
  <nav class="reviews-actions d-flex flex-column text-white fw-normal p-2">
    <BaseButton @click="emits('setMenu','createReview')"> Написать отзыв </BaseButton>
    <BaseButton @click="emits('setMenu','checkUser')"> Проверить пользователя </BaseButton>
    <BaseButton @click="emits('setMenu','myReviews')"> Мои отзывы </BaseButton>
  </nav>
</template>

<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
const emits = defineEmits<{
  click: [];
  setMenu: [tab: string];
}>();
</script>

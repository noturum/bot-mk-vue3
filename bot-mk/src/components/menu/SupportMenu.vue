<template>
  <nav class="reviews-actions d-flex flex-column text-white fw-normal p-2">
    <BaseButton @click="emits('setMenu','report')">
      Пожаловаться на пользователя
    </BaseButton>
    <BaseButton @click="emits('click')">
      Написать админу: @asap_delivery
    </BaseButton>
  </nav>
</template>

<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
const emits = defineEmits<{
  click: [];
  setMenu: [tab: string];
}>();
</script>

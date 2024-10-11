<template>
  <div class="d-flex flex-column align-items-center text-center">
    <header class="logo-container">
      <h1 class="welcome-title">
        Welcome to <br />
        Delevisor
      </h1>
    </header>
    <p class="welcome-text">
      Здесь приветсвенный текст, что-то типа: здравствуй пользователь, это
      приложение для того-то, жми "Создать заявку" и полетели.
    </p>

    <BaseButton @click="emits('setMenu', 'createRequest')"
      >Создать заявку</BaseButton
    >
    <BaseButton @click="emits('setMenu', 'search')">Поиск</BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
const emits = defineEmits<{
  click: [];
  setMenu: [tab: string];
}>();
</script>

<template>
    <form id="createForm" class="mb-4 w-100" @submit.prevent>
      <BaseInput type="search" id="contacts" v-model:data="form.contacts">
        Укажите номер или никнейм пользователя
      </BaseInput>
      <BaseInput type="textarea" id="description" v-model:data="form.review">
        Напишите отзыв
      </BaseInput>
      <BaseButton> Отправить </BaseButton>
    </form>
  </template>
  
  <script setup lang="ts">
  import {reactive} from "vue";
  import BaseInput from "../common/BaseInput.vue";
  import BaseButton from "../common/BaseButton.vue";
  import type { CreateReview } from "@/helper/types";
  const form = reactive({} as CreateReview);
  </script>
  
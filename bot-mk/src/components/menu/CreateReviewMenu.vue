<template>
  <form id="createForm" class="mb-4 w-100" @submit.prevent="formSubmit">
    <BaseInput
      type="search"
      id="contacts"
      v-model:data="form.contacts"
      :errors="errorsForm.contacts"
    >
      Укажите номер или никнейм пользователя
    </BaseInput>
    <BaseInput
      type="textarea"
      id="description"
      v-model:data="form.review"
      :errors="errorsForm.review"
    >
      Напишите отзыв
    </BaseInput>
    <BaseButton> Отправить </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import type { CreateReview, ErrorReview } from "@/helper/types";
import { isEmpty, validate } from "@/helper/validators";
const form = reactive({ contacts: "", review: "" } as CreateReview);
const errorsForm = ref({} as ErrorReview);

const formSubmit = () => {
  let { errors, isValid } = validate(form, {
    contacts: isEmpty,
    review: isEmpty,
  });
  errorsForm.value = errors;
  if (isValid) {
    console.log("Send datta");
  }
};
</script>

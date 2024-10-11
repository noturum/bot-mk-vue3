<template>
  <form id="createForm" class="mb-4 w-100" @submit.prevent="submitForm">
    <BaseInput
      type="textarea"
      id="description"
      v-model:data="form.user"
      :errors="errorsForm.user"
    >
      Введите контакты пользователя
    </BaseInput>
    <BaseButton> Отправить </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import type { CheckUser, ErrorCheckUser } from "@/helper/types";
import { validate, isEmpty } from "@/helper/validators";
const form = reactive({ user: "" } as CheckUser);
const errorsForm = ref({} as ErrorCheckUser);
const submitForm = () => {
  let { errors, isValid } = validate(form, {
    user: isEmpty,
  });
  errorsForm.value = errors;
  if (isValid) console.log("valid");
};
</script>

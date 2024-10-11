<template>
  <form id="createForm" class="mb-4 w-100" @submit.prevent="submitForm">
    <BaseInput
      type="textarea"
      id="description"
      v-model:data="form.report"
      :errors="errorsForm.report"
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
import type { CreateReport, ErrorReport } from "@/helper/types";
import { validate, isEmpty } from "@/helper/validators";
const form = reactive({ report: "" } as CreateReport);
const errorsForm = ref({} as ErrorReport);
const submitForm = () => {
  let { errors, isValid } = validate(form, {
    report: isEmpty,
  });
  errorsForm.value = errors;
  if (isValid) console.log("valid");
};
</script>

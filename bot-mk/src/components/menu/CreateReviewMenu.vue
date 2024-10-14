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
      v-model:data="form.description"
      :errors="errorsForm.description"
    >
      Напишите отзыв
    </BaseInput>
    <BaseButton> Отправить </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import type { Review } from "@/helper/types";
import { isEmpty, validate } from "@/helper/validators";
import { useToastsStore } from "@/stores/toasts";
import api from "@/Api";
import { REVIEWS, SEND_REVIEW } from "@/helper/strings";
const { addToast } = useToastsStore();
const emits = defineEmits<{
  setMenu: [tab: string];
}>();
const getForm = () => {
  return toRaw(form);
};
const form = reactive({ contacts: "", description: "" } as Review);
const errorsForm = ref({} as Partial<Review>);

const formSubmit = () => {
  let { errors, isValid } = validate(form, {
    contacts: [isEmpty],
    description: [isEmpty],
  });
  errorsForm.value = errors;
  if (isValid) {
    api.post(REVIEWS, getForm()).then(() => {
      emits("setMenu", "main");
      addToast(SEND_REVIEW, 2000);
    });
  }
};
</script>

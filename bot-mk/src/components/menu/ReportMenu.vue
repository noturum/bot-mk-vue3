<template>
  <form id="createForm" class="mb-4 w-100" @submit.prevent="submitForm">
    <BaseInput
      type="textarea"
      id="contacts"
      v-model:data="form.contacts"
      :errors="errorsForm.contacts"
    >
      Введите контакты пользователя
    </BaseInput>
    <BaseInput
      type="textarea"
      id="description"
      v-model:data="form.description"
      :errors="errorsForm.description"
    >
      Введите контакты пользователя
    </BaseInput>
    <BaseButton> Отправить </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import { REPORT, SEND_REPORT } from "@/helper/strings";
import api from "@/Api";
import type { Report } from "@/helper/types";
import { validate, isEmpty } from "@/helper/validators";
import { useToastsStore } from "@/stores/toasts";
const { addToast } = useToastsStore();
const emits = defineEmits<{
  setMenu: [tab: string];
}>();
const getForm = () => {
  return toRaw(form);
};
const form = reactive({ contacts: "", description: "" } as Report);
const errorsForm = ref({} as Partial<Report>);
const submitForm = () => {
  let { errors, isValid } = validate(toRaw(form), {
    contacts: [isEmpty],
    description: [isEmpty],
  });
  errorsForm.value = errors;
  if (isValid) {
    api.post(REPORT, getForm()).then(() => {
      emits("setMenu", "main");
      addToast(SEND_REPORT, 2000);
    });
  }
};
</script>

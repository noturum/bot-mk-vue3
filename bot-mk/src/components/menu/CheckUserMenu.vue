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
  <div>
    <div v-if="!reviews.length">Нет результатов</div>
    <ReviewCard v-for="revies in reviews" :review="revies"> </ReviewCard>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import ReviewCard from "../common/ReviewCard.vue";
import type { CheckUser, Review } from "@/helper/types";
import { validate, isEmpty } from "@/helper/validators";
import api from "@/Api";
import { CHECK_USER } from "@/helper/strings";
const emits = defineEmits<{
  setMenu: [];
}>();
const reviews = ref<Review[]>([]);
const getForm = () => {
  return toRaw(form);
};
const form = reactive({ user: "" } as CheckUser);
const errorsForm = ref({} as Partial<CheckUser>);
const submitForm = () => {
  let { errors, isValid } = validate(form, {
    user: [isEmpty],
  });
  errorsForm.value = errors;
  if (isValid) {
    api.post<Review[]>(CHECK_USER, getForm()).then((response) => {
      reviews.value = response;
    });
  }
};
</script>

<template>
  <div
    class="container d-flex flex-column justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="mb-5 text-center d-flex align-content-center">
      Упс, у вас блокировка.
    </div>
    <form
      id="createForm d-flex"
      class="mb-4 w-100"
      @submit.prevent="submitForm"
    >
      <BaseInput
        type="textarea"
        id="description"
        v-model:data="form.code"
        :errors="errorsForm.code"
      >
        Запросите код у администратора!
      </BaseInput>
      <BaseButton> Отправить </BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import type { UnblockCode, User } from "@/helper/types";
import { validate, isEmpty } from "@/helper/validators";
import api from "@/Api";
import { UNBLOCK } from "@/helper/strings";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const getForm = () => {
  return toRaw(form);
};
const form = reactive({ code: "" } as UnblockCode);
const errorsForm = ref({} as Partial<UnblockCode>);
const submitForm = () => {
  let { errors, isValid } = validate(toRaw(form), {
    code: [isEmpty],
  });
  errorsForm.value = errors;
  if (isValid) {
    api
      .post<User>(UNBLOCK, getForm())
      .then((response) => {
        userStore.user = response;
      })
      .catch((err) => {
        errorsForm.value = err;
      });
  }
};
</script>

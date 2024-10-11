<template>
  <form id="createForm" class="mb-4 w-100" @submit.prevent="submitForm">
    <div class="mb-3 position-relative">
      <input class="form-control" id="id" name="id" type="hidden" value="" />
      <div class="invalid-feedback id" style="display: none"></div>
    </div>
    <BaseSelect id="mode" :options="selectOptions" v-model:data="form.mode">
      Вид заявки
    </BaseSelect>
    <BaseInput
      type="search"
      id="city-in"
      :errors="errorsForm.cityIn"
      v-model:data="form.cityIn"
    >
      Город отправки
      <template v-if="form.mode == 'DELY'" #append>
        <div class="mb-3 mt-3">
          <button
            type="button"
            class="btn btn-secondary add_transfer"
            @click="addTransfer"
          >
            Добавить пересадку
          </button>
        </div>
        <div class="mb-3 position-relative" v-for="index in countTransfer">
          <div class="position-relative transfer-form">
            <label class="form-label" for="transfer_city"
              >Город пересадки</label
            >
            <div class="d-flex mt-1">
              <input
                class="form-control transfer-city"
                :name="'transfer' + index"
                type="search"
                :id="'transfer' + index"
                dropdown="#dropdownListTransfer"
                v-model="form.transfers[index - 1]"
              />
              <button
                type="button"
                class="btn remove_transfer ml-2"
                @click="deleteTransfer(index - 1)"
              >
                X
              </button>
            </div>
            <div
              class="datalist"
              id="dropdownListTransfer"
              style="display: none"
            ></div>
          </div>
        </div>
      </template>
    </BaseInput>
    <BaseInput
      type="date"
      id="date-in"
      v-model:data="form.dateIn"
      :errors="errorsForm.dateIn"
    >
      Дата отправки
    </BaseInput>
    <BaseInput
      :errors="errorsForm.cityTo"
      type="search"
      id="city-to"
      v-model:data="form.cityTo"
      :datalist="cities"
    >
      Город доставки
    </BaseInput>
    <BaseInput
      type="textarea"
      id="contacts"
      v-model:data="form.contacts"
      :errors="errorsForm.contacts"
    >
      Контакты
    </BaseInput>
    <BaseInput
      type="textarea"
      id="description"
      v-model:data="form.description"
      :errors="errorsForm.description"
    >
      Описание
    </BaseInput>

    <BaseButton> Отправить </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, toRaw, ref } from "vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import type { CreateRequest, ErrorRequest } from "@/helper/types";
import { useCitiesStore } from "@/stores/cities";
import BaseSelect from "../common/BaseSelect.vue";
import { validate, isEmpty, isExpired, isInData } from "@/helper/validators";
const { cities } = useCitiesStore();
const errorsForm = ref({} as ErrorRequest);
const selectOptions = {
  SEND: "Хочу отправить",
  DELY: "Могу доставить",
};
const form = reactive({
  cityIn: "",
  cityTo: "",
  contacts: "",
  description: "",
  mode: "SEND",
  transfers: [],
} as CreateRequest);
const log = () => {
  console.log(form);
};
const countTransfer = computed(() => form.transfers.length);

const addTransfer = () => {
  if (countTransfer.value < 3) form.transfers.push("");
};
const deleteTransfer = (ind: number) => {
  form.transfers?.splice(ind, 1);
};
const submitForm = () => {
  let { errors, isValid } = validate(form, {
    cityIn: isEmpty,
    cityTo: isEmpty,
    dateIn: isExpired,
    contacts: isEmpty,
    description: isEmpty,
  });
  errorsForm.value = errors;
  if (isValid) console.log("valid");
};
const getForm = () => {
  console.log(toRaw(form));
};
</script>

<template>
  <form id="createForm" class="mb-4 w-100" @submit.prevent="submitForm">
    <div class="mb-3 position-relative">
      <input
        class="form-control"
        id="id"
        name="id"
        type="hidden"
        v-model="form.id"
      />
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
      :datalist="cities"
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
        <InputTransfer
          @click="deleteTransfer(index - 1)"
          :name="'transfer' + index"
          :datalist="cities"
          v-for="index in countTransfer"
          v-model:data="form.transfers[index - 1].city"
          v-model:transfer-id="form.transfers[index - 1].id"
          :errors="
            errorsForm.transfers
              ? errorsForm.transfers[index - 1]
              : undefined
          "
        >
        </InputTransfer>
        <!-- <div class="mb-3 position-relative" v-for="index in countTransfer">
          <div class="position-relative transfer-form">
            <label class="form-label" for="transfer_city"
              >Город пересадки</label
            >
            <div class="d-flex mt-1 align-items-start">
              <input
                class="form-control"
                id="id-transfer"
                name="id-transfer"
                type="hidden"
                v-model="form.transfers[index - 1].id"
              />
              <BaseInput
                :errors="
                  errorsForm.transfers && errorsForm.transfers.length > 0
                    ? errorsForm.transfers[index - 1]
                    : undefined
                "
                type="search"
                :id="'transfer' + index"
                v-model:data="form.transfers[index - 1].city"
                :datalist="cities"
              ></BaseInput>
              <button
                type="button"
                class="btn remove_transfer ml-2"
                @click="deleteTransfer(index - 1)"
              >
                X
              </button>
            </div>
          </div>
        </div> -->
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
import api from "@/Api";
import InputTransfer from "../common/InputTransfer.vue";
import BaseInput from "../common/BaseInput.vue";
import BaseButton from "../common/BaseButton.vue";
import type { Request, Transfer, ErrorRequest } from "@/helper/types";
import { useRequestStore } from "@/stores/request";
import { useCitiesStore } from "@/stores/cities";
import { useToastsStore } from "@/stores/toasts";
import BaseSelect from "../common/BaseSelect.vue";
import { validate, isEmpty, isExpired, isInData } from "@/helper/validators";
const { addToast } = useToastsStore();
const { cities } = useCitiesStore();
const requestStore = useRequestStore();
const errorsForm = ref({} as ErrorRequest);
const selectOptions = {
  SEND: "Хочу отправить",
  DELY: "Могу доставить",
};
const form = requestStore.requestForm;
const emits = defineEmits<{
  setMenu: [tab: string];
}>();
const countTransfer = computed(() => form.transfers?.length);

const addTransfer = () => {
  if (countTransfer.value < 3)
    form.transfers.push({ city: "" });
};
const deleteTransfer = (ind: number) => {
  form.transfers?.splice(ind, 1);
};
const submitForm = () => {
  let { errors, isValid } = validate(toRaw(form), {
    cityIn: [isEmpty, [isInData, cities]],
    cityTo: [isEmpty, [isInData, cities]],
    dateIn: [isExpired],
    contacts: [isEmpty],
    description: [isEmpty],
    transfers: [[isEmpty,'city']],
  });
  errorsForm.value = errors;
  if (isValid)
    api.post("/create_request", getForm()).then(() => {
      emits("setMenu", "main");
      addToast("Create Request", 2000);
      requestStore.clearForm();
    });
};
const getForm = () => {
  return toRaw(form);
};
</script>

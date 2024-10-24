<template>
  <div class="container mt-5" v-show="!openResult">
    <form id="search-form" @submit.prevent="submitForm">
      <div class="form-row">
        <BaseSelect id="mode" :options="selectOptions" v-model:data="form.mode">
          Найти
        </BaseSelect>
        <BaseInput
          id="cityIn"
          type="search"
          v-model:data="form.cityIn"
          :errors="errorsForm.cityIn"
        >
          Город отправки
        </BaseInput>
        <BaseInput
          id="dateIn"
          type="date"
          v-model:data="form.dateIn"
          :errors="errorsForm.dateIn"
        >
          Дата отправки
        </BaseInput>
        <BaseInput
          id="cityTo"
          type="search"
          v-model:data="form.cityTo"
          :errors="errorsForm.cityTo"
        >
          Город прибытия
        </BaseInput>

        <BaseButton> Отправить </BaseButton>
      </div>
    </form>
    <BaseButton @click="openMyRequest"> Вставить из заявки </BaseButton>
  </div>

  <BaseModal name="myRequests" style="display: block">
    <h2 style="z-index: 2000">Мои заявки</h2>
    <div
      class="modal-content d-flex flex-row justify-content-center overflow-auto"
    >
      <BaseCardRequest
        v-for="request in userStore.requests"
        :request="request"
        @click="setForm(request)"
      >
      </BaseCardRequest>
    </div>
  </BaseModal>

  <div id="results" class="container" v-show="openResult">
    <div class="container flight-route-container">
      <div
        class="route-display d-flex align-items-start justify-content-evenly overflow-hidden"
      >
        <div class="city-info">
          <p class="city-in">{{ form.cityIn }}</p>
          <div class="route-dots">
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
        </div>
        <img class="trip-icon" :class="form.mode == 'DELY' ? 'dely' : 'send'" />
        <div class="city-info">
          <div class="route-dots">
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
          <p class="city-to">{{ form.cityTo }}</p>
        </div>
      </div>

      <button
        @click="openResult = false"
        class="unwrap-button"
        id="unwrap-button"
      >
        <img class="unwrap-icon" alt="" />
      </button>
    </div>
    <div class="separator mt-3"></div>
    <div
      class="card-container flex-column align-self-center"
      id="card-container"
    >
      <div v-if="!searchResults.length" class="card-custom mb-3">
        <div class="card-body">
          <h5 class="card-title">Нет подходящих заявок</h5>
        </div>
        <BaseButton @click="createRequest(getForm())">
          Создать заявку
        </BaseButton>
      </div>
      <BaseCardRequest v-for="request in searchResults" :request="request">
        <template #buttons>
          <ActionsButton
            class="left-btn"
            @click="acceptRequest(request)"
            ico="accept"
          ></ActionsButton>
        </template>
      </BaseCardRequest>
    </div>
  </div>
  <BaseModal style="display: block" name="acceptRequest">
    <div class="p-5 w-75 z-3">
      <h4 class="d-flex justify-content-center">
        Для продолжения, нужно создать заявку
      </h4>
      <div class="modal-content d-flex flex-row justify-content-center">
        <BaseButton class="m-3" @click="closeModal('acceptRequest')"
          >Отмена</BaseButton
        >

        <BaseButton class="m-3" @click="createRequest(selectRequest)"
          >Создать</BaseButton
        >
      </div>
    </div>
  </BaseModal>
</template>
<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
import BaseInput from "../common/BaseInput.vue";
import BaseSelect from "../common/BaseSelect.vue";
import BaseModal from "../common/BaseModal.vue";
import BaseCardRequest from "../common/BaseCardRequest.vue";
import { useUserStore } from "@/stores/user";
import type { SearchRequest } from "@/helper/types";
import type { Request } from "@/helper/types";
import { useRequestStore } from "@/stores/request";
import { reactive, ref, computed, toRaw } from "vue";
import { isEmpty, isExpired, validate } from "@/helper/validators";
import { useModalStore } from "@/stores/modal";
import api from "@/Api";
import ActionsButton from "../common/ActionsButton.vue";
const requestStore = useRequestStore();
let selectRequest: Request | undefined = undefined;
const acceptRequest = (request: Request) => {
  selectRequest = request;
  openModal("acceptRequest");
};
const emits = defineEmits<{
  setMenu: [key: string];
}>();
const { openModal, closeModal } = useModalStore();
const userStore = useUserStore();

const openResult = ref(false);
const searchResults = ref<Request[]>([]);
const { getRequest } = userStore;
const openMyRequest = () => {
  openModal("myRequests");
  if (!userStore.requests.length) getRequest();
};
const setForm = (request: Request) => {
  form.cityIn = request.cityIn;
  form.cityTo = request.cityTo;
  form.dateIn = request.dateIn;
  closeModal("myRequests");
};

const form = reactive({
  mode: "DELY",
  cityIn: "",
  cityTo: "",
  dateIn: "",
} as SearchRequest);
const errorsForm = ref({} as Partial<SearchRequest>);
const getForm = () => {
  return toRaw(form);
};
const submitForm = () => {
  let { errors, isValid } = validate(form, {
    cityIn: [isEmpty],
    cityTo: [isEmpty],
    dateIn: [isEmpty, isExpired],
  });
  errorsForm.value = errors;
  if (isValid) {
    console.log("valid");
    api.post<Request[]>("/search", getForm()).then((response) => {
      searchResults.value = response;
      openResult.value = true;
    });
  }
};
const createRequest = (form: any) => {
  closeModal("acceptRequest");
  form.id = undefined;
  form.mode = form.mode == "DELY" ? "SEND" : "DELY";
  requestStore.toForm(form);
  emits("setMenu", "createRequest");
};
const selectOptions = {
  SEND: "Отправителя",
  DELY: "Доставщика",
};
</script>

<template>
  <div class="container mt-5" v-show="!openResult">
    <form id="search-form" @submit.prevent="validate">
      <div class="form-row">
        <BaseSelect id="mode" :options="selectOptions" v-model:data="form.mode">
          Найти
        </BaseSelect>
        <BaseInput id="cityIn" type="search" v-model:data="form.cityIn">
          Город отправки
        </BaseInput>
        <BaseInput id="cityTo" type="search" v-model:data="form.cityTo">
          Город прибытия
        </BaseInput>
        <BaseInput id="dateIn" type="date" v-model:data="form.dateIn">
          Город прибытия
        </BaseInput>
        <BaseButton @click="getSearch(form), (openResult = !openResult)">
          Отправить
        </BaseButton>
      </div>
    </form>
    <BaseButton @click="showRequestModal = true">
      Вставить из заявки
    </BaseButton>
  </div>
  <Teleport to="body">
    <BaseModal
      v-if="showRequestModal"
      style="display: block"
      @click.self="showRequestModal = false"
    >
      <h2 style="z-index: 2000">Мои заявки</h2>
      <div
        class="modal-content d-flex flex-row justify-content-center overflow-auto"
      >
        <BaseCardRequest
          v-for="request in requests"
          :request="request"
          :keys="[]"
          @click="setForm(request)"
        >
        </BaseCardRequest>
      </div>
    </BaseModal>
  </Teleport>

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
        <img class="trip-icon" alt="Plane icon" />
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

      <button class="unwrap-button" id="unwrap-button">
        <img class="unwrap-icon" alt="" />
      </button>
    </div>
    <div class="separator mt-3"></div>
    <div
      class="card-container flex-column align-self-center"
      id="card-container"
    ></div>
  </div>

  <div
    class="modal fade"
    id="seach_request"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
    <div
      class="modal-dialog h-100 container d-flex align-items flex-column justify-content-center"
    >
      <h4 class="d-flex justify-content-center">
        Для продолжения, нужно создать заявку
      </h4>
      <div class="modal-content d-flex flex-row justify-content-center">
        <button type="button" class="btn-custom me-2" data-bs-dismiss="modal">
          Отмена
        </button>
        <button
          type="button"
          class="btn-custom accept-request"
          data-bs-dismiss="modal"
        >
          Создать
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
import BaseInput from "../common/BaseInput.vue";
import BaseSelect from "../common/BaseSelect.vue";
import BaseModal from "../common/BaseModal.vue";
import BaseCardRequest from "../common/BaseCardRequest.vue";
import { useRequestStore } from "@/stores/request";
import { useSearchStore } from "@/stores/search";
import type { SearchRequest } from "@/helper/types";
import type { Request } from "@/helper/types";
import { reactive, ref } from "vue";
const showRequestModal = ref(false);
const openResult = ref(false);
const { getSearch } = useSearchStore();
const { requests } = useRequestStore();
const setForm = (request: Request) => {
  console.log(request.cityIn)
  form.cityIn = request.cityIn;
  form.cityTo = request.cityTo;
  form.dateIn = request.dateIn;
  showRequestModal.value = false;
};
const validate = () => {};
const form = reactive({
  mode: "DELY",
} as SearchRequest);
const selectOptions = {
  SEND: "Отправителя",
  DELY: "Доставщика",
};
</script>

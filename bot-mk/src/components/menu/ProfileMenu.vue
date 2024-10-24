<template>
  <BaseModal name="sure" style="display: block">
    <h4 class="d-flex justify-content-center z-2">Потвердите удаление</h4>
    <div class="modal-content d-flex flex-row justify-content-center">
      <BaseButton class="m-3" @click="closeModal('sure')">Отмена</BaseButton>
      <BaseButton class="m-3" @click="removeRequest(user.activeRequestId())"
        >Удалить</BaseButton
      >
    </div>
  </BaseModal>

  <div class="title mb-3">Активная заявка</div>
  <div
    class="carousel d-flex w-100 overflow-hidden"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <BaseCardRequest
      class="w-100 carousel-container"
      :style="{ transform: `translateX(${currentTranslateX}px)` }"
      v-for="(request, index) in user.requests"
      :ref="(el) => (requestCards[index] = el)"
      :request="request"
      v-if="user.requests.length > 0"
    >
      <template #buttons>
        <ActionsButton
          @click="editRequest(request)"
          class="left-btn"
          :request-id="request.id"
          ico="edit"
        />
        <ActionsButton
          @click="openModal('sure')"
          class="right-btn"
          :request-id="request.id"
          ico="remove"
        />
      </template>
    </BaseCardRequest>

    <div
      @click="emits('setMenu', 'createRequest')"
      v-else
      class="active-request empty container d-flex flex-column justify-content-center"
    >
      <div class="d-flex">
        <p>+ Добавить заявку</p>
      </div>
    </div>
  </div>

  <div class="my-request container d-flex justify-content-center">
    <ul class="nav nav-underline d-flex justify-content-evenly">
      <TabNav
        v-for="link in navLinks()"
        :count="getCount(link)"
        :is-active="activeLink === link"
        @click="setLink(link)"
      >
        {{ TABS_LINK[link] }}
      </TabNav>
    </ul>
  </div>

  <div class="container profile-data mt-2 overflow-auto">
    <component
      v-if="activeLink == 'archive'"
      :is="tabs[activeLink]"
      @set-menu="(tab:string)=>emits('setMenu',tab)"
    ></component>
    <component v-else :is="tabs[activeLink]"></component>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import BaseCardRequest from "../common/BaseCardRequest.vue";
import TabNav from "../tabs/TabNav.vue";
import { getTabs } from "../tabs/tabs";
import { TABS_LINK, REMOVE_REQUEST } from "@/helper/strings";
import ActionsButton from "../common/ActionsButton.vue";
import type { Deals, Request, Review } from "@/helper/types";
import { useRequestStore } from "@/stores/request";
import api from "@/Api";
import BaseModal from "../common/BaseModal.vue";
import BaseButton from "../common/BaseButton.vue";
import { useModalStore } from "@/stores/modal";
const { openModal, closeModal } = useModalStore();
const requestStore = useRequestStore();
const emits = defineEmits<{
  setMenu: [tab: string];
}>();
const editRequest = (request: Request) => {
  requestStore.toForm(request);
  emits("setMenu", "createRequest");
};
const getCount = (tab: string) => {
  switch (tab) {
    case "deals":
      return user.getCountNew<Deals>(user.deals);
    case "suggestion":
      return user.getCountNew<Request>(user.suggestions);
    case "reviews":
      return user.getCountNew<Review>(user.reviewsByMe);
  }
};
const removeRequest = (requestId: number | undefined) => {
  closeModal("sure");
  api.delete(REMOVE_REQUEST + requestId).then(() => {
    user.getRequest();
    user.getDeals();
  });
};
const tabs: { [key: string]: any } = getTabs();
const navLinks = () => {
  return Object.keys(tabs);
};
const activeLink = ref("deals");
const user = useUserStore();
const setLink = (link: string) => {
  activeLink.value = link;
};
const requestCards = ref<any[]>([]);
const currentTranslateX = ref(0);
const cardWidth = ref(300);
let startX = 0;

const updateTranslateX = () => {
  currentTranslateX.value = -user.activeRequest * cardWidth.value;
};

const onTouchStart = (e: TouchEvent) => {
  startX = e.touches[0].clientX;
};

const onTouchMove = (e: TouchEvent) => {
  const currentX = e.touches[0].clientX;
  const diffX = currentX - startX;

  if (diffX < -200) {
    goNext();
    startX = currentX;
  }

  if (diffX > 200) {
    goPrev();
    startX = currentX;
  }
};

const onTouchEnd = () => {
  startX = 0;
};

const goNext = () => {
  if (user.activeRequest < user.requests.length - 1) {
    user.activeRequest++;
    updateTranslateX();
  }
};

const goPrev = () => {
  if (user.activeRequest > 0) {
    user.activeRequest--;
    updateTranslateX();
  }
};
onMounted(() => {
  user.getRequest().finally(() => {
    if (user.requests.length) {
      user.loadMyProfile();
      cardWidth.value = requestCards.value[0].$el.offsetWidth;
    }
  });
});
</script>
<style scoped>
.carousel-container {
  display: flex;
  transition: transform 1s ease;
}
.card-container {
  min-width: 100%;
}
</style>

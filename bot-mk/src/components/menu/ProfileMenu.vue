<template>
  <div class="modal fade">
    <div
      class="modal-dialog h-100 container d-flex align-items flex-column justify-content-center"
    >
      <h4 class="d-flex justify-content-center">Потвердите удаление</h4>
      <div class="modal-content d-flex flex-row justify-content-center">
        <button type="button" class="btn-custom me-2" data-bs-dismiss="modal">
          Отмена
        </button>
        <button
          type="button"
          class="btn-custom remove-request"
          data-bs-dismiss="modal"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>

  <div class="title mb-3">Активная заявка</div>
  <BaseCardRequest
    :request="user.myRequest[0]"
    :keys="[]"
    v-if="user.myRequest.length > 0"
  >
    <template #buttons>
      <ActionsButton
        @click="editRequest(user.myRequest[0])"
        class="left-btn"
        :request-id="user.myRequest[0].id"
        ico="edit"
      />
      <ActionsButton
        @click="removeRequest(user.myRequest[0])"
        class="right-btn"
        :request-id="user.myRequest[0].id"
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
  <div class="my-request container d-flex justify-content-center">
    <ul class="nav nav-underline d-flex justify-content-evenly">
      <TabNav
        v-for="link in navLinks()"
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
import type { Request } from "@/helper/types";
import { useRequestStore } from "@/stores/request";
import api from "@/Api";
const requestStore = useRequestStore();
const emits = defineEmits<{
  setMenu: [tab: string];
}>();
const editRequest = (request: Request) => {
  requestStore.toForm(request);
  emits("setMenu", "createRequest");
};
const removeRequest = (request: Request) => {
  api.delete(REMOVE_REQUEST + request.id).then(() => user.getMyRequest());
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
onMounted(() => {
  user.getMyRequest();
});
</script>

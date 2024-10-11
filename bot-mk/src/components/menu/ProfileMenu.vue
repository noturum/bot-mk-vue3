<template>
  <div
    class="modal fade"
    id="notsure"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
  >
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
    :request="myRequest[0]"
    :keys="[]"
    v-if="myRequest.length > 0"
  />

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
    <component :is="tabs[activeLink]"></component>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import BaseCardRequest from "../common/BaseCardRequest.vue";
import TabNav from "../tabs/TabNav.vue";
import { getTabs } from "../tabs/tabs";
import { TABS_LINK } from "@/helper/strings";

const emits = defineEmits<{
  setMenu: [tab: string];
}>();
const tabs: { [key: string]: any } = getTabs();
const navLinks = () => {
  return Object.keys(tabs);
};
const activeLink = ref("deals");
const { myRequest, getMyRequest } = useUserStore();
const setLink = (link: string) => {
  activeLink.value = link;
};
onMounted(() => {
  getMyRequest();
});
</script>

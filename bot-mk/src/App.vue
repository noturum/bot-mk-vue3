<template>
  <Teleport to="body"><BaseToast /></Teleport>
  <component v-if="userStore.user.blocked" :is="menues['block']" />
  <component v-else-if="userStore.error" :is="menues['error']" />
  <div
    v-else
    class="container welcome-container d-flex flex-column align-items-center justify-content-start mx-auto pt-5 overflow-auto"
  >
    <div class="nav-btn ml-4 d-flex w-100" v-if="showNav">
      <img
        loading="lazy"
        class="logo back_btn"
        @click="linkNavMenu(lastMenu)"
      />
      <h5 class="title text-center align-items-center w-auto mt-2 flex-grow-1">
        {{ title }}
      </h5>
    </div>
    <div
      class="container mt-4 d-flex flex-column align-items-center overflow-auto"
      id="content"
    >
      <component :is="menues[activeMenu]" @set-menu="linkNavMenu"></component>
    </div>

    <nav class="navigation navbar fixed-bottom d-flex justify-content-between">
      <BaseNavElement
        id="main-link"
        :icon="getIconUrl('main_icon.svg')"
        :is-active="activeMenu === 'main'"
        @click="linkNavMenu('main')"
      />
      <BaseNavElement
        id="my-profile-link"
        :icon="getIconUrl('profile_icon.svg')"
        :is-active="activeMenu === 'profile'"
        :notify="userStore.notify"
        @click="linkNavMenu('profile')"
      />
      <BaseNavElement
        id="reviews-link"
        :icon="getIconUrl('reviews_icon.svg')"
        :is-active="activeMenu === 'review'"
        @click="linkNavMenu('review')"
      />
      <BaseNavElement
        id="support-link"
        :icon="getIconUrl('help_icon.svg')"
        :is-active="activeMenu === 'support'"
        @click="linkNavMenu('support')"
      />
    </nav>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import BaseNavElement from "@/components/common/BaseNavElement.vue";
import BaseToast from "@/components/common/BaseToast.vue";
import { getMenues } from "./components/menu/Menues";
import { useTelegramStore } from "./stores/telegram";
import { useUserStore } from "./stores/user";
import { useCitiesStore } from "./stores/cities";
import { MENU_TITLES } from "./helper/strings";
const { getCities } = useCitiesStore();
const userStore = useUserStore();
const telegram = useTelegramStore();
const showNav = ref(false);
const title = ref("");
const lastMenu = ref();
const activeMenu = ref<string>("main");
const menues: { [key: string]: any } = getMenues();
const linkNavMenu = (tab: string) => {
  activeMenu.value = tab;
  showNav.value = activeMenu.value != "main";
  title.value = MENU_TITLES[tab];
};

const getIconUrl = (iconName: string) => {
  return `/src/assets/${iconName}`;
};
watch(activeMenu, (_, old) => {
  lastMenu.value = old;
});
onMounted(() => {
  const initData = { id: 23 };
  if (initData) {
    telegram.initData = initData;
    userStore.auth(initData.id);
    getCities();
  }
});
</script>

<style scoped></style>

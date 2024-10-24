import { ref } from "vue";
import { defineStore } from "pinia";
import type { InitData } from "@/helper/types";

export const useTelegramStore = defineStore("data", () => {
  const initData = ref<InitData>({} as InitData);
  const webApp = ref();
  const loadTelegram = () => {
    webApp.value = window.Telegram?.WebApp;
    initData.value = window.Telegram?.WebApp.initDataUnsafe;
  };
  return { initData, loadTelegram, webApp };
});

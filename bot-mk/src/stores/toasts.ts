import { ref } from "vue";
import { defineStore } from "pinia";
export interface Toast {
  text: string;
  time: number;
}
export const useToastsStore = defineStore("toasts", () => {
  const toasts = ref<Toast[]>([]);
  function addToast(text: string, time: number) {
    toasts.value.push({ text: text, time: time });
    setTimeout(() => {
      toasts.value.shift();
    }, time);
  }

  return { toasts, addToast };
});

import { defineStore } from "pinia";
import { ref } from "vue";
interface Modal {
  name: string;
  isVisible: boolean;
}
export const useModalStore = defineStore("modal", () => {
  const modals = ref<Modal[]>([]);
  const index = (name: string) => {
    return modals.value.findIndex((el) => {
      return el.name == name;
    });
  };
  function registerModal(name: string) {
    if (index(name) == -1) modals.value.push({ name: name, isVisible: false }); 
  }
  function openModal(name: string) {
    modals.value[index(name)].isVisible = true;
  }

  function closeModal(name: string) {
    modals.value[index(name)].isVisible = false;
  }
  function isVisible(name: string) {
    return modals.value[index(name)]?.isVisible;
  }

  return { modals, isVisible, registerModal, openModal, closeModal };
});


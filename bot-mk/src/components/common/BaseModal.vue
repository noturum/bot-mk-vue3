<template>
  <div
    v-if="isVisible(props.name)"
    class="position-fixed z-3  h-100 top-0 overflow-hidden"
    @click.self="closeModal(props.name)"
  >
    <div
      class=" h-100 d-flex justify-content-center align-items-center flex-column"
    >
      <div
        class="w-100 h-100 position-absolute"
        style="background-color: #000000d4"
      />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useModalStore } from "@/stores/modal";
const props = defineProps<{ name: string }>();
const modalStore = useModalStore();
const { isVisible, closeModal } = modalStore;
modalStore.registerModal(props.name);
</script>

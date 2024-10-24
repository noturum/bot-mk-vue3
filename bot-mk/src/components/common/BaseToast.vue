<template>
  <Teleport to="body">
    <div
      class="align-items-center position-absolute w-auto start-50 top-0 translate-middle-x mt-4 z-2"
    >
      <div
        v-for="toast in toastStore.toasts"
        class="mb-2 notify p-2 text-center"
      >
        <div class="toast-body">
          {{ toast.text }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastsStore } from "@/stores/toasts";
const toastStore = useToastsStore();
const emits = defineEmits<{
  click: [];
}>();
</script>
<style scoped></style>

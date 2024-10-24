<template>
  <div
    class="nav-item d-flex flex-column align-items-center position-relative"
    :class="{ active: isActive }"
    @click="emits('click')"
  >
    <span
      v-if="notify"
      class="position-absolute top-0 start-100 translate-middle p-1  rounded-circle"
      style="background-color: #495057;"
    ></span>
    <img loading="lazy" :src="icon" class="nav-icon" alt="Navigation icon" />
    <div class="nav-indicator" :class="{ active: isActive }"></div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  click: [];
}>();
defineProps<{
  icon: string;
  isActive: boolean;
  notify?: boolean;
}>();
</script>
<style scoped></style>
d

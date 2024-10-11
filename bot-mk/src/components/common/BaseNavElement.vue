<template>
  <div
    class="nav-item d-flex flex-column align-items-center"
    :class="{ active: isActive }"
    @click="emits('click')"
  >
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
}>();
</script>
<style scoped></style>

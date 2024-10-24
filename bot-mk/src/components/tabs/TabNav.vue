<template>
  <li class="nav-item position-relative d-flex justify-content-center align-items-center">
    
    <a class="nav-link me-2" :class="{ active: isActive }" @click="emits('click')">
      <slot />
    </a>
    <span
      v-if="props.count"
      class="badge text-lg-center bg-gradient"
      >{{count}}</span
    >
  </li>
</template>
<script setup lang="ts">
const props = defineProps<{
  isActive: boolean;
  count?: number;
}>();
const emits = defineEmits<{
  click: [];
}>();
</script>

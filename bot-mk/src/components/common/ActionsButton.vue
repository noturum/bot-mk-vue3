<template>
  <button @click="emits('click')" class="action-btn" :request-id="requestId">
    <i :class="ico"></i>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  requestId?: number;
  ico: string;
}>();
const emits = defineEmits<{
  click: [];
}>();
</script>

<template>
  <div v-if="!suggestions || suggestions?.length==0">Нет предложений</div>
  <BaseCardRequest v-for="deal in suggestions" :request="deal" :keys="[]">
  </BaseCardRequest>
</template>

<script setup lang="ts">
import BaseCardRequest from "@/components/common/BaseCardRequest.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
const { getSuggestion, suggestions } = useUserStore();
onMounted(() => {
  getSuggestion();
});
</script>

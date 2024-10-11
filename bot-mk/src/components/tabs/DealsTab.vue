<template>
  <div v-if ="!myDeals || myDeals?.length==0">Нет активных сделок</div>
  <BaseCardRequest v-for="deal in myDeals" :request="deal" :keys="[]">
  </BaseCardRequest>
</template>

<script setup lang="ts">
import BaseCardRequest from "@/components/common/BaseCardRequest.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
const { getDeals, myDeals } = useUserStore();
onMounted(() => {
  getDeals();
});
</script>

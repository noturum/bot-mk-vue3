<template>
  <div v-if="!reviewsByMe || reviewsByMe?.length == 0">Нет отзывов</div>
  <div v-for="deal in reviewsByMe">
    {{ deal.date }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
const { getReviewsByMe, reviewsByMe } = useUserStore();
onMounted(() => {
  getReviewsByMe();
});
</script>

<template>
  <div v-if="!userStore.reviewsByMe || userStore.reviewsByMe?.length == 0">
    Нет отзывов
  </div>
  <div v-for="review in userStore.reviewsByMe">
    <ReviewCard :review="review"> </ReviewCard>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import ReviewCard from "../common/ReviewCard.vue";
import { onMounted } from "vue";
const userStore = useUserStore();
const { getReviewsByMe } = userStore;
onMounted(() => {
  getReviewsByMe();
});
</script>

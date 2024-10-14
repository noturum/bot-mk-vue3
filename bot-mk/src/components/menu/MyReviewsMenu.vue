<template>
  <div>
    <div v-if="!userStore.myReviews.length">Нет отзывов</div>
    <ReviewCard v-else v-for="review in userStore.myReviews" :review="review">
    </ReviewCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ReviewCard from "../common/ReviewCard.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { getMyReviews } = userStore;
onMounted(() => {
  getMyReviews();
});
</script>

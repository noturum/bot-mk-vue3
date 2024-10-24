<template>
  <div class="w-100">
    <div v-if="!userStore.reviews.length">Нет отзывов</div>
    <ReviewCard v-else v-for="review in userStore.reviews" :review="review">
      <template #buttons>
        <ActionsButton class="right-btn" ico="accept">
        </ActionsButton>
        <ActionsButton class="left-btn" ico="remove">
        </ActionsButton>
      </template>
    </ReviewCard>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ActionsButton from "../common/ActionsButton.vue";
import ReviewCard from "../common/ReviewCard.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { getReviews } = userStore;
onMounted(() => {
  getReviews();
});
</script>

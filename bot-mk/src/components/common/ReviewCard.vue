<template>
  <div class="review-card mb-3" style="max-width: 400px; margin: auto">
    <p class="card-text p-2">
      Контакт пользователя:{{ props.review.contacts }} Отзыв:{{
        props.review.description
      }}
    </p>
    <div class="btn-group d-flex justify-content-between">
      <slot name="buttons" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Review } from "@/helper/types";
const props = defineProps<{
  review: Review;
}>();
</script>

<template>
  <div class="review-card mb-3 w-100" style="min-width: 200px;">
    <div class ="d-flex flex-row p-2">
      <span class = "contact-icon"></span>
      <p class="card-text p-2">
      {{ props.review.contacts }}
    </p></div>
    <div class ="d-flex flex-row ps-2">
      <span class = "description-icon"></span>
      <p class="card-text ps-2">
      {{ props.review.description }}
    </p></div>
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
<style scoped>
</style>

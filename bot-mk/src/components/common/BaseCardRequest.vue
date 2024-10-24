<template>
  <div class="card-container flex-column align-self-center mb-5 w-100">
    <div
      class="card-header-custom d-flex justify-content-between align-items-center"
    >
      <img
        loading="lazy"
        class="trip-icon"
        :class="request.mode == 'DELY' ? 'dely' : 'send'"
        alt="Trip icon"
      />
      <div class="card-info text-center flex-grow-1">
        <p class="card-title-custom mb-0">
          {{ request.cityIn }} - {{ request.cityTo }}
        </p>
        <p class="card-date mb-0">{{ request.dateIn }}</p>
      </div>
      <span v-if="request.new" class="rounded-circle p-1 bg-info"></span>
    </div>
    <div class="card-details">
      <p v-if="request.status" class="card-description text-center">
        {{ statusDescription(request.status) }}
      </p>
      <p class="card-description ms-2">
        <img class="description-icon me-2" />
        {{ request.description }}
      </p>
      <p v-if="showContacts" class="card-contact ms-2">
        <img class="contact-icon me-2" />{{ request.contacts }}
      </p>
      <div class="btn-group d-flex justify-content-center position-relative">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Deals, Request } from "@/helper/types";
const statusDescription = (status: string) => {
  switch (status) {
    case "SEND":
      return "Заявка отправлена";
    case "ACCEPTED":
      return "Заявка принята";
    case "CANCELED":
      return "Заявка отклонена";
  }
};
const props = defineProps<{
  request: any;
  showContacts?: boolean;
}>();
</script>
<style scoped>
</style>
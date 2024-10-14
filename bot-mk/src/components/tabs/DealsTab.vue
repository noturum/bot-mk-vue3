<template>
  <div v-if="!userStore.myDeals || userStore.myDeals?.length == 0">
    Нет активных сделок
  </div>
  <BaseCardRequest
    :show-contacts="deal.status == 'ACCEPTED'"
    v-for="deal in userStore.myDeals"
    :request="deal"
  >
    <template v-if="deal.role == 'receiver'" #buttons>
      <ActionsButton
        v-if="deal.status == 'SEND'"
        class="right-btn"
        ico="accept"
      ></ActionsButton>
      <ActionsButton
        v-if="deal.status == 'SEND'"
        class="left-btn"
        ico="cancel"
      ></ActionsButton>
    </template>
    <template v-if="deal.role == 'sender'" #buttons>
      <ActionsButton
        v-if="deal.status == 'SEND'"
        class="left-btn"
        ico="cancel"
      ></ActionsButton>
    </template>
  </BaseCardRequest>
</template>

<script setup lang="ts">
import ActionsButton from "../common/ActionsButton.vue";
import BaseCardRequest from "@/components/common/BaseCardRequest.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
const userStore = useUserStore();
const { getDeals } = userStore;
onMounted(() => {
  getDeals();
});
</script>

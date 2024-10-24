<template>
  <div v-if="!userStore.deals || userStore.deals?.length == 0">
    Нет активных сделок
  </div>
  <BaseCardRequest
    :show-contacts="deal.status == 'ACCEPTED'"
    v-for="deal in userStore.deals"
    :request="deal"
  >
    <template v-if="deal.role == 'receiver'" #buttons>
      <ActionsButton
        @click="acceptDeal(deal.dealId)"
        v-if="deal.status == 'SEND'"
        class="right-btn"
        ico="accept"
      ></ActionsButton>
      <ActionsButton
        @click="cancelDeal(deal.dealId)"
        v-if="deal.status == 'SEND'"
        class="left-btn"
        ico="cancel"
      ></ActionsButton>
    </template>
    <template v-if="deal.role == 'sender'" #buttons>
      <ActionsButton
        @click="cancelDeal(deal.dealId)"
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
import api from "@/Api";
import { ACCEPT_DEAL, CANCEL_DEAL } from "@/helper/strings";
const acceptDeal = (dealId: number) => {
  api.get(ACCEPT_DEAL + dealId).then(() => userStore.getDeals());
};
const cancelDeal = (dealId: number) => {
  api.get(CANCEL_DEAL + dealId).then(() => userStore.getDeals());
};
const userStore = useUserStore();
const { getDeals } = userStore;
onMounted(() => {
  // getDeals();
});
</script>

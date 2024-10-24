<template>
  <div v-if="!userStore.suggestions || userStore.suggestions?.length == 0">
    Нет предложений
  </div>
  <BaseCardRequest
    v-for="request in userStore.suggestions"
    :request="request"
    :keys="[]"
  >
    <template #buttons>
      <ActionsButton
        @click="acceptRequest(request)"
        class="right-btn"
        ico="accept"
        :request-id="request.id"
      >
      </ActionsButton>
    </template>
  </BaseCardRequest>
</template>

<script setup lang="ts">
import BaseCardRequest from "@/components/common/BaseCardRequest.vue";
import ActionsButton from "../common/ActionsButton.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import api from "@/Api";
import type { Request } from "@/helper/types";
import { ACCEPT_REQUEST } from "@/helper/strings";
const userStore = useUserStore();
const { loadMyProfile } = userStore;
const acceptRequest = (request: Request) => {
  const data = {
    receiverRequest: request.id,
    senderRequest: userStore.activeRequestId(),
  };
  api.post(ACCEPT_REQUEST, data).then(() => {
    loadMyProfile();
  });
};
onMounted(() => {
  // getSuggestion();
});
</script>

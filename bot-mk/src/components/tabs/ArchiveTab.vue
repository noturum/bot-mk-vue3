<template>
  <div v-if="!userStore.archive || userStore.archive?.length == 0">
    Нет закрытых заявок
  </div>
  <BaseCardRequest
    v-for="request in userStore.archive"
    :request="request"
    :keys="[]"
  >
    <template #buttons>
      <ActionsButton
        @click="restoreRequest(request)"
        class="right-btn"
        :request-id="request.id"
        ico="edit"
      />
    </template>
  </BaseCardRequest>
</template>

<script setup lang="ts">
import BaseCardRequest from "@/components/common/BaseCardRequest.vue";
import ActionsButton from "../common/ActionsButton.vue";
import type { Request } from "@/helper/types";
import { useUserStore } from "@/stores/user";
import { useRequestStore } from "@/stores/request";
import { onMounted } from "vue";
const requestStore = useRequestStore();
const emits = defineEmits<{
  setMenu: [key: string];
}>();
const userStore = useUserStore();
const restoreRequest = (request: Request) => {
  requestStore.toForm(request);
  emits("setMenu", "createRequest");
};
const { getArchive } = userStore;
onMounted(() => {
  getArchive();
});
</script>

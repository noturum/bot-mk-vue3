<template>
  <div v-if="!archive || archive?.length == 0">Нет закрытых заявок</div>
  <BaseCardRequest v-for="deal in archive" :request="deal" :keys="[]">
  </BaseCardRequest>
</template>

<script setup lang="ts">
import BaseCardRequest from "@/components/common/BaseCardRequest.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
const { getArchive, archive } = useUserStore();
onMounted(() => {
  getArchive();
});
</script>

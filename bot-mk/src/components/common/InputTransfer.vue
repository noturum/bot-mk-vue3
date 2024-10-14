<template>
  <div class="mb-3 position-relative">
    <div class="position-relative transfer-form">
      <label class="form-label" for="transfer_city">Город пересадки</label>
      <div class="d-flex mt-1 align-items-start">
        <input
          class="form-control"
          :name="name"
          type="hidden"
          v-model="transferId"
        />
        <input
          class="form-control"
          :name="name"
          :class="{ invalid: errors }"
          :placeholder="errors"
          type="search"
          v-model="data"
          @focusin="showed = true"
          @focusout="hideData"
        />
        <button
          @click="emits('click')"
          type="button"
          class="btn remove_transfer ml-2"
        >
          X
        </button>
      </div>
    </div>
  </div>
  <div
    v-if="list"
    v-show="showed && datalist"
    class="datalist"
    id="dropdownListCityTo"
  >
    <a
      class="dropdown-item"
      v-for="item in list"
      @click.capture="setData(item)"
      >{{ item }}</a
    >
  </div>
  <!-- <div class="invalid-input" v-if="errors">{{ errors }}</div> -->
  <slot name="append" />
</template>
<script setup lang="ts">
import { watch, ref } from "vue";
const transferId = defineModel<any>("transferId");
const data = defineModel<any>("data");
watch(data, (e) => {
  buildData(e.toLowerCase());
});
const emits = defineEmits<{
  click: [];
}>();
const showed = ref(false);
const list = ref<string[]>([]);
const props = defineProps<{
  name: string;
  datalist?: string[];
  errors?: string;
}>();
const hideData = () => {
  setTimeout(() => {
    showed.value = false;
  }, 200);
};
const setData = (val: string) => {
  data.value = val;
  showed.value = false;
};
const buildData = (val: string) => {
  if (props.datalist)
    list.value = props.datalist?.filter((item) =>
      item.toLowerCase().startsWith(val, 0)
    );
  showed.value = list.value?.length > 0 && val.length > 0;
};
</script>
<style scoped>
input::placeholder,
textarea::placeholder {
  color: rgb(107, 81, 81);
}
.invalid {
  border: 1px solid red;
}
</style>

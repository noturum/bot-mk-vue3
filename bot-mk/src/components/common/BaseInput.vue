<template>
  <div class="mb-3 position-relative">
    <label class="form-label" for="date_in">
      <slot />
    </label>
    <input
      v-if="type != 'textarea'"
      class="form-control"
      :class="{ invalid: errors }"
      :placeholder="errors"
      :id="id"
      :name="id"
      :type="type"
      value=""
      v-model="data"
      @focusin="showed = true"
      @focusout="hideData"
    />
    <textarea
      v-else
      class="form-control"
      :id="id"
      :name="id"
      :class="{ invalid: errors }"
      v-model="data"
      :placeholder="errors"
    />
    <!-- <div class="invalid-input" v-if="errors">{{ errors }}</div> -->
    <slot name="append" />
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
  </div>
</template>
<script setup lang="ts">
import { watch, ref } from "vue";
const data = defineModel<any>("data");
watch(data, (e) => {
  buildData(e.toLowerCase());
});
const showed = ref(false);
const list = ref<string[]>([]);
const props = defineProps<{
  id: string;
  type: string;
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
  showed.value = list.value?.length > 0;
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

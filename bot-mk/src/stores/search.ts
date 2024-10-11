import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { SEARCH } from "@/helper/strings";
import type { Request } from "@/helper/types";

export const useSearchStore = defineStore("search", () => {
  const search = ref<[Request]>();
  async function getSearch(form: any) {
    axios
      .post(SEARCH, form)
      .then((response) => {
        search.value = response.data.items;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return { search, getSearch };
});

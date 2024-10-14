import { ref } from "vue";
import { defineStore } from "pinia";
import { CITIES } from "@/helper/strings";
import api from "@/Api";

export const useCitiesStore = defineStore("cities", () => {
  const cities = ref<[]>();
  async function getCities() {
    api
      .get<[]>(CITIES)
      .then((response) => {
        cities.value = response;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return { cities, getCities };
});

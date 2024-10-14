import { reactive } from "vue";
import { defineStore } from "pinia";
import type { Request, SearchRequest } from "@/helper/types";
export const useRequestStore = defineStore("request", () => {
  const baseForm = {
    id: "",
    cityIn: "",
    cityTo: "",
    dateIn: "",
    contacts: "",
    description: "",
    mode: "SEND",
    transfers: [],
  };
  const requestForm = reactive<Request>({
    cityIn: "",
    cityTo: "",
    dateIn: "",
    contacts: "",
    description: "",
    mode: "SEND",
    transfers: [],
  } as Request);
  function toForm(form: SearchRequest | Request) {
    Object.assign(requestForm, form);
  }
  function clearForm() {
    Object.assign(requestForm, baseForm);
  }
  return { requestForm, toForm, clearForm };
});

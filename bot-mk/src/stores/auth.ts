import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/Api";
import type { Auth } from "@/helper/types";
import { AUTH } from "@/helper/strings";
import api from "@/Api";
export const useAuthStore = defineStore("auth", () => {
  const error = ref(false);
  const id = ref<number>();
  function auth(uid: number) {
    let data = { id: uid };
    api
      .post<Auth>(AUTH, data)
      .then((response) => {
        if (response?.id == uid) id.value = response.id;
        else error.value = true;
        console.log("login succ");
      })
      .catch((err) => (error.value = true));
  }
  return { auth, error, id };
});

import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { User, Review, Request, Deals } from "@/helper/types";
import { MY_REQUEST } from "@/helper/strings";
export const useUserStore = defineStore("user", () => {
  const user = ref<User>({} as User);
  const myReviews = ref<Review[]>([]);
  const reviewsByMe = ref<Review[]>([]);
  const myRequest = ref<Request[]>([]);
  const myDeals = ref<Deals[]>([]);
  const suggestions = ref<Request[]>([]);
  const archive = ref<Request[]>([]);

  const getReviewsByMe = () => {
    reviewsByMe.value = [];
    axios.get(MY_REQUEST).then((response) => {
      console.log(response.data);
      reviewsByMe.value = response.data.items;
    });
  };
  const getArchive = () => {
    archive.value = [];
    axios.get(MY_REQUEST).then((response) => {
      console.log(response.data);
      archive.value = response.data.items;
    });
  };
  const getMyRequest = () => {
    myRequest.value = [];
    axios.get(MY_REQUEST).then((response) => {
      console.log(response.data);
      myRequest.value = response.data.items;
    });
  };
  const getMyReviews = () => {
    myReviews.value = [];
    axios.get("").then((response) => {
      console.log(response.data);
      myReviews.value = response.data.items;
    });
  };
  const getDeals = () => {
    myDeals.value = [];
    axios.get("").then((response) => {
      console.log(response.data);
      myDeals.value = response.data.items;
    });
  };
  const getSuggestion = () => {
    suggestions.value = [];
    axios.get("").then((response) => {
      console.log(response.data);
      suggestions.value = response.data.items;
    });
  };

  return {
    user,
    getMyRequest,
    getMyReviews,
    myReviews,
    reviewsByMe,
    myRequest,
    getDeals,
    myDeals,
    getSuggestion,
    suggestions,
    getArchive,
    archive,
    getReviewsByMe,
  };
});

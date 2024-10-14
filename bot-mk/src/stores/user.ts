import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/Api";
import type {
  User,
  Review,
  Deals,
  Request,
} from "@/helper/types";
import {
  MY_REQUEST,
  MY_DEALS,
  SUGGESTION,
  REVIEWS_BY_ME,
  ARCHIVE,
  MY_REVIEWS,
} from "@/helper/strings";
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
    api.get<Review[]>(REVIEWS_BY_ME).then((response) => {
      reviewsByMe.value = response;
    });
  };
  const getArchive = () => {
    archive.value = [];
    api.get<Request[]>(ARCHIVE).then((response) => {
      archive.value = response;
    });
  };
  const getMyRequest = () => {
    myRequest.value = [];
    api.get<Request[]>(MY_REQUEST).then((response) => {
      myRequest.value = response;
    });
  };
  const getMyReviews = () => {
    myReviews.value = [];
    api.get<Review[]>(MY_REVIEWS).then((response) => {
      myReviews.value = response;
    });
  };
  const getDeals = () => {
    myDeals.value = [];
    api.get<Deals[]>(MY_DEALS).then((response) => {
      myDeals.value = response;
    });
  };
  const getSuggestion = () => {
    suggestions.value = [];
    api.get<Request[]>(SUGGESTION).then((response) => {
      suggestions.value = response;
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

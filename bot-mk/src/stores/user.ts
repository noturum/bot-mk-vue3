import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import api from "@/Api";
import type { User, Review, Deals, Request } from "@/helper/types";
import {
  GET_REQUEST,
  GET_DEALS,
  SUGGESTION,
  REVIEWS_BY_ME,
  ARCHIVE,
  REVIEWS,
  AUTH,
} from "@/helper/strings";
export const useUserStore = defineStore("user", () => {
  const activeRequest = ref(0);
  const notify = ref(true);
  const user = ref<User>({} as User);
  const reviews = ref<Review[]>([]);
  const reviewsByMe = ref<Review[]>([]);
  const requests = ref<Request[]>([]);
  const deals = ref<Deals[]>([]);
  const suggestions = ref<Request[]>([]);
  const archive = ref<Request[]>([]);
  const activeRequestId = () => requests.value[activeRequest.value]?.id;
  const error = ref(false);
  const auth = (uid: number) => {
    let data = { id: uid };
    api
      .post<User>(AUTH, data)
      .then((response) => {
        user.value = response;
      })
      .catch((err) => (error.value = true));
  };
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
  const getRequest = async () => {
    requests.value = [];
    const response = await api.get<Request[]>(GET_REQUEST);
    requests.value = response;
  };
  const getReviews = () => {
    reviews.value = [];
    api.get<Review[]>(REVIEWS).then((response) => {
      reviews.value = response;
    });
  };
  const getDeals = () => {
    deals.value = [];
    api.get<Deals[]>(GET_DEALS + activeRequestId()).then((response) => {
      deals.value = response;
    });
  };
  const getSuggestion = () => {
    suggestions.value = [];
    api.get<Request[]>(SUGGESTION + activeRequestId()).then((response) => {
      suggestions.value = response;
    });
  };
  function getCountNew<T extends { new?: boolean }>(arr: T[]) {
    return arr.filter((obj) => obj.new).length;
  }
  const loadMyProfile = () => {
    getDeals()
    getSuggestion();
  };
  watch(activeRequest, () => {
    loadMyProfile();
  });
  return {
    user,
    activeRequest,
    activeRequestId,
    notify,
    auth,
    error,
    getRequest,
    getReviews,
    reviews,
    reviewsByMe,
    requests,
    getDeals,
    deals,
    getSuggestion,
    suggestions,
    getArchive,
    archive,
    getReviewsByMe,
    loadMyProfile,
    getCountNew,
  };
});

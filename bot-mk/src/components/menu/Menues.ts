import MainMenu from "@/components/menu/MainMenu.vue";
import ProfileMenu from "@/components/menu/ProfileMenu.vue";
import ReviewsMenu from "@/components/menu/ReviewsMenu.vue";
import SupportMenu from "@/components/menu/SupportMenu.vue";
import CreateRequestMenu from "@/components/menu/CreateRequestMenu.vue";
import CreateReviewMenu from "@/components/menu/CreateReviewMenu.vue";
import ReportMenu from "@/components/menu/ReportMenu.vue";
import MyReviewsMenu from "@/components/menu/MyReviewsMenu.vue";
import CheckUserMenu from "@/components/menu/CheckUserMenu.vue";
import SearchMenu from "@/components/menu/SearchMenu.vue";
import ErrorMenu from "@/components/menu/ErrorMenu.vue";

export function getMenues() {
  return {
    main: MainMenu,
    profile: ProfileMenu,
    review: ReviewsMenu,
    support: SupportMenu,
    createRequest: CreateRequestMenu,
    search: SearchMenu,
    createReview: CreateReviewMenu,
    checkUser: CheckUserMenu,
    myReviews: MyReviewsMenu,
    report: ReportMenu,
    error: ErrorMenu,
  };
}

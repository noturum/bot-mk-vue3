import MainMenu from "@/components/menu/MainMenu.vue";
import ProfileMenu from "@/components/menu/ProfileMenu.vue";
import ReviewsMenu from "@/components/menu/ReviewsMenu.vue";
import SupportMenu from "@/components/menu/SupportMenu.vue";
import RequestMenu from "@/components/menu/CreateRequestMenu.vue";
import ReviewMenu from "@/components/menu/CreateReviewMenu.vue";
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
    createRequest: RequestMenu,
    search: SearchMenu,
    createReview: ReviewMenu,
    checkUser: CheckUserMenu,
    myReviews: MyReviewsMenu,
    report: ReportMenu,
    error: ErrorMenu,
  };
}

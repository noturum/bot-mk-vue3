import DealsTab from "@/components/tabs/DealsTab.vue";
import SuggestionsTab from "./SuggestionsTab.vue";
import ArchiveTab from "./ArchiveTab.vue";
import ReviewsTab from "./ReviewsTab.vue";

export function getTabs() {
  return {
    deals: DealsTab,
    suggestion: SuggestionsTab,
    archive: ArchiveTab,
    reviews: ReviewsTab,
  };
}

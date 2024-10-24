export const GET_REQUEST = "/requests";
export const GET_DEALS = "/deals/";
export const GET_MESSAGE = "/message";
export const GET_USER = "/users/me";
export const AUTH = "/auth";
export const CITIES = "/cities";
export const SEARCH = "/search";
export const SUGGESTION = "/suggestions/";
export const REVIEWS_BY_ME = "/reviews/me";
export const ARCHIVE = "/archive";
export const REPORT = "/report";
export const REVIEWS = "/reviews";
export const SEND_REPORT = "Жалоба отправлена";
export const SEND_REVIEW = "Отзыв оставлен";
export const CHECK_USER = "/check_user";
export const UNBLOCK = "/unblock";
export const REMOVE_REQUEST = "/remove_request/";
export const ACCEPT_REQUEST = "/create_deal";
export const ACCEPT_DEAL = "/accept-deal/";
export const CANCEL_DEAL = "/cancel-deal/";
export const MENU_TITLES: { [key: string]: any } = {
  profile: "Мой профиль",
  review: "Отзывы",
  support: "Поддержка",
  createRequest: "Создание заявки",
  search: "Поиск",
  report: "Оставить отзыв",
  createReview: "Написать отзыв",
  checkUser: "Проверить пользователя",
  myReviews: "Мои отзывы",
};
export const TABS_LINK: { [k: string]: string } = {
  deals: "Сделки",
  suggestion: "Предложения",
  archive: "Архив",
  reviews: "Отзывы обо мне",
};
export const FIELD_IS_EMPTY = "Поле не должно быть путое";
export const INVALID_DATE = "Не допустимая дата";
export const NOT_IN_DATALIST = "Города нет в списке";

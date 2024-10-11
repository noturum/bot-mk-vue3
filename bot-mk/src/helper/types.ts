export interface Request {
  icon?: string;
  cityIn: string;
  cityTo: string;
  dateIn: string;
  description: string;
}
export interface User {
  id: number;
  contacts: number;
  fullName: string;
  username: string;
}
export interface Auth {
  error: boolean;
}
export interface InitData {
  id: number;
}
export interface CreateRequest {
  mode: string;
  cityIn: string;
  transfers: [];
  dateIn: string;
  cityTo: string;
  description: string;
  contacts: string;
}
export interface ErrorRequest {
  cityIn?: string;
  dateIn?: string;
  cityTo?: string;
  description?: string;
  contacts?: string;
}
export interface SearchRequest {
  mode: string;
  cityIn: string;
  dateIn: string;
  cityTo: string;
}
export interface CreateReview {
  contacts: string;
  review: string;
}
export interface ErrorReview {
  contacts?: string;
  review?: string;
}
export interface CheckUser {
  user: string;
}
export interface ErrorCheckUser {
  user?: string;
}
export interface CreateReport {
  report: string;
}
export interface ErrorReport {
  report?: string;
}
export interface Review {
  date?: string;
  title?: string;
}
export interface Deals extends Request {
  
}

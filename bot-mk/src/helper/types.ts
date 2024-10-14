export interface User {
  id: number;
  contacts: number;
  fullName: string;
  username: string;
}
export interface Auth {
  id: number;
}
export interface InitData {
  id: number;
}
export interface Transfer {
  id?: number;
  city: string;
}
export interface Request {
  id?: number;
  mode: string;
  cityIn: string;
  transfers: Transfer[];
  dateIn: string;
  cityTo: string;
  description: string;
  contacts: string;
}
export interface ErrorRequest {
  cityIn?: string;
  transfers?: [];
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
export interface Review {
  id?: number;
  contacts: string;
  description: string;
}
export interface CheckUser {
  user: string;
}
export interface Report {
  contacts: string;
  description: string;
}
export interface Deals extends Request {
  status: string;
  userName: string;
  dealId: number;
  role: string;
}

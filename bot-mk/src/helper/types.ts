export interface User {
  id: number;
  contacts: number;
  fullName: string;
  username: string;
  blocked: boolean;
}
export interface Auth {
  id: number;
}
export interface Response {
  status: string;
  error?: string;
}
export interface InitData {
  user: { id: number };
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
  new?: boolean;
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
  new?: boolean;
}
export interface CheckUser {
  user: string;
}
export interface UnblockCode {
  code: string;
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
  new?: boolean;
}

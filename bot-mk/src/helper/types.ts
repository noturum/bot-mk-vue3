export interface Request {
    icon?: string
    cityIn: string
    cityTo: string
    dateIn: string
    description: string
}
interface User {
    id: number
    contacts: number
    fullName: string
    username: string
}
export interface Auth {
    user: User
    error: boolean
}
export interface InitData {
    id: number
}
export interface CreateRequest {
    mode: string
    cityIn: string
    transfers: []
    dateIn: string
    cityTo: string
    description: string
    contacts: string

}
export interface SearchRequest {
    mode: string
    cityIn: string
    dateIn: string
    cityTo: string
}
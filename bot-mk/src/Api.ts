import axios from "axios";
import { useUserStore } from "./stores/user";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
const HOST = "http://178.217.101.143:8082";

class ApiService {
  private axiosInstance: AxiosInstance;
  constructor(baseURL: string = HOST, headers: object = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers,
    });
    this.axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleError
    );
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }
  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const { user } = useUserStore();
    config.headers["X-User-Id"] = user.id;
    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  private handleError(error: any): Promise<any> {
    console.error("API Error: ", error.response || error.message);
    return Promise.reject(error);
  }

  public async get<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data: any,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data: any,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
const api = new ApiService();
export default api;

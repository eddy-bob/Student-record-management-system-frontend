import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getLocalStorage } from "../helpers/localStorage";

export const baseURL = `${import.meta.env.VITE_SERVER_URL}/v1`;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
  withCredentials: false,
});

const onRequest = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getLocalStorage(import.meta.env.VITE_AUTH_TKE as string);
  request.headers!.Authorization = `Bearer ${token}`;
  return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError) => {
  if (error.response) {
    const statusCode = error.response!.status;

    if (statusCode === 401 || statusCode === 403) {
      localStorage.clear();

      // redirect to login page if not already there
      if (window.location.pathname !== "/login") {
        let redirectUrl = `/login?next=${window.location.pathname}`;
        window.location.href = redirectUrl;
      }
    }
  }

  return Promise.reject(error);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;

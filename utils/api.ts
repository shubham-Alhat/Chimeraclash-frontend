import axios from "axios";

// check type of error
export function isCustomError(error: unknown): error is CustomeError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error &&
    "data" in error
  );
}

export interface BackendResponse {
  message: string;
  data?: object;
  success?: boolean;
  redirect?: string;
}

export interface CustomeError {
  message: string;
  status: null | number;
  data: null | BackendResponse;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // universal error message
    const customError: CustomeError = {
      message: "Something went wrong",
      status: null,
      data: null,
    };

    if (error.response) {
      customError.message = error.response.data.message || "Server error";
      customError.status = error.response.status;
      customError.data = error.response.data;
    } else if (error.request) {
      customError.message = "Cannot connect to server";
    } else {
      customError.message = error.message;
    }

    return Promise.reject(customError);
  }
);

export default api;

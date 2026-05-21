import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiCallProps } from '@/types/ApiCallProps';
import { refreshToken as refreshTokenAPI } from './Auth';
import { getSession } from 'next-auth/react';

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

const apiInstance = axios.create({
  baseURL: API_KEY,
});

interface RetryableRequest extends AxiosRequestConfig {
  _retry?: boolean;
}

apiInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const accessToken = session?.user.user.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;
    const status = error.response?.status;

    if (!originalRequest || originalRequest._retry || (status !== 401 && status !== 403)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const session = await getSession();
      const rToken = session?.user.user.refreshToken;
      if (!rToken) {
        return Promise.reject(error);
      }

      const refreshTokenResponse = await refreshTokenAPI({ refreshToken: rToken });
      const newAccessToken = refreshTokenResponse.accessToken;

      apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      return apiInstance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

const ERROR_MESSAGES: Record<string, string> = {
  get: '의 데이터를 받아오는데 실패하였습니다.',
  put: '의 데이터 수정에 실패하였습니다.',
  post: '에 데이터를 전송하는데 실패하였습니다.',
  patch: '의 데이터 수정에 실패하였습니다.',
  delete: '의 데이터 삭제에 실패하였습니다.',
};

function errorMessageFor(method: string, apiName: string) {
  const suffix = ERROR_MESSAGES[method.toLowerCase()] ?? ' 처리 중 알 수 없는 에러가 발생하였습니다.';
  return `${apiName}${suffix}`;
}

async function CallAPI({ method, query, body = null, apiName }: ApiCallProps) {
  try {
    const response = await apiInstance({
      method,
      url: query,
      data: body !== null ? body : undefined,
    });
    return response.data;
  } catch (error) {
    console.error(errorMessageFor(method, apiName));
    throw error;
  }
}

export default CallAPI;

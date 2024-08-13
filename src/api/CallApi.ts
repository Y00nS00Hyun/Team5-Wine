import axios from 'axios';
import { ApiCallProps } from '@/types/ApiCallProps';
import { refreshToken } from './Auth';
import { getSession, useSession } from 'next-auth/react';

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

// Axios 인스턴스 생성
const apiInstance = axios.create({
  baseURL: API_KEY,
});

// 요청 인터셉터 설정
apiInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const accessToken = session?.user.user.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const session = await getSession();
        const { refreshToken: rToken } = session?.user.user || {};
        if (!refreshToken) {
          return Promise.reject(error);
        }
        
        const refreshTokenResponse = await refreshToken({
          refreshToken: rToken || '',
        });
        console.log('리프레쉬토큰동작함');
        console.log(refreshTokenResponse);
        const newAccessToken = refreshTokenResponse.accessToken;

        // TODO: session 에 있는 값을 수정하도록 처리.
        apiInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신에 실패하였습니다.');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

function ErrorCheck(method: string, apiName: string) {
  const errorMessage: { [key: string]: string } = {
    get: `${apiName}의 데이터를 받아오는데 실패하였습니다.`,
    put: `${apiName}의 데이터 수정에 실패하였습니다.`,
    post: `${apiName}에 데이터를 전송하는데 실패하였습니다.`,
    patch: `${apiName}의 데이터 수정에 실패하였습니다.`,
    delete: `${apiName}의 데이터 삭제에 실패하였습니다.`,
  };
  return errorMessage[method] || `알 수 없는 에러가 발생하였습니다.;`;
}

async function CallAPI({ method, query, body = null, apiName }: ApiCallProps) {
  // 인스턴스로 변경 부분
  let order = query; // baseURL이 설정되어 있으므로 API_KEY를 제외합니다.
  try {
    const response = await apiInstance({
      method,
      url: order,
      data: body !== null ? body : undefined,
    });
    return response.data;
  } catch (error) {
    console.log(ErrorCheck(method, apiName));
    throw error;
  }
}

export default CallAPI;

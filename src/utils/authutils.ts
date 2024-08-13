import { signInAPI } from '@/api/Auth';
import { signInRequestBody } from '@/types/AuthProps';

export async function loginAndStoreTokens(loginData: signInRequestBody) {
  const { accessToken, refreshToken } = await signInAPI(loginData);

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

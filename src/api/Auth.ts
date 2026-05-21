import CallAPI from './CallApi';
import { signUpRequestBody, signInRequestBody, oauthRequestBody } from '@/types/AuthProps';

export async function signUpAPI(user: signUpRequestBody) {
  return await CallAPI({ method: 'post', query: '/auth/signUp', body: user, apiName: 'signUp' });
}

export async function signInAPI(user: signInRequestBody) {
  return await CallAPI({ method: 'post', query: '/auth/signIn', body: user, apiName: 'signIn' });
}

export async function refreshToken(token: object) {
  return await CallAPI({
    method: 'post',
    query: '/auth/refresh-token',
    body: token,
    apiName: 'refreshToken',
  });
}

export async function providerAPI(props: oauthRequestBody, provider: string) {
  await CallAPI({
    method: 'post',
    query: `/auth/signIn/${provider}`,
    body: props,
    apiName: `signIn/${provider}`,
  });
}

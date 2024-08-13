import CallAPI from './CallApi';
import { signUpRequestBody, signInRequestBody, oauthRequestBody } from '@/types/AuthProps';

export async function signUpAPI(user: signUpRequestBody) {
  const method = 'post';
  let query = '/auth/signUp';
  const apiName = 'signUp';
  const body = user;
  await CallAPI({ method, query, body, apiName });
}

export async function signInAPI(user: signInRequestBody) {
  const method = 'post';
  let query = '/auth/signIn';
  const apiName = 'signIn';
  const body = user;
  return await CallAPI({ method, query, body, apiName });
}

export async function refreshToken(token: object) {
  const method = 'post';
  let query = '/auth/refresh-token';
  const apiName = 'refreshToken';
  const body = token;
  return await CallAPI({ method, query, body, apiName });
}

export async function providerAPI(props: oauthRequestBody, provider: string) {
  const method = 'post';
  let query = `/auth/signIn/${provider}`;
  const apiName = 'refreshToken';
  const body = props;
  await CallAPI({ method, query, body, apiName });
}

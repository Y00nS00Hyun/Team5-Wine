import { editUser } from '@/types/UserProps';
import CallAPI from './CallApi';

export async function myDataAPI() {
  return await CallAPI({ method: 'get', query: '/users/me', body: null, apiName: 'mydata' });
}

export async function editmyDataAPI(userData: editUser) {
  await CallAPI({ method: 'patch', query: '/users/me', body: userData, apiName: 'mydata' });
}

export async function myReviewsAPI(limit = 5) {
  return await CallAPI({
    method: 'get',
    query: `/users/me/reviews?limit=${limit}`,
    body: null,
    apiName: 'myreview',
  });
}

export async function myWineAPI(limit = 5) {
  return await CallAPI({
    method: 'get',
    query: `/users/me/wines?limit=${limit}`,
    body: null,
    apiName: 'mywine',
  });
}

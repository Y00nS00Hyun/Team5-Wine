import { createWineBody } from '@/types/WineProps';
import CallAPI from './CallApi';
import { id } from '@/types/Id';

export async function addWineAPI(props: createWineBody) {
  await CallAPI({ method: 'post', query: '/wines', body: props, apiName: 'addwine' });
}

export async function wineListAPI(
  limit: number,
  cursor: number | null = null,
  minPrice: number | null = null,
  maxPrice: number | null = null,
  rating: number | null = null
) {
  const queryParams = new URLSearchParams();

  if (limit !== null) queryParams.append('limit', limit.toString());
  if (cursor !== null) queryParams.append('cursor', cursor.toString());
  if (minPrice !== null) queryParams.append('minPrice', minPrice.toString());
  if (maxPrice !== null) queryParams.append('maxPrice', maxPrice.toString());
  if (rating !== null) queryParams.append('rating', rating.toString());

  return await CallAPI({
    method: 'get',
    query: `/wines?${queryParams.toString()}`,
    body: null,
    apiName: 'winelist',
  });
}

export async function bestWine(limit = 10) {
  return await CallAPI({
    method: 'get',
    query: `/wines/recommended?limit=${limit}`,
    body: null,
    apiName: 'bestwine',
  });
}

export async function wineDetail(wineId: id) {
  return await CallAPI({
    method: 'get',
    query: `/wines/${wineId}`,
    body: null,
    apiName: 'winedetail',
  });
}

export async function editWine(props: createWineBody, wineId: id) {
  await CallAPI({
    method: 'patch',
    query: `/wines/${wineId}`,
    body: props,
    apiName: 'editwine',
  });
}

export async function deleteWine(wineId: id) {
  await CallAPI({
    method: 'delete',
    query: `/wines/${wineId}`,
    body: null,
    apiName: 'deletewine',
  });
}

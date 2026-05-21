import { createReviewBody, editReview } from '@/types/ReviewProps';
import CallAPI from './CallApi';
import { id } from '@/types/Id';

export async function addReviewsAPI(prop: createReviewBody) {
  await CallAPI({ method: 'post', query: '/reviews', body: prop, apiName: 'addreview' });
}

export async function searchReviewsAPI(reviewId: id) {
  return await CallAPI({
    method: 'get',
    query: `/reviews/${reviewId}`,
    body: null,
    apiName: 'searchreview',
  });
}

export async function editReviewsAPI(prop: editReview, reviewId: id) {
  await CallAPI({
    method: 'patch',
    query: `/reviews/${reviewId}`,
    body: prop,
    apiName: 'editreview',
  });
}

export async function deleteReviewsAPI(reviewId: id) {
  await CallAPI({
    method: 'delete',
    query: `/reviews/${reviewId}`,
    body: null,
    apiName: 'deletereview',
  });
}

export async function addReviewsLikeAPI(reviewId: id) {
  await CallAPI({
    method: 'post',
    query: `/reviews/${reviewId}/like`,
    body: null,
    apiName: 'addlike',
  });
}

export async function deleteReviewsLikeAPI(reviewId: id) {
  await CallAPI({
    method: 'delete',
    query: `/reviews/${reviewId}/like`,
    body: null,
    apiName: 'deletelike',
  });
}

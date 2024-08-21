import { createReviewBody, editReview, ReviewDetailType } from "@/types/ReviewProps";
import CallAPI from "./CallApi";
import { id } from "@/types/Id";

export async function addReviewsAPI(prop: createReviewBody) {
    console.log(prop);
    const method = "post";
    let query = "/reviews";
    const apiName = "addreview";
    const body = prop;
    await CallAPI({method, query, body, apiName});
}

export async function searchReviewsAPI(reviewId: id) {
    const method = "get";
    let query = `/reviews/${reviewId}`;
    const apiName = "searchreview";
    const body = null;
    return await CallAPI<ReviewDetailType>({method, query, body, apiName});
}

export async function editReviewsAPI(prop: editReview, reviewId: id) {
    const method = "patch";
    let query = `/reviews/${reviewId}`;
    const apiName = "editreview";
    const body = prop;
    await CallAPI({method, query, body, apiName});
}

export async function deleteReviewsAPI(reviewId: id) {
    const method = "delete";
    let query = `/reviews/${reviewId}`;
    const apiName = "deletereview";
    const body = null;
    await CallAPI({method, query, body, apiName});
}

export async function addReviewsLikeAPI(reviewId: id) {
    const method = "post";
    let query = `/reviews/${reviewId}/like`;
    const apiName = "addlike";
    const body = null;
    await CallAPI({method, query, body, apiName});
}

export async function deleteReviewsLikeAPI(reviewId: id) {
    const method = "delete";
    let query = `/reviews/${reviewId}/like`;
    const apiName = "deletelike";
    const body = null;
    await CallAPI({method, query, body, apiName});
}

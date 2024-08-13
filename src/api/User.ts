import CallAPI from "./CallApi";

export async function myDataAPI() {
    const method = "get";
    let query = "/users/me";
    const apiName = "mydata";
    const body = null;
    return await CallAPI({method, query, body, apiName});
}

export async function editmyDataAPI() {
    const method = "post";
    let query = "/users/me";
    const apiName = "mydata";
    const body = null;
    await CallAPI({method, query, body, apiName});
}

export async function myReviewsAPI() {
    //2번의 요청이 필요함 1번 총 카운트수를 위한 요청
    //아니면 화면을 가득 채울만큼의 카운트만 진행하고 이후 스크롤 이벤트를 읽어서 밑으로 내릴 시 로딩시키는 방식
    //총카운트수를 리미트에 넣은 요청
    let  count = 5;
    const method = "get";
    let query = `/users/me/reviews?limit=${count}`;
    const apiName = "myreview";
    const body = null;
    return await CallAPI({method, query, body, apiName});
}

export async function myWineAPI() {
    let count = 5;
    const method = "get";
    let query = `/users/me/wines?limit=${count}`;
    const apiName = "mywine";
    const body = null;
    return await CallAPI({method, query, body, apiName});
}

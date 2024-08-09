import axios from 'axios';
import { ApiCallProps } from '@/types/ApiCallProps';

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

function ErrorCheck(method:string, apiName:string) {
    const errorMessage: { [key: string]: string } = {
      get: `${apiName}의 데이터를 받아오는데 실패하였습니다.`,
      put: `${apiName}의 데이터 수정에 실패하였습니다.`,
      post: `${apiName}에 데이터를 전송하는데 실패하였습니다.`,
      patch: `${apiName}의 데이터 수정에 실패하였습니다.`,
      delete: `${apiName}의 데이터 삭제에 실패하였습니다.`,
    };
    return errorMessage[method] || `알 수 없는 에러가 발생하였습니다.;`;
  }

async function CallAPI({method, query, body = null, apiName}:ApiCallProps) {

    console.log(method, query, body, apiName);

    let order = API_KEY;
    console.log(order);

    axios.get(``, {
        params: {}
    })

    try {
        const response = await axios({
            method,
            url: order,
            data: body !== null ? body : undefined,
            params: query,
        });
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(ErrorCheck(method, apiName));
        throw error;
    }
}

export default CallAPI;

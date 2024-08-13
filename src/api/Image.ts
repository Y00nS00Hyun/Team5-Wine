import CallAPI from './CallApi';
import imageProp from '@/types/Image';

export async function ImageAPI(formData: FormData): Promise<{url: string}> {
  const method = 'post';
  let query = '/images/upload';
  const apiName = 'image';
  const body = formData;
  return await CallAPI({ method, query, body, apiName });
}

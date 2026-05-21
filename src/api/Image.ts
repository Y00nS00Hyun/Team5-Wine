import CallAPI from './CallApi';

export async function ImageAPI(formData: FormData): Promise<{ url: string }> {
  return await CallAPI({
    method: 'post',
    query: '/images/upload',
    body: formData,
    apiName: 'image',
  });
}

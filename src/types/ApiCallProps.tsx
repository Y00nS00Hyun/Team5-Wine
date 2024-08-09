export interface ApiCallProps {
  method: string;
  url: string;
  query: Object;
  body: any | null;
  apiName: string;
}

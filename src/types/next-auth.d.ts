import NextAuth from 'next-auth';
import type imageProp from './Image';
import type { id } from './Id';
import type { nickName } from './NickName';

interface user {
  image: imageProp;
  updatedAt: Date;
  createdAt: Date;
  id: id;
  nickname: nickName;
  email: string | null;
  refreshToken?: string;
  accessToken?: string;
}

interface SignResponse {
  user: user;
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: SignResponse;
  }
}

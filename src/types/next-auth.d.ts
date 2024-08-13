import NextAuth from "next-auth"

// TODO: 임의로 옮겨둠. 나중에 AuthProps 에 있는 타입과 합치기
interface user {
  image : imageProp
  updatedAt : Date;
  createdAt : Date;
  id : id;
  nickname : nickName;
  email : string | null;

  // TODO: 나중에 수정 필요! 
  refreshToken?: string;
  accessToken?: string;
}

interface SignResponse {
  // refreshToken: string;
  // accessToken: string;
  user: user;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: SignResponse;
  }
}


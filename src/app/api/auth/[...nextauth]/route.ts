import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'Credentials',
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials);

        const { email, password } = credentials || {};
        // TODO: 사용자 정보 가져와서 처리.
        // https://winereview-api.vercel.app/docs/#/Auth/SignIn
        // TODO: 코드 개선 필요! teamId 변경
        const res = await fetch('https://winereview-api.vercel.app/7-5/auth/signIn', {
          method: 'POST',
          body: JSON.stringify({ email: `${decodeURIComponent(email || '')}`, password }),
          headers: { 'Content-Type': 'application/json' },
        }).catch((e) => {
          console.error('error', e);
          return null;
        });
        const user = await res?.json();

        console.log('response', user);

        // TODO: 나중에 변경 필요!
        // If no error and we have user data, return it
        if (res?.ok && user) {
          console.log(1111111, user.user);
          return user;
        }
        // Return null if user data could not be retrieved
        console.log(22222222);
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_ID || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
  ],
  secret: '1234qwer',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log('session', session, token, user);
      session.user = {
        ...token,
      } as any;
      return session;
    },
    async jwt({ token, user, account }) {
      console.log('jwt', token, user);

      if (account?.provider === 'google') {
        // TODO: 간편 로그인 처리. https://winereview-api.vercel.app/docs/#/Auth/SignInWithOauth
        const res = await fetch('https://winereview-api.vercel.app/7-5/auth/signIn/google', {
          method: 'POST',
          // TODO: 데이터 형식에 맞춰서 넣기
          body: JSON.stringify({ email: 'example@example.com', password: 'yourpassword' }),
          headers: { 'Content-Type': 'application/json' },
        }).catch((e) => {
          console.error('error', e);
          return null;
        });
        const user = await res?.json();
        token.user = user;
        return token;
      }

      if (account?.provider === 'kakao') {
        // TODO: 카카오 로그인도 구글과 유사하게 처리
      }

      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

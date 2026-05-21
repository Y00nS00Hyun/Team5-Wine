import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://winereview-api.vercel.app/7-5';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'Credentials',
      name: 'Credentials',
      credentials: {
        email: { type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;

        const res = await fetch(`${API_BASE}/auth/signIn`, {
          method: 'POST',
          body: JSON.stringify({ email: decodeURIComponent(email), password }),
          headers: { 'Content-Type': 'application/json' },
        }).catch(() => null);

        if (!res?.ok) return null;
        return res.json();
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || '1234qwer',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = { ...token } as any;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'google') {
        const res = await fetch(`${API_BASE}/auth/signIn/google`, {
          method: 'POST',
          body: JSON.stringify({ email: 'example@example.com', password: 'yourpassword' }),
          headers: { 'Content-Type': 'application/json' },
        }).catch(() => null);
        const oauthUser = await res?.json();
        token.user = oauthUser;
        return token;
      }

      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

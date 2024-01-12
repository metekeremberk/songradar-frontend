import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const data = {
          username: credentials.username,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.NEXT_DB_URL}/auth/sign_in`, {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: new URLSearchParams(data),
        });
        const token = await res.json();

        if (res.status === 200) {
          const userData = await fetch(`${process.env.NEXT_DB_URL}/auth/me`, {
            cache: "no-store",
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          });
          const user = await userData.json();
          const sessionUser = {
            name: user.username,
            email: user.email,
            id: user.id,
            accessToken: token.access_token,
          };
          return sessionUser;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.uid;
        session.accessToken = token.accessToken;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
};

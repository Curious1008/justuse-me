import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: { strategy: "database" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        // Attach extended fields from DB
        type ExtUser = typeof user & {
          plan?: "free" | "pro";
          displayName?: string | null;
          avatarUrl?: string | null;
        };
        const u = user as ExtUser;
        session.user.plan = u.plan ?? "free";
        session.user.displayName = u.displayName ?? null;
        session.user.avatarUrl = u.avatarUrl ?? null;
      }
      return session;
    },
  },
  trustHost: true,
});

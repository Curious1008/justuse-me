import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: "free" | "pro";
      displayName: string | null;
      avatarUrl: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    plan?: "free" | "pro";
    displayName?: string | null;
    avatarUrl?: string | null;
  }
}

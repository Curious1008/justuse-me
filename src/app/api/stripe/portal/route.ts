import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { timeout: 10000 });
}

export async function POST() {
  try {
    const stripe = getStripe();
    const session = await auth();
    const user = session?.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [row] = await db
      .select({ stripeCustomerId: users.stripeCustomerId })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (!row?.stripeCustomerId) {
      return NextResponse.json({ error: "No subscription found" }, { status: 400 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: row.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (err) {
    console.error("Stripe portal error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

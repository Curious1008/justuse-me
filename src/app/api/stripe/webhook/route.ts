import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const PERMANENT_PRO_EMAILS = new Set([
  "nev901008@gmail.com",
]);

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { timeout: 10000 });
}

async function isPermanentPro(stripeSubId: string): Promise<boolean> {
  const [row] = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.stripeSubscriptionId, stripeSubId))
    .limit(1);
  return !!row?.email && PERMANENT_PRO_EMAILS.has(row.email);
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      if (!userId) break;

      await db
        .update(users)
        .set({
          plan: "pro",
          subscriptionStatus: "active",
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const status = sub.status;

      const plan = status === "active" || status === "past_due" ? "pro" : "free";

      if (plan === "free" && (await isPermanentPro(sub.id))) break;

      await db
        .update(users)
        .set({
          plan,
          subscriptionStatus: status,
          updatedAt: new Date(),
        })
        .where(eq(users.stripeSubscriptionId, sub.id));
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      if (await isPermanentPro(sub.id)) break;

      await db
        .update(users)
        .set({
          plan: "free",
          subscriptionStatus: null,
          stripeSubscriptionId: null,
          updatedAt: new Date(),
        })
        .where(eq(users.stripeSubscriptionId, sub.id));
      break;
    }

    case "invoice.payment_failed": {
      console.log("Invoice payment failed:", event.data.object);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

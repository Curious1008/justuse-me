import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/server";

// Permanent Pro accounts — skip downgrade from Stripe webhooks
const PERMANENT_PRO_EMAILS = new Set([
  "nev901008@gmail.com",
]);

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { timeout: 10000 });
}

async function isPermanentPro(supabase: Awaited<ReturnType<typeof createServiceClient>>, stripeSubId: string): Promise<boolean> {
  const { data } = await supabase
    .from("profiles")
    .select("email")
    .eq("stripe_subscription_id", stripeSubId)
    .single();
  return !!data?.email && PERMANENT_PRO_EMAILS.has(data.email);
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

  const supabase = await createServiceClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (!userId) break;

      await supabase
        .from("profiles")
        .update({
          plan: "pro",
          subscription_status: "active",
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const status = sub.status;

      const plan = status === "active" || status === "past_due" ? "pro" : "free";

      // Skip downgrade for permanent Pro accounts
      if (plan === "free" && await isPermanentPro(supabase, sub.id)) break;

      await supabase
        .from("profiles")
        .update({
          plan,
          subscription_status: status,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      // Skip downgrade for permanent Pro accounts
      if (await isPermanentPro(supabase, sub.id)) break;

      await supabase
        .from("profiles")
        .update({
          plan: "free",
          subscription_status: null,
          stripe_subscription_id: null,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);
      break;
    }

    case "invoice.payment_failed": {
      console.log("Invoice payment failed:", event.data.object);
      break;
    }
  }

  return NextResponse.json({ received: true });
}

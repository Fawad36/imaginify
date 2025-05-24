// /* eslint-disable camelcase */
// import { createTransaction } from "@/lib/actions/transaction.action";
// import { NextResponse } from "next/server";
// import stripe from "stripe";

// export async function POST(request: Request) {
//   const body = await request.text();

//   const sig = request.headers.get("stripe-signature") as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     return NextResponse.json({ message: "Webhook error", error: err });
//   }

//   // Get the ID and type
//   const eventType = event.type;

//   // CREATE
//   if (eventType === "checkout.session.completed") {
//     const { id, amount_total, metadata } = event.data.object;

//     const transaction = {
//       stripeId: id,
//       amount: amount_total ? amount_total / 100 : 0,
//       plan: metadata?.plan || "",
//       credits: Number(metadata?.credits) || 0,
//       buyerId: metadata?.buyerId || "",
//       createdAt: new Date(),
//     };

//     const newTransaction = await createTransaction(transaction);
    
//     return NextResponse.json({ message: "OK", transaction: newTransaction });
//   }

//   return new Response("", { status: 200 });
// }










// /* eslint-disable camelcase */
// import { createTransaction } from "@/lib/actions/transaction.action";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // ✅ Initialize stripe correctly

// export async function POST(request: Request) {
//   const body = await request.text();
//   const sig = request.headers.get("stripe-signature");

//   if (!sig) {
//     return NextResponse.json({ message: "Missing stripe-signature header" }, { status: 400 });
//   }

//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
//   if (!endpointSecret) {
//     return NextResponse.json({ message: "STRIPE_WEBHOOK_SECRET not found in env" }, { status: 500 });
//   }

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     return NextResponse.json({ message: "Webhook error", error: err.message }, { status: 400 });
//   }

//   // Get the ID and type
//   const eventType = event.type;

//   if (eventType === "checkout.session.completed") {
//     const session = event.data.object;

//     if (!session.metadata) {
//       return NextResponse.json({ message: "Metadata is missing" }, { status: 400 });
//     }

//     const transaction = {
//       stripeId: session.id,
//       amount: session.amount_total ? session.amount_total / 100 : 0,
//       plan: session.metadata.plan || "unknown",
//       credits: Number(session.metadata.credits) || 0,
//       buyerId: session.metadata.buyerId || "unknown",
//       createdAt: new Date(),
//     };

//     const newTransaction = await createTransaction(transaction);
//     return NextResponse.json({ message: "OK", transaction: newTransaction });
//   }

//   return new Response("", { status: 200 });
// }
























/* eslint-disable camelcase */
import { createTransaction } from "@/lib/actions/transaction.action";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
}); // ✅ Stripe ko initialize kiya

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ message: "❌ Missing stripe-signature header" }, { status: 400 });
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    return NextResponse.json({ message: "❌ STRIPE_WEBHOOK_SECRET not found in env" }, { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json({ message: "❌ Webhook error", error: err.message }, { status: 400 });
  }

  // ✅ Get the Event Type
  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.metadata) {
      return NextResponse.json({ message: "❌ Metadata is missing" }, { status: 400 });
    }

    const transaction = {
      stripeId: session.id,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      plan: session.metadata.plan || "unknown",
      credits: Number(session.metadata.credits) || 0,
      buyerId: session.metadata.buyerId || "unknown",
      createdAt: new Date(),
    };

    const newTransaction = await createTransaction(transaction);

    return NextResponse.json({ message: "✅ Transaction Saved!", transaction: newTransaction });
  }

  return new Response("", { status: 200 });
}

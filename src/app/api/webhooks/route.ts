import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    switch (eventType) {
      case "user.created":
      case "user.updated":
        await convex.mutation(api.users.upsertFromClerk, { data: evt.data });
        console.log("Upserted user ID:", evt.data.id);
        break;
      case "user.deleted":
        await convex.mutation(api.users.deleteFromClerk, { data: evt.data });
        console.log("Deleting userId:", evt.data.id);
        break;
      default:
        console.log("Unhandled event type:", eventType);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}

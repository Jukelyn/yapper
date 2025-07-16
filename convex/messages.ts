import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

// Send a message to a channel
export const send = mutation({
  args: {
    body: v.string(),
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // Optional: check user is in the channel
    const membership = await ctx.db
      .query("channelMemberships")
      .withIndex("byUserChannel", (q) =>
        q.eq("userId", user._id).eq("channelId", args.channelId)
      )
      .unique();

    if (!membership) {
      throw new Error("You are not a member of this channel.");
    }

    await ctx.db.insert("messages", {
      body: args.body,
      channelId: args.channelId,
      userId: user._id,
      createdAt: Date.now(),
    });
  },
});

// Get all messages for a channel
export const getForChannel = query({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    const membership = await ctx.db
      .query("channelMemberships")
      .withIndex("byUserChannel", (q) =>
        q.eq("userId", user._id).eq("channelId", args.channelId)
      )
      .unique();

    if (!membership) {
      throw new Error("You are not a member of this channel.");
    }

    return await ctx.db
      .query("messages")
      .withIndex("byChannel", (q) => q.eq("channelId", args.channelId))
      .order("asc") // Optional: order oldest to newest
      .collect();
  },
});

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

export const getMessagesPaginated = query({
  args: {
    channelId: v.id("channels"),
    cursor: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const PAGE_SIZE = args.limit ?? 20;

    const messagesQuery = ctx.db
      .query("messages")
      .withIndex("byChannel", (q) => q.eq("channel", args.channelId))
      .order("desc"); // Newest first

    const page = await messagesQuery.paginate({
      cursor: args.cursor ?? null,
      numItems: PAGE_SIZE,
    });

    return page;
    // { page: Doc[], isDone: boolean, continueCursor: string | null }
  },
});

export const sendMessage = mutation({
  args: {
    channelId: v.id("channels"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUserOrThrow(ctx);

    // probably don't need this but whatever
    const channel = await ctx.db.get(args.channelId);
    if (!channel) throw new Error("Channel not found.");

    if (!channel.participants.includes(user._id)) {
      throw new Error("You are not a member of this channel.");
    }

    const messageId = await ctx.db.insert("messages", {
      channel: args.channelId,
      authorId: user._id,
      body: args.body,
      sentAt: Date.now(),
    });

    return messageId;
  },
});

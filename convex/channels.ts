import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "./users";

export const getChannels = query({
  handler: async (ctx) => {
    const channels = await ctx.db.query("channels").order("asc").collect();
    return channels;
  },
});

export const createChannel = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    const user = await getCurrentUserOrThrow(ctx);

    // ==================================================================== //
    // this is prob fine to allow since i handle stuff using _id anyways
    // I shall just leave here for now though
    const existing = await ctx.db
      .query("channels")
      .withIndex("byName", (q) => q.eq("name", name))
      .unique();

    if (existing) throw new Error("Channel name already exists");
    // ==================================================================== //

    const newChannelId = await ctx.db.insert("channels", {
      name,
      participants: [user._id],
      ownerId: user._id,
      createdAt: Date.now(),
    });

    await ctx.db.patch(user._id, {
      channelsIn: user.channelsIn
        ? [...user.channelsIn, newChannelId]
        : [newChannelId],
    });

    return newChannelId;
  },
});

export const joinChannel = mutation({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, { channelId }) => {
    const user = await getCurrentUserOrThrow(ctx);

    const channel = await ctx.db.get(channelId);
    if (!channel) throw new Error("Channel not found");

    // Check if user already participant
    if (channel.participants.includes(user._id)) {
      return;
    }

    // Add user to channel participants
    await ctx.db.patch(channelId, {
      participants: [...channel.participants, user._id],
    });

    // Add channel to user's channelsIn
    const updatedChannelsIn = user.channelsIn
      ? [...user.channelsIn, channelId]
      : [channelId];
    await ctx.db.patch(user._id, { channelsIn: updatedChannelsIn });

    // System message for user that joined
    // TODO: make show once only
    await ctx.db.insert("messages", {
      channel: channelId,
      authorId: user._id,
      body: `${user.username ?? "Someone"} joined the channel.`,
      sentAt: Date.now(),
    });
  },
});

export const deleteChannel = mutation({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, { channelId }) => {
    const user = await getCurrentUserOrThrow(ctx);

    const channel = await ctx.db.get(channelId);
    if (!channel) throw new Error("Channel not found");

    if (
      channel.participants.includes(user._id) &&
      channel.ownerId == user._id
    ) {
      await ctx.db.delete(channel._id);
    }
  },
});

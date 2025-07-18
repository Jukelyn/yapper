import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { getCurrentUserOrThrow } from "../users";

export const joinChannel = mutation({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, { channelId }) => {
    const user = await getCurrentUserOrThrow(ctx);

    const channel = await ctx.db.get(channelId);
    if (!channel) throw new Error("Channel not found");

    if (channel.participants.includes(user._id)) {
      return;
    }

    await ctx.db.patch(channelId, {
      participants: [...channel.participants, user._id],
    });

    await ctx.db.patch(user._id, {
      channelsIn: user.channelsIn
        ? [...user.channelsIn, channelId]
        : [channelId],
    });
    if (channel.name != "") {
      await ctx.db.insert("messages", {
        channel: channelId,
        authorId: user._id,
        body: `${user.username ?? "Someone"} joined the channel.`,
        sentAt: Date.now(),
      });
    }
  },
});

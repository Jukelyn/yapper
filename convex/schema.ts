import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.optional(v.string()),
    externalId: v.string(), // This is the Clerk ID, stored in the subject JWT field
    updatedAt: v.optional(v.string()),
  }).index("byExternalId", ["externalId"]),

  friendships: defineTable({
    from: v.id("users"),
    to: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("blocked")
    ),
    createdAt: v.number(),
  })
    .index("byFrom", ["from"])
    .index("byTo", ["to"]),

  channels: defineTable({
    name: v.string(),
    ownerId: v.id("users"),
    createdAt: v.number(),
  }).index("byOwnerId", ["ownerId"]),

  channelMemberships: defineTable({
    channelId: v.id("channels"),
    userId: v.id("users"),
    joinedAt: v.number(),
  })
    .index("byChannel", ["channelId"])
    .index("byUser", ["userId"])
    .index("byUserChannel", ["userId", "channelId"]),

  messages: defineTable({
    channelId: v.id("channels"),
    userId: v.id("users"),
    body: v.string(),
    createdAt: v.number(),
  }).index("byChannel", ["channelId"]),
});

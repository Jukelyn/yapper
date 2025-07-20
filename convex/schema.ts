import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.optional(v.string()),
    externalId: v.string(), // This is the Clerk ID, stored in the subject JWT field
    channelsOwned: v.optional(v.array(v.id("channels"))),
    channelsIn: v.optional(v.array(v.id("channels"))),
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
  }).index("byExternalId", ["externalId"]),

  friendships: defineTable({
    from: v.id("users"),
    to: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("blocked"),
    ),
    createdAt: v.string(),
  })
    .index("byFrom", ["from"])
    .index("byTo", ["to"]),

  channels: defineTable({
    name: v.string(),
    participants: v.array(v.id("users")),
    ownerId: v.id("users"),
    createdAt: v.string(),
  })
    .index("byName", ["name"])
    .index("byCreatedAt", ["createdAt"]),

  messages: defineTable({
    channel: v.id("channels"),
    authorId: v.id("users"),
    body: v.string(),
    sentAt: v.number(),
  })
    .index("bySentAt", ["sentAt"])
    .index("byChannel", ["channel"]),
});

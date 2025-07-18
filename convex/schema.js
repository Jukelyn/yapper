"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    users: (0, server_1.defineTable)({
        name: values_1.v.string(),
        username: values_1.v.optional(values_1.v.string()),
        externalId: values_1.v.string(), // This is the Clerk ID, stored in the subject JWT field
        channelsOwned: values_1.v.optional(values_1.v.array(values_1.v.id("channels"))),
        channelsIn: values_1.v.optional(values_1.v.array(values_1.v.id("channels"))),
        updatedAt: values_1.v.optional(values_1.v.string()),
    }).index("byExternalId", ["externalId"]),
    friendships: (0, server_1.defineTable)({
        from: values_1.v.id("users"),
        to: values_1.v.id("users"),
        status: values_1.v.union(values_1.v.literal("pending"), values_1.v.literal("accepted"), values_1.v.literal("blocked")),
        createdAt: values_1.v.number(),
    })
        .index("byFrom", ["from"])
        .index("byTo", ["to"]),
    channels: (0, server_1.defineTable)({
        name: values_1.v.string(),
        participants: values_1.v.array(values_1.v.id("users")),
        ownerId: values_1.v.id("users"),
        createdAt: values_1.v.number(),
    }).index("byCreatedAt", ["createdAt"]),
    messages: (0, server_1.defineTable)({
        channel: values_1.v.id("channels"),
        authorId: values_1.v.id("users"),
        body: values_1.v.string(),
        sentAt: values_1.v.number(),
    })
        .index("bySentAt", ["sentAt"])
        .index("byChannel", ["channel"]),
    seedState: (0, server_1.defineTable)({
        key: values_1.v.string(),
        completed: values_1.v.boolean(),
    }),
});

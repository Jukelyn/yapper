import { mutation, query, QueryCtx } from "./_generated/server";
import { UserJSON, DeletedObjectJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";

export const store = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const { subject: externalId, name, updatedAt } = identity;
    const rawUsername = identity.nickname;
    const username = typeof rawUsername === "string" ? rawUsername : "unknown";

    const existingUser = await ctx.db
      .query("users")
      .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
      .unique();

    if (existingUser !== null) return existingUser._id;

    return await ctx.db.insert("users", {
      name: name ?? "Unknown",
      username,
      externalId,
      channelsOwned: [],
      channelsIn: [],
      updatedAt,
    });
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = mutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const createdAtTimestamp = new Date(data.created_at).getTime().toString();
    const updatedAtTimestamp = new Date(data.updated_at).getTime().toString();

    const userAttributes = {
      name: `${data.first_name} ${data.last_name}`,
      username: typeof data.username === "string" ? data.username : "unknown",
      externalId: data.id,
      channelsOwned: [], // Assuming these are initialized empty
      channelsIn: [], // Assuming these are initialized empty
      createdAt: createdAtTimestamp, // Use Clerk's created_at for initial creation timestamp
      updatedAt: updatedAtTimestamp, // Use Clerk's updated_at for last update timestamp
    };

    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      // When patching, you might only want to update the fields that can change
      // or you can just overwrite all of them like you are.
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromClerk = mutation({
  args: { data: v.any() as Validator<DeletedObjectJSON> },
  async handler(ctx, { data }) {
    const user = await userByExternalId(ctx, data.id);

    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${data.id}`,
      );
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string | undefined) {
  if (!externalId) {
    return null;
  }

  return await ctx.db
    .query("users")
    .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
    .unique();
}

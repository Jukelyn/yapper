"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <>
      <Authenticated>
        <div className="h-screen p-4 text-center text-lg font-semibold md:text-2xl">
          Welcome to Yapper, {user?.username}.
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="h-screen p-4 text-center text-lg font-bold md:text-2xl">
          Nothing here yet, check back soon!
        </div>
      </Unauthenticated>
    </>
  );
}

"use client";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <>
      <Authenticated>
        <div className="h-screen bg-blue-800 p-4 text-center text-2xl font-semibold text-white dark:bg-orange-400 dark:text-black">
          You are authenticated, welcome.
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="h-screen bg-blue-800 p-4 text-center text-2xl font-semibold text-white dark:bg-orange-400 dark:text-black">
          You are not authenticated, please sign in.
        </div>
      </Unauthenticated>
    </>
  );
}

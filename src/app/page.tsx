"use client";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <>
      <Authenticated>
        <div className="bg-blue-800 dark:bg-orange-400 text-white dark:text-black p-4 h-screen text-center text-2xl font-semibold">
          You are authenticated, welcome.
        </div>
      </Authenticated>
      <Unauthenticated>
        <div className="bg-blue-800 dark:bg-orange-400 text-white dark:text-black p-4 h-screen text-center text-2xl font-semibold">
          You are not authenticated, please sign in.
        </div>
      </Unauthenticated>
    </>
  );
}

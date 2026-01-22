"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import { TextReveal } from "@/components/ui/text-reveal";

export default function Home() {
  return (
    <>
      <Authenticated>
        <div className="h-screen p-4 text-center text-lg font-semibold md:text-2xl">
          <TextReveal>Welcome to Yapper.</TextReveal>
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

"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function YapperNavBar() {
  return (
    <header className="flex h-16 items-center justify-end gap-4 p-4">
      <ModeToggle />
      <Unauthenticated>
        <SignInButton>
          <Button variant={"outline"}>Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button variant={"default"}>Sign Up</Button>
        </SignUpButton>
      </Unauthenticated>
      <Authenticated>
        <UserButton />
      </Authenticated>
    </header>
  );
}

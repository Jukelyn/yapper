"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Pacifico } from "@next/font/google";

const pacifico = Pacifico({
  weight: "400",
  display: "auto",
});

export default function YapperNavBar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={"/yappa-cata.webp"}
          width={80}
          height={80}
          alt="Yapper cat"
          preload={true}
          loading="eager"
        />
        <div className={cn("text-2xl", pacifico.className)}>Yapper</div>
      </div>
      <div className="flex h-16 items-center justify-end gap-4 p-4">
        <ModeToggle />
        <Unauthenticated>
          <SignInButton>
            <Button variant={"default"}>Sign In</Button>
          </SignInButton>
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </div>
    </nav>
  );
}

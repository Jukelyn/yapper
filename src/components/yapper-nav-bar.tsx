"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Pacifico } from "@next/font/google";
import Link from "next/link";

const pacifico = Pacifico({
  weight: "400",
  display: "auto",
});

const NavLinks = () => (
  <NavigationMenu>
    <NavigationMenuList className="gap-1s flex flex-col md:flex-row">
      {["features", "support", "privacy"].map((item) => (
        <NavigationMenuItem key={item}>
          <Link href={`/${item}`}>
            <Button variant="link" className="text-accent-foreground">
              {item[0].toUpperCase() + item.slice(1)}
            </Button>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
export default function YapperNavBar() {
  return (
    <nav className="flex items-center justify-between">
      <Link href={"/"}>
        <div className="flex items-center">
          <Image
            src={"/yappa-cata.webp"}
            width={80}
            height={80}
            alt="Yapper cat"
            preload={true}
            loading="eager"
          />
          <div className={cn("text-primary text-2xl", pacifico.className)}>
            Yapper
          </div>
        </div>
      </Link>
      <div className="flex h-16 items-center justify-end gap-4 p-4">
        <div className="hidden items-center md:flex">
          <NavLinks />
        </div>
        <ModeToggle />
        <Unauthenticated>
          <SignInButton>
            <Button variant={"default"}>Sign In</Button>
          </SignInButton>
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>

        {/* Mobile hamburger (for mobile) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex-col items-center py-2" side="top">
              <SheetTitle className="mt-1">More Information</SheetTitle>
              <NavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

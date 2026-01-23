import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import { Pacifico } from "next/font/google";
import Link from "next/link";

const pacifico = Pacifico({
  weight: "400",
  display: "auto",
});

interface AppNavBarProps extends React.HTMLAttributes<HTMLElement> {}

export function AppNavBar({ className, ...props }: AppNavBarProps) {
  return (
    <section
      id="app-navbar"
      className={cn(
        "border-pumpkin-spice-500 flex h-14 items-center border-y-2 pr-4 pl-2",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <Link href={"/app"}>
          <div className="flex items-center">
            <Image
              src={"/yappa-cata.webp"}
              width={40}
              height={40}
              alt="Yapper cat"
              preload={true}
              loading="eager"
            />
            <div className={cn("text-primary text-2xl", pacifico.className)}>
              Yapper
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="rounded-full"
                size="icon"
                variant={"outline"}
                // onClick={} TODO
              >
                <UserRoundPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Add Others</TooltipContent>
          </Tooltip>
          <ModeToggle className="rounded-full" />
          <UserButton />
        </div>
      </div>
    </section>
  );
}

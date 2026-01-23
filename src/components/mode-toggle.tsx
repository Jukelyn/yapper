"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface ModeTogglerProps extends React.HTMLAttributes<HTMLElement> {}

export function ModeToggle({ className, ...props }: ModeTogglerProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after hydration to prevent mismatch
  useEffect(
    () =>
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true),
    [],
  );

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

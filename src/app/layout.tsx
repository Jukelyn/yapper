import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark, shadcn } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yapper",
  description: "A messaging platform that respects privacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("isolate text-base antialiased", inter.className)}>
        <ClerkProvider
          appearance={{
            theme: shadcn,
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

"use client";

import { UserButton } from "@clerk/nextjs";
import { Unauthenticated, Authenticated } from "convex/react";
import { useStoreUserEffect } from "./useStoreUserEffect";
import CustomSignInButton from "@/components/ui/CustomSignInButton";

function App() {
  const { isLoading, isAuthenticated } = useStoreUserEffect();
  return (
    <>
      <div className="min-h-screen mx-auto bg-background border border-2 border-current rounded-xl">
        <h1 className="text-xl px-4 py-2 font-bold">Yapper</h1>

        <Unauthenticated>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  {!isLoading && !isAuthenticated && (
                    <>
                      <h2 className="text-2xl font-bold mb-4">
                        Welcome to Yapper
                      </h2>
                      <h2 className="text-xl mb-4">
                        Get started by creating an account!
                      </h2>
                      <CustomSignInButton />
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </Unauthenticated>
        <Authenticated>
          <main className="w-full">
            {/* left side bar with channels */}
            <div></div>
            {/* middle scroll section for selected channel */}
          </main>
        </Authenticated>
      </div>
    </>
  );
}

export default App;

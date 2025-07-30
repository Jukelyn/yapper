import { useSession, useClerk } from "@clerk/nextjs";
import { useEffect } from "react";

export function RedirectToSignIn() {
  const { isLoaded, isSignedIn } = useSession();
  const { openSignIn } = useClerk();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      openSignIn();
    }
  }, [isLoaded, isSignedIn]);

  return null;
}

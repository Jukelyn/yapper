import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 className="text-center">Sign in page</h1>
      <SignIn />;
    </div>
  );
}

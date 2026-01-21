import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1 className="text-center">Sign up page</h1>
      <SignUp />;
    </div>
  );
}

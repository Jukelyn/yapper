import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-fit items-center">
      <SignUp />
    </div>
  );
}

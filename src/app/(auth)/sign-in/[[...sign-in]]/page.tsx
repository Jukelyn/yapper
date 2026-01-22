import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto flex h-screen w-fit items-center">
      <SignIn />
    </div>
  );
}

import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto flex h-screen w-fit items-center">
      <UserProfile />
    </div>
  );
}

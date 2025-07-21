import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex w-full justify-center pt-12">
    <UserProfile />
  </div>
);

export default UserProfilePage;

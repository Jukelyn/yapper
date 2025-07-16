import { SignOutButton, useUser, useAuth, UserButton } from "@clerk/nextjs";
import { UserList } from "@/components/user-list";

interface User {
  id: string;
  username: string;
  isOnline: boolean;
}

interface UserSidebarProps {
  users: User[];
}

const UserSidebar = ({ users }: UserSidebarProps) => {
  const { isSignedIn, sessionId } = useAuth();
  const { user } = useUser();

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1">
        <UserList users={users} />
      </div>
      <div className="p-5 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <UserButton />
          <span>{user?.username}</span>
          {isSignedIn && <SignOutButton signOutOptions={{ sessionId }} />}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;

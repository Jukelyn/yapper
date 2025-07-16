import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface User {
  id: string;
  username: string;
  isOnline: boolean;
}

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  const onlineUsers = users.filter((user) => user.isOnline);
  const offlineUsers = users.filter((user) => !user.isOnline);

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        {onlineUsers.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Online ({onlineUsers.length})
            </h3>
            <div className="space-y-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {offlineUsers.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Offline ({offlineUsers.length})
            </h3>
            <div className="space-y-2">
              {offlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-2 opacity-60"
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-gray-400 border-2 border-white rounded-full"></div>
                  </div>
                  <span className="text-sm">{user.username}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {users.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            <p className="text-sm">No users currently available</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

import { mockUsers } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UsersRound, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

function FriendsZone() {
  return (
    <div className="flex flex-col self-start rounded-md border-2 p-2">
      <div className="flex items-center gap-2 pb-2">
        <UsersRound size={20} />
        <p className="text-lg">Friends</p>
        <EllipsisVertical size={"20"} />
        <Button variant={"pumpkinspice300"}>Online</Button>
        <EllipsisVertical size={"20"} />
        <Button variant={"link"}>All</Button>
        <EllipsisVertical size={"20"} />
        <Button variant={"link"}>Add</Button>
      </div>
      <div
        id="friends-list"
        className="border-pumpkin-spice-300 flex flex-col gap-5 border-t-2 py-2"
      >
        {/* Populate based on friends */}
        {mockUsers.map((friend) => (
          <div key={friend.userID} className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src={friend.avatarURL} alt={"shadcn"} />
              <AvatarFallback>FB</AvatarFallback>
            </Avatar>
            <div>{friend.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { FriendsZone };

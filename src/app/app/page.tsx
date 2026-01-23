// Landing Page
// Show updates cards maybe?
// Friends icon + text
// Online friends
// Tabs for online, all, and add friend button
import { ScrollArea } from "@/components/ui/scroll-area";
import { FriendsZone } from "@/components/app/FriendsZone";

export default function App() {
  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="h-full w-full rounded-sm p-2">
        <p className="text-center text-2xl">Welcome back!</p>
        <div className="grid grid-cols-2 gap-4 pt-2 pl-2">
          <FriendsZone />
          <div className="gap-2 self-start rounded-md border-2 py-2 pl-2">
            Other
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

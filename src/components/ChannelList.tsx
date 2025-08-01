import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronsRight, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

const channelNameSchema = z
  .string()
  .max(12, "Channel name must be 12 characters or less")
  .regex(/^[\x00-\x7F]*$/, "Only ASCII characters are allowed");

interface ChannelListProps {
  channels: Doc<"channels">[];
  joinedChannels: string[];
  setJoinedChannels: React.Dispatch<React.SetStateAction<string[]>>;
  selectedChannel: Doc<"channels">;
  setSelectedChannel: (channel: Doc<"channels">) => void;
  handleCreateChannel: (name: string) => void;
  handleDeleteChannel: (id: string) => void;
}

export function ChannelList({
  channels,
  //   joinedChannels,
  //   setJoinedChannels, // might need this at some point
  selectedChannel,
  setSelectedChannel,
  handleCreateChannel,
  handleDeleteChannel,
}: ChannelListProps) {
  const convexUser = useQuery(api.users.current);

  const [newChannelName, setNewChannelName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onCreate() {
    handleCreateChannel(newChannelName);
    setNewChannelName("");
    setIsModalOpen(false);
  }

  return (
    <div className="flex w-64 flex-1 flex-col justify-between p-4 text-white">
      {/* Channel list */}
      <div className="flex flex-col rounded-md bg-white/10 p-3 shadow-lg">
        <h2 className="mb-2 flex items-center justify-between text-xl font-bold text-white">
          Channels
        </h2>

        <div className="flex-grow overflow-auto">
          {channels.map((channel) => {
            // const isJoined = joinedChannels.includes(channel._id);
            return (
              <div key={channel._id} className="mb-1">
                <button
                  className={
                    "hover:bg-secondary/20 w-full rounded p-1 text-left font-bold"
                  }
                  onClick={() => setSelectedChannel(channel)}
                >
                  {selectedChannel._id === channel._id ? (
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <ChevronsRight className="w-5" /> {channel.name}
                      </div>
                      {convexUser && convexUser._id === channel.ownerId && (
                        <Trash
                          className="w-5"
                          onClick={() => handleDeleteChannel(channel._id)}
                        />
                      )}
                    </div>
                  ) : (
                    `# ${channel.name}`
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Add Channel Button */}
        <div className="mx-auto mt-3">
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            + Add Channel
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/20"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-bold text-black">
              Create New Channel
            </h3>
            <Input
              type="text"
              className="mb-4 w-full rounded border px-3 py-2 text-black"
              placeholder="Channel name (max 12 characters)"
              value={newChannelName}
              onChange={(e) => {
                const value = e.target.value;
                const result = channelNameSchema.safeParse(value);

                if (result.success) {
                  setNewChannelName(value);
                } else {
                  console.log(result.error.issues);
                }
              }}
              maxLength={12}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCreate();
                }
              }}
              onFocus={() => setNewChannelName("")}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onCreate}
                disabled={!newChannelName}
              >
                Create
              </Button>
              <Button onClick={() => setIsModalOpen(false)} size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

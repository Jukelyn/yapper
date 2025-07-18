"use client";

import { useEffect, useState } from "react";
import {
  Unauthenticated,
  Authenticated,
  useQuery,
  useMutation,
} from "convex/react";
import { useStoreUserEffect } from "./useStoreUserEffect";
import CustomSignInButton from "@/components/ui/CustomSignInButton";
import { ChannelList } from "@/components/ChannelList";
import { Settings, Send, Users, MessageCircle } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useChatSocket } from "@/hooks/useChatSocket";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

function App() {
  const { isLoading, isAuthenticated } = useStoreUserEffect();
  const { user } = useUser();
  const convexUser = useQuery(api.users.current);
  // react compiler baby, no need for useMemo
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const channels = useQuery(api.channels.getChannels) ?? [];
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [joinedChannels, setJoinedChannels] = useState<string[]>([]);

  // When channels load, select first if none selected
  useEffect(() => {
    if (!selectedChannel && channels.length > 0) {
      setSelectedChannel(channels[0]._id);
    }
  }, [channels, selectedChannel]);

  // Channel Mutations
  const createChannel = useMutation(api.channels.createChannel);
  const deleteChannel = useMutation(api.channels.deleteChannel);
  const joinChannelMutation = useMutation(api.channels.joinChannel);

  useEffect(() => {
    if (!convexUser || channels.length === 0) return;
    const userChannelsIn = convexUser.channelsIn ?? [];
    setJoinedChannels(userChannelsIn);
  }, [convexUser, channels]);

  async function handleCreateChannel(name: string) {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      const newId = await createChannel({ name: trimmedName });
      await joinChannelMutation({ channelId: newId });

      setSelectedChannel(newId);
      setJoinedChannels((jc) => [...jc, newId]);
    } catch (e) {
      alert("Error creating channel: " + (e as Error).message);
    }
  }

  async function handleDeleteChannel(id: string) {
    await deleteChannel({ channelId: id as Id<"channels"> });
  }

  const channelId = selectedChannel ?? "";
  const { messages, sendMessage } = useChatSocket(
    channelId,
    user?.username ?? undefined,
  );

  const [newMessage, setNewMessage] = useState("");

  return (
    <>
      <div className="mx-auto flex h-screen flex-col bg-linear-to-tr from-sky-950 to-violet-700 font-mono">
        <Unauthenticated>
          <main className="mx-auto max-w-7xl flex-1 py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  {!isLoading && !isAuthenticated && (
                    <>
                      <h2 className="mb-4 text-2xl font-bold">
                        Welcome to Yapper
                      </h2>
                      <h2 className="mb-4 text-xl">
                        Get started by creating an account!
                      </h2>
                      <CustomSignInButton />
                    </>
                  )}
                </div>
              </div>
            </div>
          </main>
        </Unauthenticated>

        <Authenticated>
          <main className="flex min-h-0 w-full flex-1">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 p-4 pb-0">
                <Image
                  src="/yappa-cata.webp"
                  alt="Yapper logo"
                  width={64}
                  height={64}
                />
                <h1 className="text-2xl font-bold">Yapper</h1>
              </div>
              {/* Sidebar with channels and user info */}
              <ChannelList
                channels={channels}
                joinedChannels={joinedChannels}
                setJoinedChannels={setJoinedChannels}
                selectedChannel={selectedChannel ?? ""}
                setSelectedChannel={setSelectedChannel}
                handleCreateChannel={handleCreateChannel}
                handleDeleteChannel={handleDeleteChannel}
              />

              {/* user area */}
              <div className="mb-3 ml-1.5 flex gap-2 rounded-lg border bg-white/20 p-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <UserButton
                    appearance={{
                      elements: {
                        popoverBox: "transform -translate-y-4",
                      },
                    }}
                  />
                  <span className="text-sm text-gray-200">
                    {user?.username}
                  </span>
                </div>
                <button className="ml-auto text-gray-400 hover:text-white">
                  <Settings />
                </button>
              </div>
            </div>

            {/* chat area */}
            <div className="m-2 flex flex-1 flex-col rounded-xl bg-black/30 shadow-xl">
              <div className="mb-4 inline-flex gap-2 border-b p-4 text-2xl font-semibold text-white">
                <MessageCircle className="h-8 w-8" />
                <h2>
                  {channels.find((c) => c._id === selectedChannel)?.name ??
                    "Welcome!"}
                </h2>
                <div className="ml-auto flex items-center space-x-1 text-gray-400">
                  <Users className="h-5 w-5" />
                  {/* TODO: show number of users online if available */}
                  <p className="text-sm">{`WIP`} online</p>
                </div>
              </div>
              <div className="text-md mb-4 flex-1 space-y-2 overflow-y-auto px-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    {msg.type === "system" ? (
                      <span className="text-gray-400 italic">{msg.body}</span>
                    ) : (
                      <>
                        <span className="font-bold">{msg.username}:</span>
                        <span className="text-gray-300">{msg.body}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {/* chat input */}
              <div className="border-t px-2 py-6">
                <div className="flex h-6 items-center space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage(newMessage);
                        setNewMessage("");
                      }
                    }}
                    placeholder={`Message to ${
                      channels.find((c) => c._id === selectedChannel)?.name ??
                      ""
                    }`}
                    className="flex-1 font-semibold"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => {
                      sendMessage(newMessage);
                      setNewMessage("");
                    }}
                    size="icon"
                  >
                    <Send className="h-8 w-8" />
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </Authenticated>
      </div>
    </>
  );
}

export default App;

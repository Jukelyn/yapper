import { useEffect, useRef, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";

type ChatMessage = {
  type: "message" | "system";
  body: string;
  username?: string;
  sentAt?: number;
  channel: Doc<"channels">;
};

export function useChatSocket(
  channel: Doc<"channels">,
  username: string | undefined,
) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!username) return;

    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "join", channel, username }));
    };

    socket.onmessage = (event) => {
      const msg: ChatMessage = JSON.parse(event.data);
      setMessages((prev) => {
        // Reset if message is for another channel
        if (!msg.channel || msg.channel._id !== channel._id) return prev;
        return [...prev, msg];
      });
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(
          JSON.stringify({ type: "leave", channel, username }),
        );
        socketRef.current.close();
      }
    };
  }, [channel, username]);

  const sendMessage = (body: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)
      return;

    socketRef.current.send(
      JSON.stringify({
        type: "message",
        channel,
        username,
        body,
        sentAt: Date.now(),
      }),
    );
  };

  return { messages, sendMessage };
}

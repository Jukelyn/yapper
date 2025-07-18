import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  type: "message" | "system";
  body: string;
  username?: string;
  sentAt?: number;
};

export function useChatSocket(channel: string, username: string | undefined) {
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
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    socket.onclose = () => {
      socket.send(JSON.stringify({ type: "leave", channel, username }));
    };

    return () => {
      socket.send(JSON.stringify({ type: "leave", channel, username }));
      socket.close();
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

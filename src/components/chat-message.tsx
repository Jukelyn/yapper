import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  senderName: string;
}

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatMessage({ message, isOwnMessage }: ChatMessageProps) {
  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return "just now";
    }
  };

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-xs lg:max-w-md ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isOwnMessage && (
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback className="text-xs">
              {message.senderName[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={`rounded-lg px-3 py-2 ${
            isOwnMessage
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200"
          }`}
        >
          {!isOwnMessage && (
            <div className="text-xs font-medium text-gray-600 mb-1">
              {message.senderName}
            </div>
          )}
          <div className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </div>
          <div
            className={`text-xs mt-1 ${
              isOwnMessage ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}
